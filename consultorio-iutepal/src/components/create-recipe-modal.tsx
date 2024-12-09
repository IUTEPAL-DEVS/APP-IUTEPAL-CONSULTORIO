import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { Textarea } from './ui/textarea';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { Patients } from '../types/patient';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '../hooks/use-toast';

interface CreateRecipeModalProps {
  children: React.ReactNode;
}

const FormSchema = z.object({
  query_consult: z.string(),
  patient_id: z.number(),
});

export const CreateRecipeModal = ({ children }: CreateRecipeModalProps) => {
  const [patients, setPatients] = useState<Patients[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch('/api/pacientes');
        const data = await res.json();
        setPatients(data.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const res = await fetch('/api/reposos', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (res.ok) {
        toast({
          title: 'Reposo Creado con exito',
        });
      } else {
        toast(json.error);
      }
    } catch (error) {
      console.error('Error importing recipe:', error);
      toast({
        title: 'Ocurrio un problema al crear el reposo',
        variant: 'destructive',
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-xl">
        <DialogHeader>
          <DialogTitle>Crear reposo</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="patient_id"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Paciente</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn('justify-between', !field.value && 'text-muted-foreground')}
                        >
                          {field.value
                            ? patients.find((patient) => Number(patient.id) === field.value)?.firts_name
                            : 'Seleccione un paciente...'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput placeholder="Buscar..." />
                        <CommandList>
                          <CommandEmpty>No se encontro ningun paciente registrado.</CommandEmpty>
                          <CommandGroup>
                            {patients.map((patient) => (
                              <CommandItem
                                value={patient.firts_name}
                                key={patient.id}
                                onSelect={() => {
                                  form.setValue('patient_id', Number(patient.id));
                                }}
                              >
                                {patient.firts_name}
                                <Check
                                  className={cn(
                                    'ml-auto',
                                    Number(patient.id) === field.value ? 'opacity-100' : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Puede escoger un paciente para importar el reposo.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="query_consult"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Motivo de consulta</FormLabel>
                  <FormControl>
                    <Textarea className="resize-none" {...field} />
                  </FormControl>
                  <FormDescription>
                    Por favor, ingrese el motivo de consulta del paciente para generar el reposo.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Crear reposo</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
