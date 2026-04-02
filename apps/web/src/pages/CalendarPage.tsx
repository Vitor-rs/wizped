// apps/web/src/pages/CalendarPage.tsx
import { useEffect, useState, useRef, useCallback } from "react"
import { googleApi } from "@/services/googleApi"
import { useAuthStore } from "@/stores/useAuthStore"
import { Button } from "@workspace/ui/components/button"
import { Card } from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import type { EventClickArg, DateSelectArg } from "@fullcalendar/core"

/* eslint-disable @typescript-eslint/no-explicit-any */
type GCalEvent = Record<string, any>
type GCalEntry = Record<string, any>
/* eslint-enable @typescript-eslint/no-explicit-any */

const GOOGLE_COLORS: Record<string, string> = {
    "1": "#7986cb",
    "2": "#33b679",
    "3": "#8e24aa",
    "4": "#e67c73",
    "5": "#f6bf26",
    "6": "#f4511e",
    "7": "#039be5",
    "8": "#616161",
    "9": "#3f51b5",
    "10": "#0b8043",
    "11": "#d50000",
}
const DEFAULT_COLOR = "#039be5"

// ─── Formulário de criação/edição ───
type EventFormData = {
    summary: string
    location: string
    description: string
    startDate: string
    startTime: string
    endDate: string
    endTime: string
    colorId: string
}

function emptyForm(start?: Date, end?: Date): EventFormData {
    const s = start ?? new Date()
    const e = end ?? new Date(s.getTime() + 60 * 60 * 1000)
    return {
        summary: "",
        location: "",
        description: "",
        startDate: s.toISOString().slice(0, 10),
        startTime: s.toTimeString().slice(0, 5),
        endDate: e.toISOString().slice(0, 10),
        endTime: e.toTimeString().slice(0, 5),
        colorId: "",
    }
}

function eventToForm(ev: GCalEvent): EventFormData {
    const s = ev.start?.dateTime ? new Date(ev.start.dateTime) : new Date()
    const e = ev.end?.dateTime ? new Date(ev.end.dateTime) : new Date()
    return {
        summary: ev.summary ?? "",
        location: ev.location ?? "",
        description: ev.description ?? "",
        startDate: s.toISOString().slice(0, 10),
        startTime: s.toTimeString().slice(0, 5),
        endDate: e.toISOString().slice(0, 10),
        endTime: e.toTimeString().slice(0, 5),
        colorId: ev.colorId ?? "",
    }
}

function formToApiBody(form: EventFormData) {
    const body: Record<string, unknown> = {
        summary: form.summary,
        location: form.location || undefined,
        description: form.description || undefined,
        start: {
            dateTime: `${form.startDate}T${form.startTime}:00`,
            timeZone: "America/Campo_Grande",
        },
        end: {
            dateTime: `${form.endDate}T${form.endTime}:00`,
            timeZone: "America/Campo_Grande",
        },
    }
    if (form.colorId) body.colorId = form.colorId
    return body
}

