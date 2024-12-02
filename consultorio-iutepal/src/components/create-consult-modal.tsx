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
import { useState, useEffect } from 'react';

import { Checkbox } from './ui/checkbox';
import { Textarea } from './ui/textarea';
import { cn } from '../lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { usePathologies } from '../hooks/use-pathologies';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface ConsultCreateModalProps {
  children: React.ReactNode;
  id?: string;
  title: string;
  sub: string;
  onRefresh: () => void;
}
interface PathologySystem {
  id: number;
  name: string;
}

interface Pathology {
  id: number;
  name: string;
  patholy_system_id: number;
}

const FormSchema = z.object({
  height: z.number(),
  weight: z.number(),
  blood_type: z.string(),
  temperature: z.number(),
  pathology_system: z.number(),
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
  const [unit, setUnit] = useState('cm');
  const [hasReposo, setHasReposo] = useState(false);
  const [weightUnit, setWeightUnit] = useState('kg');
  const [temperatureUnit, setTemperatureUnit] = useState('celsius');

  const [systems, setSystems] = useState<PathologySystem[]>([]);
  const [pathologies, setPathologies] = useState<Pathology[]>([]);
  const [selectedSystem, setSelectedSystem] = useState<number | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      height: 0,
      weight: 0,
      temperature: 0
    },
  });

  const handleHeightChange = (value: string) => {
    let heightInCm = parseFloat(value);
    if (unit === 'm') {
      heightInCm = heightInCm * 100; // Convertir metros a centímetros
    }
    form.setValue('height', heightInCm);
  };

  const handleWeightChange = (value: string) => {
    let weightInKg = parseFloat(value);
    if (weightUnit === 'g') {
      weightInKg = weightInKg / 1000; // Convertir gramos a kilogramos
    }
    form.setValue('weight', weightInKg);
  };

  const handleTemperatureChange = (value: string) => {
    let temperature = parseFloat(value);
    if (temperatureUnit === 'fahrenheit') {
      temperature = (temperature - 32) * (5 / 9); // Convertir Fahrenheit a Celsius
    } else if (temperatureUnit === 'kelvin') {
      temperature = temperature - 273.15; // Convertir Kelvin a Celsius
    }
    form.setValue('temperature', temperature);
  };
  // Cargar sistemas al inicio
  useEffect(() => {
    async function fetchSystems() {
      try {
        const response = await fetch('/api/sistema');
        const result = await response.json();
        setSystems(result.data);
        console.log(result);
      } catch (error) {
        console.error('Error fetching pathology systems:', error);
        toast({
          title: 'Error',
          description: 'No se pudieron cargar los sistemas de patología',
        });
      }
    }
    fetchSystems();
  }, []);

  // Cargar patologías cuando se selecciona un sistema
  useEffect(() => {
    async function fetchPathologies() {
      if (!selectedSystem) {
        setPathologies([]);
        return;
      }

      try {
        const response = await fetch(`/api/patologias?system_id=${selectedSystem}`);
        const result = await response.json();
        setPathologies(result.data);
        console.log('Datos de patologías:', result.data);
      } catch (error) {
        console.error('Error fetching pathologies:', error);
        toast({
          title: 'Error',
          description: 'No se pudieron cargar las patologías',
        });
      }
    }
    fetchPathologies();
  }, [selectedSystem]);

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
            <div className="grid grid-cols-3 gap-3">
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Altura</FormLabel>
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Input
                          {...field}
                          value={unit === 'm' ? (parseFloat(field.value) / 100).toFixed(2) : field.value}
                          onChange={(e) => handleHeightChange(e.target.value)}
                        />
                      </FormControl>
                      <Select onValueChange={setUnit} value={unit}>
                        <SelectTrigger className="w-20">
                          <SelectValue placeholder="Unidad" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cm">cm</SelectItem>
                          <SelectItem value="m">m</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
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
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Input
                          {...field}
                          value={weightUnit === 'g' ? (parseFloat(field.value) * 1000).toFixed(0) : field.value}
                          onChange={(e) => handleWeightChange(e.target.value)}
                        />
                      </FormControl>
                      <Select onValueChange={setWeightUnit} value={weightUnit}>
                        <SelectTrigger className="w-20">
                          <SelectValue placeholder="Unidad" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kg">kg</SelectItem>
                          <SelectItem value="g">g</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
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
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Input
                          {...field}
                          value={
                            temperatureUnit === 'fahrenheit'
                              ? ((parseFloat(field.value) * 9) / 5 + 32).toFixed(2)
                              : temperatureUnit === 'kelvin'
                                ? (parseFloat(field.value) + 273.15).toFixed(2)
                                : field.value
                          }
                          onChange={(e) => handleTemperatureChange(e.target.value)}
                        />
                      </FormControl>
                      <Select onValueChange={setTemperatureUnit} value={temperatureUnit}>
                        <SelectTrigger className="w-20">
                          <SelectValue placeholder="Unidad" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="celsius">°C</SelectItem>
                          <SelectItem value="fahrenheit">°F</SelectItem>
                          <SelectItem value="kelvin">K</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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

            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="pathology_system"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sistema de Patología</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        const systemId = parseInt(value);
                        field.onChange(systemId);
                        setSelectedSystem(systemId);
                        // Reiniciar patología al cambiar sistema
                        form.setValue('pathology', undefined);
                      }}
                      value={field.value ? field.value.toString() : ''}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un sistema" />
                      </SelectTrigger>
                      <SelectContent>
                        {systems.map((system) => (
                          <SelectItem key={system.id} value={system.id.toString()}>
                            {system.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                    <Select
                      onValueChange={(value) => {
                        field.onChange(parseInt(value));
                      }}
                      value={field.value ? field.value.toString() : ''}
                      disabled={!selectedSystem}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione una patología" />
                      </SelectTrigger>
                      <SelectContent>
                        {pathologies.map((pathology) => (
                          <SelectItem key={pathology.id} value={pathology.id.toString()}>
                            {pathology.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
