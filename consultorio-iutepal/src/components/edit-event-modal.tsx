import * as React from "react"
import { ErrorModal } from "./send-error-modal"
import { SuccessModal } from "./send-success-modal"
import { Button } from "./ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

interface Event {
    id?: string
    id_patient?: string
    title: string
    date: Date
    time: string
    description?: string
}

interface EditEventModalProps {
    event: Event
    onClose: () => void
    onSave: (event: Event) => void
    children: React.ReactNode
}

export const EditEventModal: React.FC<EditEventModalProps> = ({ children, event, onClose, onSave }) => {
    const [newEventTitle, setNewEventTitle] = React.useState(event.title);
    const [newEventTime, setNewEventTime] = React.useState(event.time);
    const [newEventDescription, setNewEventDescription] = React.useState(event.description || "");
    const [isError, setIsError] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);

    const handleSave = () => {
        const updatedEvent = { ...event, title: newEventTitle, time: newEventTime, description: newEventDescription };
        onSave(updatedEvent);
        setIsSuccess(true);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Evento</DialogTitle>
                </DialogHeader>
                <div className="w-full">
                    <Label htmlFor="new-event">Titulo del evento</Label>
                    <Input
                        id="new-event"
                        value={newEventTitle}
                        onChange={(e) => setNewEventTitle(e.target.value)}
                    />
                </div>
                <div className="w-full">
                    <Label htmlFor="new-event-time">Hora</Label>
                    <Input
                        type="time"
                        id="new-event-time"
                        value={newEventTime}
                        onChange={(e) => setNewEventTime(e.target.value)}
                    />
                </div>
                <div className="w-full">
                    <Label htmlFor="new-event-description">Descripción</Label>
                    <Input
                        id="new-event-description"
                        value={newEventDescription}
                        onChange={(e) => setNewEventDescription(e.target.value)}
                    />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <Button variant="default" onClick={handleSave}>Actualizar evento</Button>
                </DialogFooter>
            </DialogContent>
            <ErrorModal
                messageBody={'Hubo un error al actualizar el evento.'}
                title="Error al enviar la solicitud"
                isError={isError}
                setIsError={setIsError}
            />
            <SuccessModal
                title="Exito!"
                messageBody="Evento actualizado exitosamente!"
                isSuccess={isSuccess}
                setIsSuccess={setIsSuccess}
            />
        </Dialog>
    );
};