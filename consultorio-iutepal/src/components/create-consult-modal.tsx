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
import { ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { usePathologies } from '../hooks/use-pathologies';

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
  pathology: z.number(),
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
  const { pathologies }: { pathologies: { id: string; name: string }[] } = usePathologies();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  const [hasReposo, setHasReposo] = useState(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);

    try {
      const payload = {
        ...data,
        patient_id: id,
      };

      const response = await fetch(`/api/consultas?patient_id=${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...payload }),
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
                  <FormLabel>Patología</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}
                        >
                          {field.value
                            ? pathologies.find((pathology) => pathology.id === field.value)?.name
                            : 'Seleccione'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Buscar patología..." />
                        <CommandList>
                          <CommandEmpty>No se encuentran patologías.</CommandEmpty>
                          <CommandGroup>
                            {pathologies.map((pathology) => (
                              <CommandItem
                                value={pathology.name}
                                key={pathology.id}
                                onSelect={() => {
                                  form.setValue('pathology', pathology.id);
                                }}
                              >
                                {pathology.name}
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
