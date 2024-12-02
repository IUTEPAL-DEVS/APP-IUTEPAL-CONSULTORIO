'use client';

import { z } from 'zod';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { PathologySystem } from '../types/system-pathology';

interface ConsultCreateModalProps {
  children: React.ReactNode;
  id?: string;
  title: string;
  onRefresh?: () => void;
}

const FormSchema = z.object({
  system_pathology: z.string().nonempty('Este campo es requerido'),
  pathology: z.string().nonempty('Este campo es requerido'),
});

export function CreatePathologyModal({ children, title }: ConsultCreateModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [systemPathology, setSystemPathology] = useState<PathologySystem[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/sistema');
        const data = await response.json();
        setSystemPathology(data);
      } catch (error) {
        console.error('Error fetching systems:', error);
      }
    }

    fetchData();
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);

    try {
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <FormField
                control={form.control}
                name="system_pathology"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sistema Patologia</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un sistema" />
                        </SelectTrigger>
                        <SelectContent>
                          {systemPathology.map((system) => (
                            <SelectItem key={system.id} value={system.id.toString()}>
                              {system.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
