"use client";

import { z } from "zod";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "../hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "../lib/utils";
import { Calendar } from "./ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import Link from "next/link";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/src/components/ui/command";
import { languages } from "@/utils/patologia";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";

interface PatientsCreateModalProps {
    children: React.ReactNode
}

const FormSchema = z.object({
    cedula: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    nom1: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    nom2: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    ape1: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    ape2: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    fecn: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    altura: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    peso: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    tipo: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    direccion: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    telefono: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    sexo: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    edad: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    motivo_consulta: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    diagnostico: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    tipo_sangre: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    reposo: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})

export function PatientsCreateModal({ children }: PatientsCreateModalProps) {
    const [hasReposo, setHasReposo] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            cedula: "",
            nom1: "",
            nom2: "",
            ape1: "",
            ape2: "",
            fecn: "",
            altura: "",
            peso: "",
            tipo: "",
            direccion: "",
            telefono: "",
            email: "",
            sexo: "",
            edad: "",
            motivo_consulta: "",
            diagnostico: "",
            tipo_sangre: "",
            reposo: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl overflow-y-scroll sm:h-2/3">
                <DialogHeader>
                    <DialogTitle className="text-xl">Crear paciente nuevo</DialogTitle>
                    <DialogDescription>
                        Asegurese de ingresar todos los datos necesarios para la creacion de un nuevo paciente.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="cedula"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cedula</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-4 gap-4">
                            <FormField
                                control={form.control}
                                name="nom1"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Primer Nombre</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="nom1"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Segundo Nombre</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="ape1"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Apellido Paterno </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="ape2"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Apellido Materno</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="tipo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cargo</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccionar Cargo" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Estudiante">Estudiante</SelectItem>
                                                <SelectItem value="Administracion">Administracion</SelectItem>
                                                <SelectItem value="Docente">Docente</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="direccion"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Direccion Corta</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="telefono"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Telefono celular</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Correo electronico</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="fecn"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fecha de Nacimiento</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "pl-3 text-left font-normal w-full",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Buscar</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value ? new Date(field.value) : undefined}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() || date < new Date("1900-01-01")
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="altura"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Altura</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="peso"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Peso</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="sexo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sexo</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccionar" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="M">Masculino</SelectItem>
                                                <SelectItem value="F">Femenino</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="edad"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Edad</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="tipo_sangre"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tipo de Sangre</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="temperatura"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Temperatura</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="patologia"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Patologia</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn(
                                                            "justify-between w-full",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value
                                                            ? languages.find(
                                                                (language) => language.value === field.value
                                                            )?.label
                                                            : "Seleccione"}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[200px] p-0">
                                                <Command>
                                                    <CommandInput placeholder="Search language..." />
                                                    <CommandList>
                                                        <CommandEmpty>No se encuentran patologias.</CommandEmpty>
                                                        <CommandGroup>
                                                            {languages.map((language) => (
                                                                <CommandItem
                                                                    value={language.label}
                                                                    key={language.value}
                                                                    onSelect={() => {
                                                                        form.setValue("patologia", language.value)
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={cn(
                                                                            "mr-2 h-4 w-4",
                                                                            language.value === field.value
                                                                                ? "opacity-100"
                                                                                : "opacity-0"
                                                                        )}
                                                                    />
                                                                    {language.label}
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="motivo_consulta"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Motivo de Consulta</FormLabel>
                                        <FormControl>
                                            <Textarea

                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="diagnostico"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Diagnostico</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            <FormField
                                control={form.control}
                                name="antescendentes_clinicos"
                                render={({ field }) => (
                                    <FormItem className="flex items-center space-x-2" >
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel>
                                            Posee Antecendentes Clinicos?
                                        </FormLabel>
                                    </FormItem>
                                )}
                            />
                            <div>
                                <FormField
                                    control={form.control}
                                    name="antescendentes_clinicos"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center space-x-2" >
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormLabel>
                                                Fuma?
                                            </FormLabel>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="antescendentes_clinicos"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center space-x-2" >
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormLabel>
                                                Bebe?
                                            </FormLabel>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="antescendentes_clinicos"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center space-x-2" >
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormLabel>
                                                Es Alergico?
                                            </FormLabel>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="antescendentes_clinicos"
                                render={({ field }) => (
                                    <FormItem className="flex items-center space-x-2" >
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel>
                                            Posee alguna discapacidad?
                                        </FormLabel>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="reposoCheckbox"
                                render={({ field }) => (
                                    <FormItem className="flex items-center space-x-2">
                                        <FormControl>
                                            <Checkbox
                                                checked={hasReposo}
                                                onCheckedChange={(checked) => setHasReposo(checked)}
                                            />
                                        </FormControl>
                                        <FormLabel>
                                            El paciente tiene algun tipo de reposo/recipe?
                                        </FormLabel>
                                    </FormItem>
                                )}
                            />
                        </div>
                        {hasReposo && (
                            <FormField
                                control={form.control}
                                name="reposo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Reposo</FormLabel>
                                        <FormControl>
                                            <Input type="file" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        <DialogFooter>
                            <Button type="submit">Crear</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
