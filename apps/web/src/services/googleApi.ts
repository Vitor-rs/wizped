// apps/web/src/services/googleApi.ts
import { useAuthStore } from "@/stores/useAuthStore"

class GoogleApiService {
  private getToken(): string {
    const token = useAuthStore.getState().accessToken
    if (!token) throw new Error("NO_TOKEN")
    return token
  }

  private async request<T = unknown>(
    url: string,
    options?: RequestInit
  ): Promise<T> {
    const token = this.getToken()

    let response = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...options?.headers,
      },
    })

    // Token expirou? Renova e tenta de novo
    if (response.status === 401) {
      const newToken = await useAuthStore.getState().refreshGoogleToken()
      if (!newToken) throw new Error("TOKEN_REFRESH_FAILED")

      response = await fetch(url, {
        ...options,
        headers: {
          Authorization: `Bearer ${newToken}`,
          "Content-Type": "application/json",
          ...options?.headers,
        },
      })
    }

    // DELETE retorna corpo vazio (204 ou 200 sem body)
    if (
      response.status === 204 ||
      response.headers.get("content-length") === "0"
    ) {
      return {} as T
    }

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}))
      throw new Error(
        `API Error ${response.status}: ${JSON.stringify(errorBody)}`
      )
    }

    return response.json()
  }

  // ========== PEOPLE API (Contatos) ==========

  listContacts(pageSize = 100, pageToken?: string) {
    const params = new URLSearchParams({
      personFields:
        "names,emailAddresses,phoneNumbers,birthdays,organizations,addresses,photos,memberships,userDefined,metadata",
      pageSize: String(pageSize),
      sortOrder: "FIRST_NAME_ASCENDING",
      ...(pageToken && { pageToken }),
    })
    return this.request(
      `https://people.googleapis.com/v1/people/me/connections?${params}`
    )
  }

  getContact(resourceName: string) {
    const params = new URLSearchParams({
      personFields:
        "names,emailAddresses,phoneNumbers,birthdays,organizations,addresses,photos,memberships,userDefined,metadata",
    })
    return this.request(
      `https://people.googleapis.com/v1/${resourceName}?${params}`
    )
  }

  createContact(contactData: Record<string, unknown>) {
    return this.request(
      "https://people.googleapis.com/v1/people:createContact",
      { method: "POST", body: JSON.stringify(contactData) }
    )
  }

  updateContact(
    resourceName: string,
    updateFields: string,
    contactData: Record<string, unknown>
  ) {
    return this.request(
      `https://people.googleapis.com/v1/${resourceName}:updateContact?updatePersonFields=${updateFields}`,
      { method: "PATCH", body: JSON.stringify(contactData) }
    )
  }

  deleteContact(resourceName: string) {
    return this.request(
      `https://people.googleapis.com/v1/${resourceName}:deleteContact`,
      { method: "DELETE" }
    )
  }

  searchContacts(query: string) {
    const params = new URLSearchParams({
      query,
      readMask:
        "names,emailAddresses,phoneNumbers,birthdays,organizations,photos",
      pageSize: "30",
    })
    return this.request(
      `https://people.googleapis.com/v1/people:searchContacts?${params}`
    )
  }

  // ========== CALENDAR API (Agenda) ==========

  listCalendars() {
    return this.request(
      "https://www.googleapis.com/calendar/v3/users/me/calendarList"
    )
  }

  listEvents(
    calendarId = "primary",
    timeMin?: string,
    timeMax?: string,
    maxResults = 50
  ) {
    const params = new URLSearchParams({
      singleEvents: "true",
      orderBy: "startTime",
      maxResults: String(maxResults),
      ...(timeMin && { timeMin }),
      ...(timeMax && { timeMax }),
    })
    return this.request(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?${params}`
    )
  }

  getEvent(eventId: string, calendarId = "primary") {
    return this.request(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}`
    )
  }

  createEvent(eventData: Record<string, unknown>, calendarId = "primary") {
    return this.request(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?sendUpdates=none`,
      { method: "POST", body: JSON.stringify(eventData) }
    )
  }

  updateEvent(
    eventId: string,
    eventData: Record<string, unknown>,
    calendarId = "primary"
  ) {
    return this.request(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}?sendUpdates=none`,
      { method: "PATCH", body: JSON.stringify(eventData) }
    )
  }

  deleteEvent(eventId: string, calendarId = "primary") {
    return this.request(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}?sendUpdates=none`,
      { method: "DELETE" }
    )
  }

  checkFreeBusy(timeMin: string, timeMax: string, calendarIds: string[]) {
    return this.request("https://www.googleapis.com/calendar/v3/freeBusy", {
      method: "POST",
      body: JSON.stringify({
        timeMin,
        timeMax,
        timeZone: "America/Campo_Grande",
        items: calendarIds.map((id) => ({ id })),
      }),
    })
  }

  // ========== DRIVE API (Arquivos) ==========

  listFiles(query?: string, pageSize = 50, pageToken?: string) {
    const params = new URLSearchParams({
      pageSize: String(pageSize),
      fields:
        "nextPageToken,files(id,name,mimeType,webViewLink,webContentLink,iconLink,thumbnailLink,createdTime,modifiedTime,size,owners,shared,starred,trashed,capabilities,fileExtension,description)",
      orderBy: "modifiedTime desc",
      ...(query && { q: query }),
      ...(pageToken && { pageToken }),
    })
    return this.request(`https://www.googleapis.com/drive/v3/files?${params}`)
  }

  getFile(fileId: string) {
    return this.request(
      `https://www.googleapis.com/drive/v3/files/${fileId}?fields=*`
    )
  }

  createFolder(name: string, parentId?: string) {
    return this.request("https://www.googleapis.com/drive/v3/files", {
      method: "POST",
      body: JSON.stringify({
        name,
        mimeType: "application/vnd.google-apps.folder",
        ...(parentId && { parents: [parentId] }),
      }),
    })
  }

  updateFile(fileId: string, metadata: Record<string, unknown>) {
    return this.request(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
      method: "PATCH",
      body: JSON.stringify(metadata),
    })
  }

  deleteFile(fileId: string) {
    return this.request(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
      method: "DELETE",
    })
  }

  trashFile(fileId: string) {
    return this.request(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
      method: "PATCH",
      body: JSON.stringify({ trashed: true }),
    })
  }

  async createShareableLink(fileId: string) {
    await this.request(
      `https://www.googleapis.com/drive/v3/files/${fileId}/permissions`,
      {
        method: "POST",
        body: JSON.stringify({ role: "reader", type: "anyone" }),
      }
    )
    return this.request<{ webViewLink: string }>(
      `https://www.googleapis.com/drive/v3/files/${fileId}?fields=webViewLink`
    )
  }

  searchFiles(searchText: string) {
    const q = `name contains '${searchText}' and trashed=false`
    return this.listFiles(q)
  }
}

// Singleton — uma instância para todo o app
export const googleApi = new GoogleApiService()
