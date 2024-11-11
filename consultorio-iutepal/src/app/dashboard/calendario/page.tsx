"use client"

import * as React from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Plus } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Calendar } from "@/src/components/ui/calendar"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { ScrollArea } from "@/src/components/ui/scroll-area"

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

    React.useEffect(() => {
        // Fetch events from the API
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
        fetchEvents()
    }, [])

    const addEvent = async () => {
        if (date && newEventTitle.trim() !== "" && newEventTime.trim() !== "") {
            const newEvent: Omit<Event, 'id'> = { // Excluir el campo id
                title: newEventTitle,
                date: date,
                time: newEventTime,
                description: newEventDescription,
            }
            const response = await fetch('/api/eventos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEvent),
            })
            const data = await response.json()
            if (data && data.length > 0) {
                setEvents([...events, data[0]])
            }
            setNewEventTitle("")
            setNewEventTime("")
            setNewEventDescription("")
        }
    }

    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(":").map(Number)
        const period = hours >= 12 ? "PM" : "AM"
        const formattedHours = hours % 12 || 12
        return `${formattedHours}:${minutes < 10 ? `0${minutes}` : minutes} ${period}`
    }

    const eventsForSelectedDate = events.filter(
        (event) => date && new Date(event.date).toDateString() === date.toDateString()
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
                    hasEvents: "relative"
                }}
                modifiers={{
                    hasEvents: (day) => events.some(event => new Date(event.date).toDateString() === day.toDateString())
                }}
            />
            <Card className="flex-1 shadow">
                <CardHeader>
                    <CardTitle>Evento para {date ? format(date, "dd 'de' MMMM 'de' yyyy", { locale: es }) : "seleccione fecha"}</CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[250px]">
                        {eventsForSelectedDate.length > 0 ? (
                            <ul className="space-y-2">
                                {eventsForSelectedDate.map((event) => (
                                    <li key={event.id} className="bg-secondary p-2 rounded-md">
                                        {event.title} - {formatTime(event.time)}
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
                        <Label htmlFor="new-event">Añadir nuevo evento</Label>
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
                    <Button onClick={addEvent} className="mt-2">
                        <Plus className="mr-2 h-4 w-4" /> Añadir
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}