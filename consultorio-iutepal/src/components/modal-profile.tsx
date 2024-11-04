'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "../hooks/use-toast"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { User } from "../types/user"

interface ProfileUpdateModalProps {
    children: React.ReactNode
    title: string
    isEmail?: boolean
    isPhone?: boolean
}

const FormSchema = z.object({
    email: z.string().email({ message: "Correo electronico invalido" }).optional(),
    phone: z.string().min(10, { message: "Numero telefonico invalido" }).optional(),
});

export const ProfileUpdateModal: React.FC<ProfileUpdateModalProps> = ({ children, title, isEmail, isPhone }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch('/api/usuario');
            const data = await response.json();
            setUser(data.user);
        };

        fetchUser();
    }, []);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: user?.email,
            phone: user?.phone,
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        Actualiza tus datos si son de total importancia.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {isEmail && (
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Correo Electronico</FormLabel>
                                        <FormControl>
                                            <Input defaultValue={user?.email} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                        {isPhone && (
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Numero Telefonico</FormLabel>
                                        <FormControl>
                                            <Input defaultValue={user?.phone} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                        <DialogFooter className="sm:justify-end">
                            <Button type="submit">Actualizar</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};