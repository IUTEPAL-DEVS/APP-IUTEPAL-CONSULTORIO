"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/src/components/ui/checkbox"
import { Button } from "@/src/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu"
import { Patients } from "@/src/types/patient"
import { ViewPatients } from "@/src/components/view-patients"
import { PatientsCreateModal } from "@/src/components/create-patients-modal"
import { DeletePatientModal } from "@/src/components/delete-patient-modal"

export function columns(handleRefresh: () => void): ColumnDef<Patients>[] {
    return [
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
            accessorKey: "firts_name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Nombre
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="capitalize">{row.getValue("firts_name")}</div>,
        },
        {
            accessorKey: "last_name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Apellido
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="capitalize">{row.getValue("last_name")}</div>,
        },
        {
            accessorKey: "dob",
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
            cell: ({ row }) => <div className="lowercase">{row.getValue("dob")}</div>,
        },
        {
            accessorKey: "charge",
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
            cell: ({ row }) => <div className="capitalize">{row.getValue("charge")}</div>,
        },
        {
            accessorKey: "query_reason",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Motivo de Consulta
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="capitalize">{row.getValue("query_reason")}</div>,
        },
        {
            accessorKey: "diagnosis",
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
            cell: ({ row }) => <div className="capitalize">{row.getValue("diagnosis")}</div>,
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const patient = row.original

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Abrir menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(patient.id)}
                            >
                                Copiar Cedula
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />

                            <div className="flex flex-col gap-y-2">
                                <Button variant={"ghost"}>
                                    <ViewPatients id={patient.id}>
                                        <p>
                                            Ver Paciente
                                        </p>
                                    </ViewPatients>
                                </Button>
                                <Button variant={"ghost"}>
                                    <PatientsCreateModal onRefresh={handleRefresh} sub="modificacion de un" id={patient.id} title="Modificar datos del paciente">
                                        <p>
                                            Modificar Datos
                                        </p>
                                    </PatientsCreateModal>
                                </Button>
                                <Button variant={"destructive"}>
                                    <DeletePatientModal id={patient.id} onRefresh={handleRefresh}>
                                        <p>
                                            Eliminar Paciente
                                        </p>
                                    </DeletePatientModal>
                                </Button>
                            </div>

                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]
}

