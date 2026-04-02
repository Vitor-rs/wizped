// apps/web/src/pages/ContactsPage.tsx
import { useEffect, useState } from "react"
import { googleApi } from "@/services/googleApi"
import { useAuthStore } from "@/stores/useAuthStore"
import { Button } from "@workspace/ui/components/button"
import { Card } from "@workspace/ui/components/card"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Contact = Record<string, any>

export function ContactsPage() {
    const { accessToken } = useAuthStore()
    const [contacts, setContacts] = useState<Contact[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function fetchContacts() {
        if (!accessToken) {
            setError("Faça login com Google para acessar os contatos.")
            return
        }
        setLoading(true)
        setError(null)
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const data: any = await googleApi.listContacts(200)
            setContacts(data.connections ?? [])
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao buscar contatos")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (accessToken) fetchContacts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken])

    if (!accessToken) {
        return (
            <div>
                <h1 className="text-lg font-semibold">Contatos</h1>
                <p className="text-muted-foreground mt-1 text-sm">
                    Faça login com Google para acessar a People API.
                </p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-lg font-semibold">Contatos Google</h1>
                    <p className="text-muted-foreground text-sm">
                        {contacts.length} contato(s) encontrado(s) via People API
                    </p>
                </div>
                <Button onClick={fetchContacts} disabled={loading} variant="outline">
                    {loading ? "Carregando..." : "Recarregar"}
                </Button>
            </div>

            {error && (
                <Card className="border-destructive bg-destructive/10 p-4">
                    <p className="text-destructive text-sm">{error}</p>
                </Card>
            )}

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {contacts.map((contact) => {
                    const name =
                        contact.names?.[0]?.displayName ?? "Sem nome"
                    const email =
                        contact.emailAddresses?.[0]?.value ?? "—"
                    const phone =
                        contact.phoneNumbers?.[0]?.value ?? "—"
                    const org =
                        contact.organizations?.[0]?.name ?? ""
                    const title =
                        contact.organizations?.[0]?.title ?? ""
                    const photo = contact.photos?.[0]?.url
                    const birthday = contact.birthdays?.[0]?.date
                    const birthdayStr = birthday
                        ? `${String(birthday.day).padStart(2, "0")}/${String(birthday.month).padStart(2, "0")}${birthday.year ? `/${birthday.year}` : ""}`
                        : null
                    const userDefined = contact.userDefined ?? []
                    const resourceName = contact.resourceName ?? ""

                    return (
                        <Card key={resourceName} className="p-4 space-y-2">
                            <div className="flex items-center gap-3">
                                {photo ? (
                                    <img
                                        src={photo}
                                        alt={name}
                                        className="h-10 w-10 rounded-full object-cover"
                                        referrerPolicy="no-referrer"
                                    />
                                ) : (
                                    <div className="bg-muted text-muted-foreground flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium">
                                        {name.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium">{name}</p>
                                    {org && (
                                        <p className="text-muted-foreground truncate text-xs">
                                            {title ? `${title} — ${org}` : org}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="text-muted-foreground space-y-1 text-xs">
                                <p>📧 {email}</p>
                                <p>📱 {phone}</p>
                                {birthdayStr && <p>🎂 {birthdayStr}</p>}
                            </div>

                            {userDefined.length > 0 && (
                                <div className="border-t pt-2">
                                    <p className="text-muted-foreground mb-1 text-[10px] font-medium uppercase">
                                        Campos personalizados
                                    </p>
                                    {userDefined.map(
                                        (
                                            field: { key: string; value: string },
                                            i: number
                                        ) => (
                                            <p key={i} className="text-xs">
                                                <span className="text-muted-foreground">
                                                    {field.key}:
                                                </span>{" "}
                                                {field.value}
                                            </p>
                                        )
                                    )}
                                </div>
                            )}

                            <p className="text-muted-foreground truncate text-[10px]">
                                {resourceName}
                            </p>
                        </Card>
                    )
                })}
            </div>

            {!loading && contacts.length === 0 && !error && (
                <p className="text-muted-foreground text-center text-sm">
                    Nenhum contato encontrado na conta Google.
                </p>
            )}
        </div>
    )
}