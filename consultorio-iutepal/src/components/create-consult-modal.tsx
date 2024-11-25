'use client';

import { z } from 'zod';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '../hooks/use-toast';
import { useEffect, useState } from 'react';

import { Checkbox } from './ui/checkbox';
import { Textarea } from './ui/textarea';
import { cn } from '../lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { languages } from '@/utils/patologia';

interface ConsultCreateModalProps {
  children: React.ReactNode;
  id?: string;
  title: string;
  sub: string;
  onRefresh: () => void;
}

const FormSchema = z.object({
  height: z.string(),
  weight: z.string(),
  blood_type: z.string(),
  temperature: z.string(),
  pathology: z.string(),
  reason_consultation: z.string(),
  diagnosis: z.string(),
  medical_history: z.boolean().optional(),
  smoke: z.boolean().optional(),
  drink: z.boolean().optional(),
  allergic: z.boolean().optional(),
  discapacity: z.boolean().optional(),
  recipe_url: z.string().optional(),
});

export function ConsultCreateModal({ children, id, title, sub, onRefresh }: ConsultCreateModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  const [hasReposo, setHasReposo] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchPatient = async () => {
        const response = await fetch(`/api/consultas?patient_id=${id}`);
        console.log(response);
        const result = await response.json();
        const patient = result.data[0];
        form.reset({
          height: patient.height,
          weight: patient.weight,
          blood_type: patient.blood_type,
          temperature: patient.temperature,
          pathology: patient.pathology,
          reason_consultation: patient.reason_consultation,
          diagnosis: patient.diagnosis,
          medical_history: patient.medical_history,
          smoke: patient.smoke,
          drink: patient.drink,
          allergic: patient.allergic,
          discapacity: patient.discapacity,
          recipe_url: patient.recipe_url,
        });
      };
      fetchPatient();
    }
  }, [id, form]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);

    try {
      const payload = {
        ...data,
        patient_id: id,
      };

      const response = await fetch(id ? `/api/consultas?patient_id=${id}` : `/api/consultas`, {
        method: id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cedula: id, ...payload }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast({
          title: 'Error',
          description: errorData.error,
        });
        return;
      }

      const result = await response.json();
      console.log(result);
      toast({
        title: 'Éxito',
        description: 'Se ha creado la consulta de manera exitosa.',
      });
      onRefresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="overflow-y-scroll sm:h-2/3 sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl">{title}</DialogTitle>
          <DialogDescription>
            Asegurese de ingresar todos los datos necesarios para la {sub} paciente.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                          className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}
                        >
                          {field.value
                            ? languages.find((language) => language.value === field.value)?.label
                            : 'Seleccione'}
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
                                  form.setValue('pathology', language.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    language.value === field.value ? 'opacity-100' : 'opacity-0'
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
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="reason_consultation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Motivo de Consulta</FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
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
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="medical_history"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox onCheckedChange={field.onChange} checked={field.value || false} />
                    </FormControl>
                    <FormLabel>Posee Antecendentes Clinicos?</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="smoke"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox onCheckedChange={field.onChange} checked={field.value || false} />
                    </FormControl>
                    <FormLabel>Fuma?</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="drink"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox onCheckedChange={field.onChange} checked={field.value || false} />
                    </FormControl>
                    <FormLabel>Bebe?</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="allergic"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox onCheckedChange={field.onChange} checked={field.value || false} />
                    </FormControl>
                    <FormLabel>Es Alergico?</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discapacity"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox onCheckedChange={field.onChange} checked={field.value || false} />
                    </FormControl>
                    <FormLabel>Posee alguna discapacidad?</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox checked={hasReposo} onCheckedChange={(checked) => setHasReposo(checked === true)} />
                </FormControl>
                <FormLabel>El paciente tiene algun tipo de reposo/recipe?</FormLabel>
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
                      <Input type="file" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Guardando...' : 'Guardar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
