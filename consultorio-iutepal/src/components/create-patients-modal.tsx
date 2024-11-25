'use client';

import { optional, z } from 'zod';
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
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { useEffect, useState } from 'react';
import { Checkbox } from './ui/checkbox';
import { Calendar } from './ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { languages } from '@/utils/patologia';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { Textarea } from './ui/textarea';
import { ErrorModal } from './send-error-modal';
import { SuccessModal } from './send-success-modal';
import { DatePicker } from './date-picker';

interface PatientsCreateModalProps {
  children: React.ReactNode;
  id?: string;
  title: string;
  sub: string;
  onRefresh: () => void;
}

const FormSchema = z.object({
  id: z.string().optional(),
  firts_name: z.string().optional(),
  second_name: z.string().optional(),
  last_name: z.string().optional(),
  second_last_name: z.string().optional(),
  dob: z
    .date({
      required_error: 'La fecha de Nacimiento es requerida.',
    })
    .optional(),
  charge: z.string().optional(),
  direction: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  sex: z.string().optional(),
  age: z.string().optional(),
});

export function PatientsCreateModal({ children, id, title, sub, onRefresh }: PatientsCreateModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (id) {
      const fetchPatient = async () => {
        const response = await fetch(`/api/pacientes?id=${id}`);
        const result = await response.json();
        const patient = result.data[0];
        form.reset({
          id: patient.id.toString(),
          firts_name: patient.firts_name,
          second_name: patient.second_name,
          last_name: patient.last_name,
          second_last_name: patient.second_last_name,
          dob: new Date(patient.dob),
          charge: patient.charge,
          direction: patient.direction,
          phone: patient.phone,
          email: patient.email,
          sex: patient.sex,
          age: patient.age.toString(),
        });
      };
      fetchPatient();
    }
  }, [id, form]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);

    try {
      const payload = {
        ...data,
        id: data.id ? parseInt(data.id, 10) : undefined,
        age: data.age ? parseInt(data.age, 10) : undefined,
        dob: data.dob ? new Date(data.dob) : undefined,
      };

      const response = await fetch(id ? `/api/pacientes` : '/api/pacientes', {
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
        setIsError(true);
        return;
      }

      const result = await response.json();
      console.log(result);
      setIsSuccess(true);
      onRefresh();
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="overflow-y-scroll sm:h-2/3 sm:max-w-3xl lg:h-5/6">
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
                    <FormLabel>Apellido Paterno</FormLabel>
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
                    <DatePicker {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
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
                            /> */}
              {/* <FormField
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
                            /> */}
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
              {/* <FormField
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
                            /> */}
              {/* <FormField
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
                            /> */}
              {/* <FormField
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
                            /> */}
            </div>
            {/* <div className="grid grid-cols-2 gap-3">
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
                        </div> */}
            {/* <div className="grid grid-cols-4 gap-4">
                            <FormField
                                control={form.control}
                                name="clinical_history"
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
                                name="disability"
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
                                    <Checkbox
                                        checked={hasReposo}
                                        onCheckedChange={(checked) => setHasReposo(checked === true)}
                                    />
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
                        )} */}
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
