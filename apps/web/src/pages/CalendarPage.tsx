// apps/web/src/pages/CalendarPage.tsx
import { useEffect, useState, useRef } from "react"
import { googleApi } from "@/services/googleApi"
import { useAuthStore } from "@/stores/useAuthStore"
import { Button } from "@workspace/ui/components/button"
import { Card } from "@workspace/ui/components/card"
import { Dialog } from "@workspace/ui/components/dialog"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import type { EventClickArg, DateSelectArg } from "@fullcalendar/core"

/* eslint-disable @typescript-eslint/no-explicit-any */
type GCalEvent = Record<string, any>
type GCalEntry = Record<string, any>
/* eslint-enable @typescript-eslint/no-explicit-any */

// Cores do Google Calendar (colorId → hex)
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

export function CalendarPage() {
    const { accessToken } = useAuthStore()
    const [events, setEvents] = useState<GCalEvent[]>([])
    const [calendars, setCalendars] = useState<GCalEntry[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [selectedEvent, setSelectedEvent] = useState<GCalEvent | null>(null)
    const [showEventDialog, setShowEventDialog] = useState(false)
    const [view, setView] = useState<"calendar" | "list" | "calendars">(
        "calendar"
    )
    const calendarRef = useRef<FullCalendar>(null)

    async function fetchEvents() {
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
    }

    async function fetchCalendars() {
        try {
            const data = (await googleApi.listCalendars()) as {
                items?: GCalEntry[]
            }
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

    // Mapear eventos Google → FullCalendar
    const fcEvents = events.map((ev) => ({
        id: ev.id,
        title: ev.summary ?? "Sem título",
        start: ev.start?.dateTime ?? ev.start?.date,
        end: ev.end?.dateTime ?? ev.end?.date,
        allDay: !!ev.start?.date,
        backgroundColor: GOOGLE_COLORS[ev.colorId] ?? DEFAULT_COLOR,
        borderColor: GOOGLE_COLORS[ev.colorId] ?? DEFAULT_COLOR,
        textColor: "#fff",
        extendedProps: {
            location: ev.location,
            description: ev.description,
            htmlLink: ev.htmlLink,
            status: ev.status,
            attendees: ev.attendees,
            hangoutLink: ev.hangoutLink,
            conferenceData: ev.conferenceData,
            creator: ev.creator,
            organizer: ev.organizer,
            extendedProperties: ev.extendedProperties,
            recurringEventId: ev.recurringEventId,
            reminders: ev.reminders,
            colorId: ev.colorId,
            raw: ev,
        },
    }))

    function handleEventClick(info: EventClickArg) {
        const raw = info.event.extendedProps.raw
        setSelectedEvent(raw)
        setShowEventDialog(true)
    }

    function handleDateSelect(info: DateSelectArg) {
        const start = info.start.toISOString().replace(/[-:]/g, "").split(".")[0]
        const end = info.end.toISOString().replace(/[-:]/g, "").split(".")[0]
        window.open(
            `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${start}/${end}`,
            "_blank"
        )
    }

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
            year: "numeric",
        })
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
                        onClick={() =>
                            window.open("https://calendar.google.com", "_blank")
                        }
                    >
                        Abrir Google
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={fetchEvents}
                        disabled={loading}
                    >
                        {loading ? "..." : "↻"}
                    </Button>
                </div>
            </div>

            {error && (
                <Card className="border-destructive bg-destructive/10 p-4">
                    <p className="text-destructive text-sm">{error}</p>
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
            .fc .fc-timegrid-slot {
              height: 3rem;
            }
            .fc .fc-event {
              border-radius: 4px;
              padding: 1px 4px;
              font-size: 0.75rem;
              cursor: pointer;
            }
            .fc .fc-event-title {
              font-weight: 500;
            }
            .fc .fc-event-time {
              font-size: 0.65rem;
              opacity: 0.9;
            }
            .fc .fc-timegrid-event {
              border-left: 3px solid rgba(255,255,255,0.4);
            }
            .fc .fc-scrollgrid {
              border-color: hsl(var(--border));
            }
            .fc .fc-button {
              font-size: 0.8rem;
              padding: 0.3rem 0.6rem;
              border-radius: 6px;
            }
            .fc .fc-button:focus {
              box-shadow: none;
            }
            .fc .fc-daygrid-event-dot {
              display: none;
            }
            .fc .fc-popover {
              background: hsl(var(--popover));
              border-color: hsl(var(--border));
            }
            .fc .fc-popover-header {
              background: hsl(var(--muted));
              color: hsl(var(--foreground));
            }
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
                        dayMaxEvents={3}
                        allDaySlot={true}
                        allDayText="dia todo"
                        slotMinTime="06:00:00"
                        slotMaxTime="23:00:00"
                        slotDuration="00:30:00"
                        slotLabelInterval="01:00:00"
                        slotLabelFormat={{
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                        }}
                        eventTimeFormat={{
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                        }}
                        height="auto"
                        contentHeight={650}
                        events={fcEvents}
                        eventClick={handleEventClick}
                        select={handleDateSelect}
                        buttonText={{
                            today: "Hoje",
                            month: "Mês",
                            week: "Semana",
                            day: "Dia",
                        }}
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
                                    setShowEventDialog(true)
                                }}
                            >
                                <div className="flex items-start gap-3">
                                    <div
                                        className="mt-1 h-3 w-3 shrink-0 rounded-full"
                                        style={{ backgroundColor: bgColor }}
                                    />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium">
                                            {ev.summary ?? "Sem título"}
                                        </p>
                                        <p className="text-muted-foreground text-xs">
                                            {ev.start?.date
                                                ? `Dia inteiro — ${ev.start.date}`
                                                : `${formatDate(ev.start?.dateTime)} · ${formatTime(ev.start?.dateTime)} – ${formatTime(ev.end?.dateTime)}`}
                                        </p>
                                        {ev.location && (
                                            <p className="text-muted-foreground text-xs">
                                                📍 {ev.location}
                                            </p>
                                        )}
                                    </div>
                                    <span className="text-muted-foreground text-[10px] uppercase">
                                        {ev.status}
                                    </span>
                                </div>
                            </Card>
                        )
                    })}
                    {!loading && events.length === 0 && !error && (
                        <p className="text-muted-foreground text-center text-sm">
                            Nenhum evento encontrado.
                        </p>
                    )}
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
                </div>
            )}

            {/* ===== EVENT DETAIL DIALOG ===== */}
            {showEventDialog && selectedEvent && (
                <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
                    <div
                        className="bg-background/80 fixed inset-0 z-50"
                        onClick={() => setShowEventDialog(false)}
                    />
                    <div className="bg-background border-border fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border p-6 shadow-lg">
                        {/* Barra de cor */}
                        <div
                            className="mb-4 h-1 w-full rounded-full"
                            style={{
                                backgroundColor:
                                    GOOGLE_COLORS[selectedEvent.colorId] ?? DEFAULT_COLOR,
                            }}
                        />

                        <h2 className="text-lg font-semibold">
                            {selectedEvent.summary ?? "Sem título"}
                        </h2>

                        <div className="text-muted-foreground mt-3 space-y-2 text-sm">
                            {/* Data e horário */}
                            <div className="flex items-center gap-2">
                                <span>🕐</span>
                                <span>
                                    {selectedEvent.start?.date
                                        ? `Dia inteiro — ${selectedEvent.start.date}`
                                        : `${formatDate(selectedEvent.start?.dateTime)} · ${formatTime(selectedEvent.start?.dateTime)} – ${formatTime(selectedEvent.end?.dateTime)}`}
                                </span>
                            </div>

                            {/* Local */}
                            {selectedEvent.location && (
                                <div className="flex items-start gap-2">
                                    <span>📍</span>
                                    <span>{selectedEvent.location}</span>
                                </div>
                            )}

                            {/* Descrição */}
                            {selectedEvent.description && (
                                <div className="flex items-start gap-2">
                                    <span>📝</span>
                                    <span className="whitespace-pre-wrap">
                                        {selectedEvent.description}
                                    </span>
                                </div>
                            )}

                            {/* Organizador */}
                            {selectedEvent.organizer && (
                                <div className="flex items-center gap-2">
                                    <span>👤</span>
                                    <span>
                                        {selectedEvent.organizer.displayName ??
                                            selectedEvent.organizer.email}
                                        {selectedEvent.organizer.self && " (você)"}
                                    </span>
                                </div>
                            )}

                            {/* Participantes */}
                            {selectedEvent.attendees &&
                                selectedEvent.attendees.length > 0 && (
                                    <div className="flex items-start gap-2">
                                        <span>👥</span>
                                        <div>
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
                                                    <p key={i} className="text-xs">
                                                        {a.displayName ?? a.email}
                                                        {a.self && " (você)"}
                                                        <span className="text-muted-foreground ml-1">
                                                            — {a.responseStatus}
                                                        </span>
                                                    </p>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}

                            {/* Google Meet */}
                            {selectedEvent.hangoutLink && (
                                <div className="flex items-center gap-2">
                                    <span>🎥</span>
                                    <a
                                        href={selectedEvent.hangoutLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:underline"
                                    >
                                        Entrar no Google Meet
                                    </a>
                                </div>
                            )}

                            {/* Extended Properties */}
                            {selectedEvent.extendedProperties && (
                                <div className="border-t pt-2">
                                    <p className="text-[10px] font-medium uppercase">
                                        Propriedades estendidas
                                    </p>
                                    {selectedEvent.extendedProperties.private &&
                                        Object.entries(
                                            selectedEvent.extendedProperties.private as Record<
                                                string,
                                                string
                                            >
                                        ).map(([key, value]) => (
                                            <p key={key} className="text-xs">
                                                {key}: {value}
                                            </p>
                                        ))}
                                    {selectedEvent.extendedProperties.shared &&
                                        Object.entries(
                                            selectedEvent.extendedProperties.shared as Record<
                                                string,
                                                string
                                            >
                                        ).map(([key, value]) => (
                                            <p key={key} className="text-xs">
                                                {key}: {value}
                                            </p>
                                        ))}
                                </div>
                            )}

                            {/* ID */}
                            <div className="border-t pt-2 text-[10px]">
                                <p>ID: {selectedEvent.id}</p>
                                {selectedEvent.recurringEventId && (
                                    <p>Recorrência: {selectedEvent.recurringEventId}</p>
                                )}
                            </div>
                        </div>

                        {/* Ações */}
                        <div className="mt-4 flex gap-2">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                    window.open(selectedEvent.htmlLink, "_blank")
                                }
                            >
                                Abrir no Google
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setShowEventDialog(false)}
                            >
                                Fechar
                            </Button>
                        </div>
                    </div>
                </Dialog>
            )}
        </div>
    )
}