// ─── Componente principal ───
export function CalendarPage() {
    const { accessToken } = useAuthStore()
    const [events, setEvents] = useState<GCalEvent[]>([])
    const [calendars, setCalendars] = useState<GCalEntry[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [view, setView] = useState<"calendar" | "list" | "calendars">("calendar")
    const calendarRef = useRef<FullCalendar>(null)

    // Dialog state
    const [dialogMode, setDialogMode] = useState<"closed" | "view" | "create" | "edit">("closed")
    const [selectedEvent, setSelectedEvent] = useState<GCalEvent | null>(null)
    const [form, setForm] = useState<EventFormData>(emptyForm())
    const [saving, setSaving] = useState(false)

    const fetchEvents = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const now = new Date()
            const past = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
            const future = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000)
            const data = (await googleApi.listEvents(
                "primary",
                past.toISOString(),
                future.toISOString(),
                250
            )) as { items?: GCalEvent[] }
            setEvents(data.items ?? [])
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao buscar eventos")
        } finally {
            setLoading(false)
        }
    }, [])

    async function fetchCalendars() {
        try {
            const data = (await googleApi.listCalendars()) as { items?: GCalEntry[] }
            setCalendars(data.items ?? [])
        } catch {
            // silencioso
        }
    }

    useEffect(() => {
        if (accessToken) {
            fetchEvents()
            fetchCalendars()
        }
    }, [accessToken, fetchEvents])

    // ─── Dialog handlers ───
    function closeDialog() {
        setDialogMode("closed")
        setSelectedEvent(null)
        setForm(emptyForm())
        // Limpar seleção do FullCalendar
        calendarRef.current?.getApi().unselect()
    }

    function handleDateSelect(info: DateSelectArg) {
        setForm(emptyForm(info.start, info.end))
        setSelectedEvent(null)
        setDialogMode("create")
    }

    function handleEventClick(info: EventClickArg) {
        const raw = info.event.extendedProps.raw
        setSelectedEvent(raw)
        setDialogMode("view")
    }

    function startEditing() {
        if (!selectedEvent) return
        setForm(eventToForm(selectedEvent))
        setDialogMode("edit")
    }

    async function handleSave() {
        if (!form.summary.trim()) return
        setSaving(true)
        try {
            const body = formToApiBody(form)
            if (dialogMode === "create") {
                await googleApi.createEvent(body)
            } else if (dialogMode === "edit" && selectedEvent) {
                await googleApi.updateEvent(selectedEvent.id, body)
            }
            await fetchEvents()
            closeDialog()
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao salvar evento")
        } finally {
            setSaving(false)
        }
    }

    async function handleDelete() {
        if (!selectedEvent) return
        if (!confirm("Tem certeza que deseja excluir este evento?")) return
        setSaving(true)
        try {
            await googleApi.deleteEvent(selectedEvent.id)
            await fetchEvents()
            closeDialog()
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao excluir evento")
        } finally {
            setSaving(false)
        }
    }

    function updateForm(field: keyof EventFormData, value: string) {
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    // ─── Formatters ───
    function formatTime(dateStr: string | undefined) {
        if (!dateStr) return ""
        return new Date(dateStr).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    function formatDate(dateStr: string | undefined) {
        if (!dateStr) return ""
        return new Date(dateStr).toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "2-digit",
            month: "long",
        })
    }

    // ─── FullCalendar events ───
    const fcEvents = events.map((ev) => ({
        id: ev.id,
        title: ev.summary ?? "Sem título",
        start: ev.start?.dateTime ?? ev.start?.date,
        end: ev.end?.dateTime ?? ev.end?.date,
        allDay: !!ev.start?.date,
        backgroundColor: GOOGLE_COLORS[ev.colorId] ?? DEFAULT_COLOR,
        borderColor: GOOGLE_COLORS[ev.colorId] ?? DEFAULT_COLOR,
        textColor: "#fff",
        extendedProps: { raw: ev },
    }))

    if (!accessToken) {
        return (
            <div>
                <h1 className="text-lg font-semibold">Agenda</h1>
                <p className="text-muted-foreground mt-1 text-sm">
                    Faça login com Google para acessar a Calendar API.
                </p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-lg font-semibold">Google Agenda</h1>
                    <p className="text-muted-foreground text-sm">
                        {events.length} evento(s) carregados
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant={view === "calendar" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setView("calendar")}
                    >
                        Calendário
                    </Button>
                    <Button
                        variant={view === "list" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setView("list")}
                    >
                        Lista
                    </Button>
                    <Button
                        variant={view === "calendars" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setView("calendars")}
                    >
                        Agendas
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open("https://calendar.google.com", "_blank")}
                    >
                        Abrir Google
                    </Button>
                    <Button variant="outline" size="sm" onClick={fetchEvents} disabled={loading}>
                        {loading ? "..." : "↻"}
                    </Button>
                </div>
            </div>

            {error && (
                <Card className="border-destructive bg-destructive/10 p-4">
                    <p className="text-destructive text-sm">{error}</p>
                    <Button variant="outline" size="sm" className="mt-2" onClick={() => setError(null)}>
                        Fechar
                    </Button>
                </Card>
            )}

            {/* ===== CALENDAR VIEW ===== */}
            {view === "calendar" && (
                <Card className="p-4">
                    <style>{`
            .fc {
              --fc-border-color: hsl(var(--border));
              --fc-button-bg-color: hsl(var(--muted));
              --fc-button-border-color: hsl(var(--border));
              --fc-button-text-color: hsl(var(--foreground));
              --fc-button-hover-bg-color: hsl(var(--accent));
              --fc-button-hover-border-color: hsl(var(--border));
              --fc-button-active-bg-color: hsl(var(--primary));
              --fc-button-active-border-color: hsl(var(--primary));
              --fc-button-active-text-color: hsl(var(--primary-foreground));
              --fc-today-bg-color: hsl(var(--accent) / 0.3);
              --fc-page-bg-color: transparent;
              --fc-neutral-bg-color: transparent;
              --fc-event-border-color: transparent;
              --fc-now-indicator-color: hsl(var(--primary));
              --fc-highlight-color: hsl(var(--primary) / 0.15);
              font-family: inherit;
            }
            .fc .fc-toolbar-title {
              font-size: 1.1rem;
              font-weight: 600;
              color: hsl(var(--foreground));
            }
            .fc .fc-col-header-cell-cushion,
            .fc .fc-daygrid-day-number,
            .fc .fc-timegrid-slot-label-cushion {
              color: hsl(var(--muted-foreground));
              font-size: 0.75rem;
            }
            .fc .fc-timegrid-slot { height: 3rem; }
            .fc .fc-event {
              border-radius: 4px;
              padding: 1px 4px;
              font-size: 0.75rem;
              cursor: pointer;
            }
            .fc .fc-event-title { font-weight: 500; }
            .fc .fc-event-time { font-size: 0.65rem; opacity: 0.9; }
            .fc .fc-timegrid-event { border-left: 3px solid rgba(255,255,255,0.4); }
            .fc .fc-scrollgrid { border-color: hsl(var(--border)); }
            .fc .fc-button {
              font-size: 0.8rem;
              padding: 0.3rem 0.6rem;
              border-radius: 6px;
            }
            .fc .fc-button:focus { box-shadow: none; }
            .fc .fc-daygrid-event-dot { display: none; }
          `}</style>
                    <FullCalendar
                        ref={calendarRef}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="timeGridWeek"
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay",
                        }}
                        locale="pt-br"
                        timeZone="America/Campo_Grande"
                        firstDay={1}
                        nowIndicator={true}
                        selectable={true}
                        selectMirror={true}
                        unselectAuto={true}
                        dayMaxEvents={3}
                        allDaySlot={true}
                        allDayText="dia todo"
                        slotMinTime="06:00:00"
                        slotMaxTime="23:00:00"
                        slotDuration="00:30:00"
                        slotLabelInterval="01:00:00"
                        slotLabelFormat={{ hour: "2-digit", minute: "2-digit", hour12: false }}
                        eventTimeFormat={{ hour: "2-digit", minute: "2-digit", hour12: false }}
                        height="auto"
                        contentHeight={650}
                        events={fcEvents}
                        eventClick={handleEventClick}
                        select={handleDateSelect}
                        buttonText={{ today: "Hoje", month: "Mês", week: "Semana", day: "Dia" }}
                    />
                </Card>
            )}

            {/* ===== LIST VIEW ===== */}
            {view === "list" && (
                <div className="space-y-2">
                    {events.map((ev) => {
                        const bgColor = GOOGLE_COLORS[ev.colorId] ?? DEFAULT_COLOR
                        return (
                            <Card
                                key={ev.id}
                                className="cursor-pointer space-y-1 p-4 transition-colors hover:bg-accent/50"
                                onClick={() => {
                                    setSelectedEvent(ev)
                                    setDialogMode("view")
                                }}
                            >
                                <div className="flex items-start gap-3">
                                    <div
                                        className="mt-1 h-3 w-3 shrink-0 rounded-full"
                                        style={{ backgroundColor: bgColor }}
                                    />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium">{ev.summary ?? "Sem título"}</p>
                                        <p className="text-muted-foreground text-xs">
                                            {ev.start?.date
                                                ? `Dia inteiro — ${ev.start.date}`
                                                : `${formatDate(ev.start?.dateTime)} · ${formatTime(ev.start?.dateTime)} – ${formatTime(ev.end?.dateTime)}`}
                                        </p>
                                        {ev.location && (
                                            <p className="text-muted-foreground text-xs">📍 {ev.location}</p>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        )
                    })}
                </div>
            )}

            {/* ===== CALENDARS VIEW ===== */}
            {view === "calendars" && (
                <div className="space-y-2">
                    {calendars.map((cal) => (
                        <Card key={cal.id} className="space-y-1 p-4">
                            <div className="flex items-center gap-3">
                                <div
                                    className="h-4 w-4 shrink-0 rounded-full"
                                    style={{ backgroundColor: cal.backgroundColor ?? "#666" }}
                                />
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium">
                                        {cal.summary}
                                        {cal.primary && (
                                            <span className="text-muted-foreground ml-2 text-[10px]">(principal)</span>
                                        )}
                                    </p>
                                    {cal.description && (
                                        <p className="text-muted-foreground truncate text-xs">{cal.description}</p>
                                    )}
                                </div>
                                <span className="text-muted-foreground text-[10px] uppercase">
                                    {cal.accessRole}
                                </span>
                            </div>
                            <p className="text-muted-foreground text-xs">🕐 {cal.timeZone}</p>
                        </Card>
                    ))}
                </div>
            )}

            {/* ===== DIALOG — VIEW / CREATE / EDIT ===== */}
            {dialogMode !== "closed" && (
                <>
                    {/* Backdrop */}
                    <div className="fixed inset-0 z-50 bg-black/50" onClick={closeDialog} />

                    {/* Modal */}
                    <div className="bg-background border-border fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border shadow-lg">
                        {/* Barra de cor */}
                        <div
                            className="h-1.5 w-full rounded-t-lg"
                            style={{
                                backgroundColor:
                                    dialogMode === "view" && selectedEvent
                                        ? GOOGLE_COLORS[selectedEvent.colorId] ?? DEFAULT_COLOR
                                        : form.colorId
                                            ? GOOGLE_COLORS[form.colorId] ?? DEFAULT_COLOR
                                            : DEFAULT_COLOR,
                            }}
                        />

                        <div className="p-5">
                            {/* ── VIEW MODE ── */}
                            {dialogMode === "view" && selectedEvent && (
                                <>
                                    <h2 className="text-lg font-semibold">
                                        {selectedEvent.summary ?? "Sem título"}
                                    </h2>

                                    <div className="text-muted-foreground mt-3 space-y-2 text-sm">
                                        <p>
                                            🕐{" "}
                                            {selectedEvent.start?.date
                                                ? `Dia inteiro — ${selectedEvent.start.date}`
                                                : `${formatDate(selectedEvent.start?.dateTime)} · ${formatTime(selectedEvent.start?.dateTime)} – ${formatTime(selectedEvent.end?.dateTime)}`}
                                        </p>

                                        {selectedEvent.location && <p>📍 {selectedEvent.location}</p>}

                                        {selectedEvent.description && (
                                            <p className="whitespace-pre-wrap">📝 {selectedEvent.description}</p>
                                        )}

                                        {selectedEvent.organizer && (
                                            <p>
                                                👤{" "}
                                                {selectedEvent.organizer.displayName ??
                                                    selectedEvent.organizer.email}
                                                {selectedEvent.organizer.self && " (você)"}
                                            </p>
                                        )}

                                        {selectedEvent.attendees && selectedEvent.attendees.length > 0 && (
                                            <div>
                                                <p>👥 Participantes:</p>
                                                {selectedEvent.attendees.map(
                                                    (
                                                        a: {
                                                            email: string
                                                            displayName?: string
                                                            responseStatus: string
                                                            self?: boolean
                                                        },
                                                        i: number
                                                    ) => (
                                                        <p key={i} className="ml-6 text-xs">
                                                            {a.displayName ?? a.email}
                                                            {a.self && " (você)"} — {a.responseStatus}
                                                        </p>
                                                    )
                                                )}
                                            </div>
                                        )}

                                        {selectedEvent.hangoutLink && (
                                            <p>
                                                🎥{" "}
                                                <a
                                                    href={selectedEvent.hangoutLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-400 hover:underline"
                                                >
                                                    Entrar no Google Meet
                                                </a>
                                            </p>
                                        )}

                                        <p className="text-[10px]">ID: {selectedEvent.id}</p>
                                    </div>

                                    <div className="mt-4 flex gap-2">
                                        <Button size="sm" onClick={startEditing}>
                                            Editar
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => window.open(selectedEvent.htmlLink, "_blank")}
                                        >
                                            Abrir no Google
                                        </Button>
                                        <Button size="sm" variant="destructive" onClick={handleDelete} disabled={saving}>
                                            {saving ? "..." : "Excluir"}
                                        </Button>
                                        <div className="flex-1" />
                                        <Button size="sm" variant="outline" onClick={closeDialog}>
                                            Fechar
                                        </Button>
                                    </div>
                                </>
                            )}

                            {/* ── CREATE / EDIT MODE ── */}
                            {(dialogMode === "create" || dialogMode === "edit") && (
                                <>
                                    <h2 className="text-lg font-semibold">
                                        {dialogMode === "create" ? "Novo evento" : "Editar evento"}
                                    </h2>

                                    <div className="mt-4 space-y-3">
                                        <Input
                                            placeholder="Adicionar título"
                                            value={form.summary}
                                            onChange={(e) => updateForm("summary", e.target.value)}
                                            autoFocus
                                            className="text-base font-medium"
                                        />

                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <label className="text-muted-foreground mb-1 block text-xs">Início</label>
                                                <Input
                                                    type="date"
                                                    value={form.startDate}
                                                    onChange={(e) => updateForm("startDate", e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-muted-foreground mb-1 block text-xs">Horário</label>
                                                <Input
                                                    type="time"
                                                    value={form.startTime}
                                                    onChange={(e) => updateForm("startTime", e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <label className="text-muted-foreground mb-1 block text-xs">Fim</label>
                                                <Input
                                                    type="date"
                                                    value={form.endDate}
                                                    onChange={(e) => updateForm("endDate", e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-muted-foreground mb-1 block text-xs">Horário</label>
                                                <Input
                                                    type="time"
                                                    value={form.endTime}
                                                    onChange={(e) => updateForm("endTime", e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <Input
                                            placeholder="📍 Adicionar local"
                                            value={form.location}
                                            onChange={(e) => updateForm("location", e.target.value)}
                                        />

                                        <textarea
                                            placeholder="📝 Adicionar descrição"
                                            value={form.description}
                                            onChange={(e) => updateForm("description", e.target.value)}
                                            rows={3}
                                            className="border-input bg-background placeholder:text-muted-foreground w-full rounded-md border px-3 py-2 text-sm"
                                        />

                                        {/* Seletor de cor */}
                                        <div>
                                            <label className="text-muted-foreground mb-1 block text-xs">Cor</label>
                                            <div className="flex gap-1.5">
                                                {Object.entries(GOOGLE_COLORS).map(([id, hex]) => (
                                                    <button
                                                        key={id}
                                                        type="button"
                                                        className={`h-5 w-5 rounded-full transition-transform ${form.colorId === id ? "scale-125 ring-2 ring-white" : "hover:scale-110"}`}
                                                        style={{ backgroundColor: hex }}
                                                        onClick={() => updateForm("colorId", form.colorId === id ? "" : id)}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex gap-2">
                                        <Button size="sm" onClick={handleSave} disabled={saving || !form.summary.trim()}>
                                            {saving ? "Salvando..." : "Salvar"}
                                        </Button>
                                        <div className="flex-1" />
                                        <Button size="sm" variant="outline" onClick={closeDialog}>
                                            Cancelar
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}