// apps/web/src/pages/CalendarPage.tsx
import { useEffect, useState } from "react"
import { googleApi } from "@/services/googleApi"
import { useAuthStore } from "@/stores/useAuthStore"
import { Button } from "@workspace/ui/components/button"
import { Card } from "@workspace/ui/components/card"

/* eslint-disable @typescript-eslint/no-explicit-any */
type GCalEvent = Record<string, any>
type GCalEntry = Record<string, any>
/* eslint-enable @typescript-eslint/no-explicit-any */

export function CalendarPage() {
    const { accessToken } = useAuthStore()
    const [events, setEvents] = useState<GCalEvent[]>([])
    const [calendars, setCalendars] = useState<GCalEntry[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [view, setView] = useState<"events" | "calendars" | "embed">("events")

    async function fetchEvents() {
        setLoading(true)
        setError(null)
        try {
            const now = new Date()
            const thirtyDays = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
            const data = (await googleApi.listEvents(
                "primary",
                now.toISOString(),
                thirtyDays.toISOString(),
                100
            )) as { items?: GCalEvent[] }
            setEvents(data.items ?? [])
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao buscar eventos")
        } finally {
            setLoading(false)
        }
    }

    async function fetchCalendars() {
        setLoading(true)
        setError(null)
        try {
            const data = (await googleApi.listCalendars()) as {
                items?: GCalEntry[]
            }
            setCalendars(data.items ?? [])
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Erro ao buscar calendários"
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (accessToken) fetchEvents()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken])

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

    function formatEventTime(ev: GCalEvent) {
        if (ev.start?.date) return `Dia inteiro — ${ev.start.date}`
        if (!ev.start?.dateTime) return "—"
        const start = new Date(ev.start.dateTime)
        const end = ev.end?.dateTime ? new Date(ev.end.dateTime) : null
        const dateStr = start.toLocaleDateString("pt-BR", {
            weekday: "short",
            day: "2-digit",
            month: "2-digit",
        })
        const startTime = start.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
        })
        const endTime = end
            ? end.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
            : ""
        return `${dateStr} · ${startTime}${endTime ? ` – ${endTime}` : ""}`
    }

    const colorMap: Record<string, string> = {
        "1": "bg-blue-900/30",
        "2": "bg-green-900/30",
        "3": "bg-purple-900/30",
        "4": "bg-red-900/30",
        "5": "bg-yellow-900/30",
        "6": "bg-orange-900/30",
        "7": "bg-cyan-900/30",
        "8": "bg-gray-900/30",
        "9": "bg-indigo-900/30",
        "10": "bg-emerald-900/30",
        "11": "bg-rose-900/30",
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-lg font-semibold">Google Agenda</h1>
                    <p className="text-muted-foreground text-sm">
                        {view === "events" &&
                            `${events.length} evento(s) nos próximos 30 dias`}
                        {view === "calendars" &&
                            `${calendars.length} calendário(s) encontrado(s)`}
                        {view === "embed" &&
                            "Visualização embarcada do Google Calendar"}
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant={view === "events" ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                            setView("events")
                            if (events.length === 0) fetchEvents()
                        }}
                    >
                        Eventos
                    </Button>
                    <Button
                        variant={view === "calendars" ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                            setView("calendars")
                            if (calendars.length === 0) fetchCalendars()
                        }}
                    >
                        Calendários
                    </Button>
                    <Button
                        variant={view === "embed" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setView("embed")}
                    >
                        Embed
                    </Button>
                </div>
            </div>

            {error && (
                <Card className="border-destructive bg-destructive/10 p-4">
                    <p className="text-destructive text-sm">{error}</p>
                </Card>
            )}

            {/* ===== EVENTOS ===== */}
            {view === "events" && (
                <div className="space-y-2">
                    <div className="flex justify-end">
                        <Button
                            onClick={fetchEvents}
                            disabled={loading}
                            variant="outline"
                            size="sm"
                        >
                            {loading ? "Carregando..." : "Recarregar"}
                        </Button>
                    </div>

                    {events.map((ev) => {
                        const bgClass = colorMap[ev.colorId] ?? ""
                        return (
                            <Card key={ev.id} className={`space-y-1 p-4 ${bgClass}`}>
                                <div className="flex items-start justify-between gap-2">
                                    <p className="text-sm font-medium">
                                        {ev.summary ?? "Sem título"}
                                    </p>
                                    <span className="text-muted-foreground shrink-0 text-[10px] uppercase">
                                        {ev.status}
                                    </span>
                                </div>

                                <p className="text-muted-foreground text-xs">
                                    {formatEventTime(ev)}
                                </p>

                                {ev.location && (
                                    <p className="text-muted-foreground text-xs">
                                        📍 {ev.location}
                                    </p>
                                )}

                                {ev.description && (
                                    <p className="text-muted-foreground line-clamp-2 text-xs">
                                        {ev.description}
                                    </p>
                                )}

                                {ev.attendees && ev.attendees.length > 0 && (
                                    <div className="text-muted-foreground text-xs">
                                        👥{" "}
                                        {ev.attendees
                                            .map(
                                                (a: { displayName?: string; email: string }) =>
                                                    a.displayName ?? a.email
                                            )
                                            .join(", ")}
                                    </div>
                                )}

                                {ev.hangoutLink && (
                                    <a
                                        href={ev.hangoutLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-blue-400 hover:underline"
                                    >
                                        🎥 Google Meet
                                    </a>
                                )}

                                {ev.extendedProperties && (
                                    <div className="border-t pt-1">
                                        <p className="text-muted-foreground text-[10px] font-medium uppercase">
                                            Propriedades estendidas
                                        </p>
                                        {ev.extendedProperties.private &&
                                            Object.entries(
                                                ev.extendedProperties.private as Record<string, string>
                                            ).map(([key, value]) => (
                                                <p key={key} className="text-xs">
                                                    <span className="text-muted-foreground">
                                                        {key}:
                                                    </span>{" "}
                                                    {value}
                                                </p>
                                            ))}
                                        {ev.extendedProperties.shared &&
                                            Object.entries(
                                                ev.extendedProperties.shared as Record<string, string>
                                            ).map(([key, value]) => (
                                                <p key={key} className="text-xs">
                                                    <span className="text-muted-foreground">
                                                        {key}:
                                                    </span>{" "}
                                                    {value}
                                                </p>
                                            ))}
                                    </div>
                                )}

                                <p className="text-muted-foreground text-[10px]">
                                    ID: {ev.id}
                                </p>
                            </Card>
                        )
                    })}

                    {!loading && events.length === 0 && !error && (
                        <p className="text-muted-foreground text-center text-sm">
                            Nenhum evento nos próximos 30 dias.
                        </p>
                    )}
                </div>
            )}

            {/* ===== CALENDÁRIOS ===== */}
            {view === "calendars" && (
                <div className="space-y-2">
                    <div className="flex justify-end">
                        <Button
                            onClick={fetchCalendars}
                            disabled={loading}
                            variant="outline"
                            size="sm"
                        >
                            {loading ? "Carregando..." : "Recarregar"}
                        </Button>
                    </div>

                    {calendars.map((cal) => (
                        <Card key={cal.id} className="space-y-1 p-4">
                            <div className="flex items-center gap-3">
                                <div
                                    className="h-4 w-4 shrink-0 rounded-full"
                                    style={{
                                        backgroundColor: cal.backgroundColor ?? "#666",
                                    }}
                                />
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium">
                                        {cal.summary}
                                        {cal.primary && (
                                            <span className="text-muted-foreground ml-2 text-[10px]">
                                                (principal)
                                            </span>
                                        )}
                                    </p>
                                    {cal.description && (
                                        <p className="text-muted-foreground truncate text-xs">
                                            {cal.description}
                                        </p>
                                    )}
                                </div>
                                <span className="text-muted-foreground text-[10px] uppercase">
                                    {cal.accessRole}
                                </span>
                            </div>
                            <div className="text-muted-foreground text-xs">
                                <p>🕐 {cal.timeZone}</p>
                                <p className="text-[10px]">ID: {cal.id}</p>
                            </div>
                        </Card>
                    ))}

                    {!loading && calendars.length === 0 && !error && (
                        <p className="text-muted-foreground text-center text-sm">
                            Nenhum calendário encontrado.
                        </p>
                    )}
                </div>
            )}

            {/* ===== ABRIR NO GOOGLE ===== */}
            {view === "embed" && (
                <Card className="flex flex-col items-center justify-center gap-4 p-12">
                    <p className="text-muted-foreground text-center text-sm">
                        Calendários privados não podem ser embarcados por restrição do
                        Google. Use o botão abaixo para abrir direto no Google Calendar.
                    </p>
                    <Button
                        onClick={() => window.open("https://calendar.google.com", "_blank")}
                    >
                        Abrir Google Calendar
                    </Button>
                </Card>
            )}

        </div>
    )
}