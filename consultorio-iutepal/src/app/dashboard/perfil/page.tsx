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

    const fetchUser = async () => {
        const response = await fetch('/api/usuario');
        const data = await response.json();
        setUser(data.user);
    };

    useEffect(() => {
        fetchUser(); // Llamada a fetchUser cuando el componente se monta
    }, []);

    return (
        <div>
            <div className="flex my-5">
                <Avatar className="size-60">
                    <AvatarImage src={user?.avatar_url} alt="Avatar" />
                    <AvatarFallback>{user?.username?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
                </Avatar>
                <div className="m-4">
                    <h2 className="text-3xl">{user?.username || "NOMBRE DE USUARIO"}</h2>
                    <h3>{user?.email}</h3>
                </div>
            </div>
            <h2>Datos personales</h2>
            <div className="grid grid-cols-3 space-y-4 my-5">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="name">Nombre(s)</Label>
                    <ProfileUpdateModal title="Editar Nombre"  isName onUpdate={fetchUser}>
                    <div className="relative">
                         <Input type="text" id="name" placeholder="Nombre" readOnly value={user?.name || ""} className="pl-10"/>
                         <Pencil className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    </ProfileUpdateModal>
                </div>   
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="apellido_p">Apellido Paterno</Label>
                    <ProfileUpdateModal title="Editar Apellido Paterno" isApellidoPaterno onUpdate={fetchUser}>
                    <div className="relative">
                        <Input type="text" id="apellido_p" placeholder="Apellido Paterno" readOnly value={user?.apellido_p || ""} className="pl-10"/>
                        <Pencil className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    </ProfileUpdateModal>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="apellido_m">Apellido Materno</Label>
                    <ProfileUpdateModal title="Editar Apellido Materno" isApellidoMaterno onUpdate={fetchUser}>
                    <div className="relative">
                        <Input type="text" id="apellido_m" placeholder="Apellido Materno" readOnly value={user?.apellido_m || ""} className="pl-10"/>
                        <Pencil className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    </ProfileUpdateModal>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="user_id">ID de usuario</Label>
                    <Input type="text" id="user_id" placeholder="ID de usuario" disabled value={user?.user_id || ""} />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input type="email" id="email" placeholder="Email" disabled value={user?.email || ""}  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="phone">Teléfono</Label>
                    <ProfileUpdateModal title="Editar Número Telefónico" isPhone onUpdate={fetchUser}>
                        <div className="relative">
                            <Input type="text" id="phone" placeholder="Teléfono" readOnly value={user?.phone || ""} className="pl-10" />
                            <Pencil className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </ProfileUpdateModal>
                </div>
            </div>
        </div>
    );
}
