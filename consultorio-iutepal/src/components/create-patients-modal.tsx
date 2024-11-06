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
    id: z.string(),
    firts_name: z.string(),
    second_name: z.string(),
    last_name: z.string(),
    second_last_name: z.string(),
    dob: z.date({
        required_error: "A date of birth is required.",
    }),
    height: z.string(),
    weight: z.string(),
    charge: z.string(),
    direction: z.string(),
    phone: z.string(),
    email: z.string(),
    sex: z.string(),
    age: z.string(),
    query_reason: z.string(),
    diagnosis: z.string(),
    blood_type: z.string(),
    temperature: z.string(),
    pathology: z.string(),
    clinical_history: z.boolean().default(false).optional(),
    recipe_url: z.string().optional(),
    smoke: z.boolean().default(false).optional(),
    drink: z.boolean().default(false).optional(),
    allergic: z.boolean().default(false).optional(),
    disability: z.boolean().default(false).optional(),
})

export function PatientsCreateModal({ children }: PatientsCreateModalProps) {
    const [hasReposo, setHasReposo] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            id: "",
            firts_name: "",
            second_name: "",
            last_name: "",
            second_last_name: "",
            height: "",
            weight: "",
            charge: "",
            direction: "",
            phone: "",
            email: "",
            sex: "",
            age: "",
            query_reason: "",
            diagnosis: "",
            blood_type: "",
            temperature: "",
            pathology: "",
            recipe_url: "",
            clinical_history: false,
            smoke: false,
            drink: false,
            allergic: false,
            disability: false,
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsLoading(true);
        setIsSuccess(false);
        setIsError(false);

        try {
            const response = await fetch('/api/pacientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                toast({
                    title: "Error",
                    description: errorData.error,
                });
                setIsError(true);
                return;
            }

            const result = await response.json();
            console.log(result);
            setIsSuccess(true);

        } catch (error) {
            console.error(error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl overflow-y-scroll sm:h-2/3 lg:h-5/6">
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
                            name="id"
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
                                name="firts_name"
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
                                name="second_name"
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
                                name="last_name"
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
                                name="second_last_name"
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
                                name="charge"
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
                                name="direction"
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
                                name="phone"
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
                                name="dob"
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
                                name="height"
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
                                name="weight"
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
                                name="sex"
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
                                                <SelectItem value="Masculino">Masculino</SelectItem>
                                                <SelectItem value="Femenino">Femenino</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="age"
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
                                name="blood_type"
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
                                name="temperature"
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
                                name="pathology"
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
                                                                        form.setValue("pathology", language.value)
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
                                name="query_reason"
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
                                name="diagnosis"
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
                                name="clinical_history"
                                render={({ field }) => (
                                    <FormItem className="flex items-center space-x-2" >
                                        <FormControl>
                                            <Checkbox
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
                                    name="smoke"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center space-x-2" >
                                            <FormControl>
                                                <Checkbox
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
                                    name="drink"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center space-x-2" >
                                            <FormControl>
                                                <Checkbox
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
                                    name="allergic"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center space-x-2" >
                                            <FormControl>
                                                <Checkbox
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
                                name="disability"
                                render={({ field }) => (
                                    <FormItem className="flex items-center space-x-2" >
                                        <FormControl>
                                            <Checkbox
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel>
                                            Posee alguna discapacidad?
                                        </FormLabel>
                                    </FormItem>
                                )}
                            />
                            <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                    <Checkbox
                                        checked={hasReposo}
                                        onCheckedChange={(checked) => setHasReposo(checked === true)}
                                    />
                                </FormControl>
                                <FormLabel>
                                    El paciente tiene algun tipo de reposo/recipe?
                                </FormLabel>
                            </FormItem>

                        </div>
                        {hasReposo && (
                            <FormField
                                control={form.control}
                                name="recipe_url"
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
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? "Creando..." : "Crear"}
                            </Button>
                        </DialogFooter>
                        {isSuccess && <p className="text-green-500">Paciente creado exitosamente!</p>}
                        {isError && <p className="text-red-500">Hubo un error al crear el paciente.</p>}
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
