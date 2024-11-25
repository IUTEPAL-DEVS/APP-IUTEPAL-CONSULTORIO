'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/src/components/ui/button';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { ViewPatients } from '@/src/components/view-patients';
import { PatientsCreateModal } from '@/src/components/create-patients-modal';
import { ConsultData } from '@/src/types/consult-data';
import { formatDate } from '@/utils/form-date';

export function columns(handleRefresh: () => void): ColumnDef<ConsultData>[] {
  return [
    {
      accessorKey: 'created_at',
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Fecha de Consulta
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="lowercase">{formatDate(row.getValue('created_at'))}</div>,
    },
    {
      accessorKey: 'reason_consultation',
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Motivo de Consulta
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="capitalize">{row.getValue('reason_consultation')}</div>,
    },
    {
      accessorKey: 'diagnosis',
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Diagnostico
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="capitalize">{row.getValue('diagnosis')}</div>,
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const patient = row.original;

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
              <DropdownMenuSeparator />

              <div className="flex flex-col gap-y-2">
                <Button variant={'ghost'}>
                  <ViewPatients id={patient.id}>
                    <p>Ver Datos completos</p>
                  </ViewPatients>
                </Button>
                <Button variant={'ghost'}>
                  <PatientsCreateModal
                    onRefresh={handleRefresh}
                    sub="modificacion de un"
                    id={patient.id}
                    title="Modificar datos del paciente"
                  >
                    <p>Modificar Datos</p>
                  </PatientsCreateModal>
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
