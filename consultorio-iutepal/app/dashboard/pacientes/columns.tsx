"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string
    name: string
    lastName: string
    date: string
    post: string
    MC: string
    status: "activo" | "inactivo"
    email?: string
}

export const data: Payment[] = [
    {
        name: "Carlos José",
        lastName: "Pérez García",
        date: "05/01/2024",
        id: "27654321",
        post: "Administracion",
        MC: "Evaluación Anual",
        status: "inactivo",
    },
    {
        name: "Mariana Alejandra",
        lastName: "García Pérez",
        date: "12/01/2024",
        id: "29876543",
        post: "Administracion",
        MC: "Ingreso",
        status: "activo",
    },
    {
        name: "José Luis",
        lastName: "Martínez González",
        date: "19/01/2024",
        id: "24567890",
        post: "Estudiante",
        MC: "Revisión Médica",
        status: "activo",
    },
    {
        name: "Luisa Fernanda",
        lastName: "González Martínez",
        date: "26/01/2024",
        id: "26789012",
        post: "Administración",
        MC: "Capacitación",
        status: "inactivo",
    },
    {
        name: "Gabriela Isabel",
        lastName: "Hernández Pérez",
        date: "02/02/2024",
        id: "28901234",
        post: "Estudiante",
        MC: "Evaluación Psicológica",
        status: "activo",
    },
    {
        name: "Andrés José",
        lastName: "Pérez Hernández",
        date: "09/02/2024",
        id: "21034567",
        post: "Administración",
        MC: "Actualización de Datos",
        status: "inactivo",
    },
    {
        name: "Sofía Alejandra",
        lastName: "García Martínez",
        date: "16/02/2024",
        id: "22345678",
        post: "Estudiante",
        MC: "Consulta General",
        status: "activo",
    },
    {
        name: "Eduardo José",
        lastName: "Martínez García",
        date: "07/01/2024",
        id: "39567890",
        post: "Administración",
        MC: "Inducción de Personal",
        status: "activo",
    },
    {
        name: "Samantha Alejandra",
        lastName: "González Pérez",
        date: "15/01/2024",
        id: "40789123",
        post: "Administración",
        MC: "Formación en Gestión",
        status: "inactivo",
    },
    {
        name: "Diego José",
        lastName: "Hernández Martínez",
        date: "23/01/2024",
        id: "41901234",
        post: "Estudiante",
        MC: "Orientación Académica",
        status: "activo",
    },
    {
        name: "Lucía Alejandra",
        lastName: "Pérez García",
        date: "31/01/2024",
        id: "43012345",
        post: "Administración",
        MC: "Desarrollo Profesional",
        status: "inactivo",
    },
    {
        name: "Omar José",
        lastName: "Martínez Pérez",
        date: "08/02/2024",
        id: "44234567",
        post: "Estudiante",
        MC: "Asesoría de Carrera",
        status: "activo",
    },
    {
        name: "Carmen Lugo",
        lastName: "García Hernández",
        date: "16/02/2024",
        id: "45345678",
        post: "Administración",
        MC: "Evaluación de Competencias",
        status: "inactivo",
    },
    {
        name: "Julio César",
        lastName: "Salas Martínez",
        date: "24/02/2024",
        id: "46456789",
        post: "Estudiante",
        MC: "Revisión de Plan de Estudios",
        status: "activo",
    },
]

export const columns: ColumnDef<Payment>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Cedula
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("id")}</div>,
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nombres
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
    },
    {
        accessorKey: "lastName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Apellidos
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("lastName")}</div>,
    },
    {
        accessorKey: "date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Fecha de Consulta
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("date")}</div>,
    },
    {
        accessorKey: "post",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Cargo
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("post")}</div>,
    },
    {
        accessorKey: "MC",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Motivo de Consutla
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("MC")}</div>,
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Diagnostico
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("status")}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Copiar Cedula
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Ver Paciente</DropdownMenuItem>
                        <DropdownMenuItem>Modificar Datos</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
