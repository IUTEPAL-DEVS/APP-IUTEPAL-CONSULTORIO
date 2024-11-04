'use client'
import { ProfileUpdateModal } from "@/src/components/modal-profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { User } from "@/src/types/user";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch('/api/usuario');
            const data = await response.json();
            setUser(data.user);
        };

        fetchUser();
    }, []);

    return (
        <div>
            <div className="flex my-5">
                <Avatar className="size-60">
                    <AvatarImage />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="m-4">
                    <h2 className="text-3xl">NOMBRE DE USUARIO</h2>
                    <h3>{user?.role}</h3>
                </div>
            </div>
            <h2>Datos personales</h2>
            <div className="grid grid-cols-3 space-y-4 my-5">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="text">Nombre(s)</Label>
                    <Input type="text" id="text" placeholder="Nombre" disabled />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="text">Apellido Paterno</Label>
                    <Input type="text" id="text" placeholder="Apellido Paterno" disabled />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="text">Apellido Materno</Label>
                    <Input type="text" id="text" placeholder="Apellido Materno" disabled />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="text">ID de usuario</Label>
                    <Input type="text" id="text" placeholder="ID de usuario" value={user?.id} disabled />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Correo electronico</Label>
                    <ProfileUpdateModal title="Editar Correo Electronico" isEmail>
                        <div className="relative">
                            <Input type="email" id="email" placeholder="Email" readOnly value={user?.email} className="pl-10" />
                            <Pencil className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </ProfileUpdateModal>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="number">Telefono</Label>
                    <ProfileUpdateModal title="Editar Numero Telefonico" isPhone>
                        <div className="relative">
                            <Input type="number" id="number" placeholder="Telefono" readOnly value={user?.phone} className="pl-10" />
                            <Pencil className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </ProfileUpdateModal>
                </div>
            </div>
        </div>
    );
}