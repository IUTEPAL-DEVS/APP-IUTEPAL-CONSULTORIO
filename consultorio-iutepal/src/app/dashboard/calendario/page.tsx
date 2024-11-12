"use client"

import * as React from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Pencil, Plus, Trash } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Calendar } from "@/src/components/ui/calendar"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { ScrollArea } from "@/src/components/ui/scroll-area"
import { EditEventModal } from "@/src/components/edit-event-modal"
import { DeleteEventModal } from "@/src/components/delete-event-modal"

interface Event {
    id?: string
    id_patient?: string
    title: string
    date: Date
    time: string
    description?: string
}

export default function ExpandedCalendar() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const [events, setEvents] = React.useState<Event[]>([])
    const [newEventTitle, setNewEventTitle] = React.useState("")
    const [newEventTime, setNewEventTime] = React.useState("")
    const [newEventDescription, setNewEventDescription] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)

    const fetchEvents = async () => {
        const response = await fetch('/api/eventos')
        const data = await response.json()
        if (Array.isArray(data)) {
            setEvents(data)
        } else if (data.data && Array.isArray(data.data)) {
            setEvents(data.data)
        } else {
            console.error("Unexpected response format:", data)
        }
    }

    React.useEffect(() => {
        fetchEvents()
    }, [])

    const addEvent = async () => {
        if (date && newEventTitle.trim() !== "" && newEventTime.trim() !== "") {
            setIsLoading(true)
            const newEvent: Omit<Event, 'id'> = {
                title: newEventTitle,
                date: date,
                time: newEventTime,
                description: newEventDescription,
                id_patient: undefined,
            }
            const response = await fetch('/api/eventos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEvent),
            })
            const data = await response.json()
            if (data && data.data && data.data.length > 0) {
                setEvents([...events, data.data[0]])
            }
            setNewEventTitle("")
            setNewEventTime("")
            setNewEventDescription("")
            setIsLoading(false)
            fetchEvents()
        }
    }

    const deleteEvent = async (id: string) => {
        setIsLoading(true)
        const response = await fetch(`/api/eventos`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        })
        if (response.ok) {
            setEvents(events.filter(event => event.id !== id))
            fetchEvents()
        } else {
            console.error("Failed to delete event")
        }
        setIsLoading(false)
    }

    const editEvent = async (updatedEvent: Event) => {
        setIsLoading(true)
        const response = await fetch(`/api/eventos`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedEvent),
        })
        if (response.ok) {
            setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event))
            fetchEvents()
        } else {
            console.error("Failed to edit event")
        }
        setIsLoading(false)
    }

    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(":").map(Number)
        return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`
    }

    const filteredEvents = events.filter(event =>
        date && new Date(event.date).toDateString() === date.toDateString()
    )

    return (
        <div className="grid gap-y-4 p-4 size-full">
            <Calendar
                locale={es}
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border shadow"
                modifiersClassNames={{
                    hasEvents: "day_hasEvents"
                }}
            />
            <Card className="flex-1 shadow">
                <CardHeader>
                    <CardTitle>Evento para {date ? format(date, "dd 'de' MMMM 'de' yyyy", { locale: es }) : "seleccione fecha"}</CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[250px]">
                        {filteredEvents.length > 0 ? (
                            <ul className="space-y-2">
                                {filteredEvents.map((event) => (
                                    <li key={event.id} className="bg-secondary p-2 rounded-md flex items-center">
                                        Titulo del evento: <span className="text-primary font-semibold">{event.title}</span> - Descripcion: <span className="text-primary font-semibold">{event.description}</span> - Hora estimada de la cita: <span className="text-primary font-semibold">{formatTime(event.time)}</span>
                                        <div className="gap-4 flex items-center ml-auto -mt-2">
                                            <EditEventModal event={event} onSave={editEvent} onClose={() => { }}>
                                                <Button variant={"ghost"} className="mt-2 p-0"><Pencil /></Button>
                                            </EditEventModal>
                                            <DeleteEventModal id={event.id!} onDelete={deleteEvent}>
                                                <Button variant={"ghost"} className="mt-2 p-0"><Trash className="stroke-destructive" /></Button>
                                            </DeleteEventModal>

                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-muted-foreground">No existen eventos creados hasta el momento.</p>
                        )}
                    </ScrollArea>
                </CardContent>
                <CardFooter className="flex flex-row items-center gap-2">
                    <div className="w-full">
                        <Label htmlFor="new-event">Titulo del evento</Label>
                        <Input
                            id="new-event"
                            placeholder="Nuevo evento"
                            value={newEventTitle}
                            onChange={(e) => setNewEventTitle(e.target.value)}
                        />
                    </div>
                    <div className="w-full">
                        <Label htmlFor="new-event-time">Hora</Label>
                        <Input
                            type="time"
                            id="new-event-time"
                            placeholder="Hora"
                            value={newEventTime}
                            onChange={(e) => setNewEventTime(e.target.value)}
                        />
                    </div>
                    <div className="w-full">
                        <Label htmlFor="new-event-description">Descripción</Label>
                        <Input
                            id="new-event-description"
                            placeholder="Descripción"
                            value={newEventDescription}
                            onChange={(e) => setNewEventDescription(e.target.value)}
                        />
                    </div>
                    <Button
                        onClick={addEvent}
                        className="mt-2"
                        disabled={isLoading || !newEventTitle.trim() || !newEventTime.trim() || !newEventDescription.trim()}
                    >
                        {isLoading ? "Creando..." : <><Plus className="mr-2 h-4 w-4" /> Añadir</>}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}