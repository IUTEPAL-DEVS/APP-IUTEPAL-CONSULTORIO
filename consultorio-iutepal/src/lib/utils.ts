import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const translations: { [key: string]: string } = {
  id: 'Cedula',
  firts_name: 'Nombre',
  last_name: 'Apellido',
  dob: 'Fecha de Nacimiento',
  charge: 'Cargo',
  sex: 'Sexo',
  created_at: 'Fecha de Consulta',
  reason_consultation: 'Motivo de Consulta',
  diagnosis: 'Diagnostico',
};

export function translateColumnId(columnId: string): string {
  return translations[columnId] || columnId;
}

// Función para formatear la fecha
export function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split('-');
  return `${day}-${month}-${year}`;
}
