import { BellIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function IconNotification() {
    return (<Popover>
        <PopoverTrigger asChild>
            <Button variant="link" className="-m-2.5 p-2.5">
                <h3 className="sr-only">Ver Notificaciones</h3>
                <BellIcon
                    className="h-6 w-6 text-black hover:text-quartary transition-all duration-100"
                    aria-hidden="true"
                />
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
            <div className="grid gap-4">
                <div className="space-y-2">
                    <h4 className="font-medium leading-none">Notificaciones</h4>
                    <p className="text-sm text-muted-foreground">
                        No tienes notificaciones pendientes.
                    </p>
                </div>
            </div>
        </PopoverContent>
    </Popover>
    );
}