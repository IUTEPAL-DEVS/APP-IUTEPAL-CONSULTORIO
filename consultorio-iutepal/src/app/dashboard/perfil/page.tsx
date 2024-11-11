'use client'
import { Skeleton } from "@/src/components/ui/skeleton";
import { ProfileUpdateModal } from "@/src/components/modal-profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { User } from "@/src/types/user";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        const response = await fetch('/api/usuario');
        const data = await response.json();
        setUser(data.user);
        setLoading(false);
    };

    useEffect(() => {
        fetchUser(); // Llamada a fetchUser cuando el componente se monta
    }, []);

    return (
        <div>
            <div className="flex my-5">
                <ProfileUpdateModal title="Editar Imagen de perfil" isImage onUpdate={fetchUser}>
                    {loading ? (
                        <Skeleton className="size-60 rounded-full" />
                    ) : (
                        <Avatar className="size-60 cursor-pointer">
                            <AvatarImage src={user?.avatar_url} alt="Avatar" />
                            <AvatarFallback className="text-5xl">{user?.username?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
                        </Avatar>
                    )}
                </ProfileUpdateModal>
                <div className="m-4">
                    <h2 className="text-3xl">
                        {loading ? <Skeleton className="w-[200px] h-[30px] rounded-full" /> : (user?.username || "NOMBRE DE USUARIO")}
                    </h2>
                    <h3>
                        {loading ? <Skeleton className="w-[250px] h-[20px] rounded-full mt-3" /> : user?.email}
                    </h3>
                </div>
            </div>
            <h2>
                {loading ? <Skeleton className="w-[200px] h-[30px] rounded-full" /> : "Datos personales"}
            </h2>
            <div className="grid grid-cols-3 space-y-4 my-5">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="name">
                        {loading ? <Skeleton className="w-[100px] h-[20px] rounded-full" /> : "Nombre(s)"}
                    </Label>
                    <ProfileUpdateModal title="Editar Nombre" isName onUpdate={fetchUser}>
                        <div className="relative">
                            {loading ? (
                                <Skeleton className="w-full h-[40px] rounded-full" />
                            ) : (
                                <>
                                    <Input type="text" id="name" placeholder="Nombre" readOnly value={user?.name || ""} className="pl-10" />
                                    <Pencil className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </>
                            )}
                        </div>
                    </ProfileUpdateModal>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="apellido_p">
                        {loading ? <Skeleton className="w-[150px] h-[20px] rounded-full" /> : "Apellido Paterno"}
                    </Label>
                    <ProfileUpdateModal title="Editar Apellido Paterno" isApellidoPaterno onUpdate={fetchUser}>
                        <div className="relative">
                            {loading ? (
                                <Skeleton className="w-full h-[40px] rounded-full" />
                            ) : (
                                <>
                                    <Input type="text" id="apellido_p" placeholder="Apellido Paterno" readOnly value={user?.apellido_p || ""} className="pl-10" />
                                    <Pencil className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </>
                            )}
                        </div>
                    </ProfileUpdateModal>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="apellido_m">
                        {loading ? <Skeleton className="w-[150px] h-[20px] rounded-full" /> : "Apellido Materno"}
                    </Label>
                    <ProfileUpdateModal title="Editar Apellido Materno" isApellidoMaterno onUpdate={fetchUser}>
                        <div className="relative">
                            {loading ? (
                                <Skeleton className="w-full h-[40px] rounded-full" />
                            ) : (
                                <>
                                    <Input type="text" id="apellido_m" placeholder="Apellido Materno" readOnly value={user?.apellido_m || ""} className="pl-10" />
                                    <Pencil className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </>
                            )}
                        </div>
                    </ProfileUpdateModal>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="user_id">
                        {loading ? <Skeleton className="w-[150px] h-[20px] rounded-full" /> : "Nombre de Usuario"}
                    </Label>
                    <ProfileUpdateModal title="Editar Username" isUsername onUpdate={fetchUser}>
                        <div className="relative">
                            {loading ? (
                                <Skeleton className="w-full h-[40px] rounded-full" />
                            ) : (
                                <>
                                    <Input type="text" id="username" placeholder="Username" readOnly value={user?.username || ""} className="pl-10" />
                                    <Pencil className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </>
                            )}
                        </div>
                    </ProfileUpdateModal>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">
                        {loading ? <Skeleton className="w-[150px] h-[20px] rounded-full" /> : "Correo electrónico"}
                    </Label>
                    {loading ? (
                        <Skeleton className="w-full h-[40px] rounded-full" />
                    ) : (
                        <Input type="email" id="email" placeholder="Email" disabled value={user?.email || ""} />
                    )}
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="phone">
                        {loading ? <Skeleton className="w-[150px] h-[20px] rounded-full" /> : "Teléfono"}
                    </Label>
                    <ProfileUpdateModal title="Editar Número Telefónico" isPhone onUpdate={fetchUser}>
                        <div className="relative">
                            {loading ? (
                                <Skeleton className="w-full h-[40px] rounded-full" />
                            ) : (
                                <>
                                    <Input type="text" id="phone" placeholder="Teléfono" readOnly value={user?.phone || ""} className="pl-10" />
                                    <Pencil className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </>
                            )}
                        </div>
                    </ProfileUpdateModal>
                </div>
            </div>
        </div>
    );
}