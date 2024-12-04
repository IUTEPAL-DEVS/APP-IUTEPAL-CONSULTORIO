'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/src/components/ui/button';
import { Card } from '@/src/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/src/components/ui/dialog';
import { Label } from '@/src/components/ui/label';
import { Input } from '@/src/components/ui/input';
import Link from 'next/link';
import { Textarea } from '@/src/components/ui/textarea';

interface Reposo {
  id: string;
  patient_name: string;
  recipe_url: string;
  consultation_id: string;
}

export default function Page() {
  const [reposos, setReposos] = useState<Reposo[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<{
    recipe_url: File | null;
    patient_name: string;
    consultation_id: string;
  }>({
    recipe_url: null,
    patient_name: '',
    consultation_id: '',
  });

  useEffect(() => {
    const fetchReposos = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/reposos');
        const data = await res.json();
        if (Array.isArray(data.data)) {
          setReposos(data.data);
        } else {
          console.error('Unexpected response format:', data);
        }
      } catch (error) {
        console.error('Error fetching reposos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReposos();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, files } = e.target;
    if (id === 'recipe_url' && files) {
      setFormData((prevState) => ({
        ...prevState,
        [id]: files[0], // guarda el archivo seleccionado
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    if (formData.recipe_url) {
      formDataToSend.append('file', formData.recipe_url);
    }
    formDataToSend.append('patient_name', formData.patient_name);

    try {
      const res = await fetch('/api/reposos', {
        method: 'POST',
        body: formDataToSend,
      });
      if (!res.ok) {
        throw new Error('Error importing recipe');
      }
      const newRecipe = await res.json();
      setReposos((prevReposos) => [...prevReposos, newRecipe]);
    } catch (error) {
      console.error('Error importing recipe:', error);
    }
  };

  return (
    <section>
      <div className="mt-4 flex justify-end space-x-5 sm:ml-16 sm:mt-0 sm:flex-none">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">Importar Reposo</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Importar</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4" encType="multipart/form-data">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="recipe_url" className="text-right">
                  Recipe URL
                </Label>
                <Input id="recipe_url" name="recipe_url" onChange={handleChange} className="col-span-3" type="file" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="patient_name" className="text-right">
                  Nombre del Paciente
                </Label>
                <Input
                  id="patient_name"
                  name="patient_name"
                  value={formData.patient_name}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <Button type="submit">Subir reposo</Button>
            </form>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">Crear nuevo reposo</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] lg:max-w-xl">
            <DialogHeader>
              <DialogTitle>Crear reposo</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4" encType="multipart/form-data">
              <div className="items-center gap-4 space-y-3">
                <Label htmlFor="patient_name" className="text-right">
                  Nombre del Paciente
                </Label>
                <Input
                  id="patient_name"
                  name="patient_name"
                  value={formData.patient_name}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="items-center gap-4 space-y-3">
                <Label htmlFor="description" className="text-right">
                  Asunto
                </Label>
                <Textarea placeholder="asunto del reposo" />
              </div>
              <Button type="submit">Registrar reposo</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {loading ? (
        <p className="mt-3">Cargando reposos...</p>
      ) : reposos.length === 0 ? (
        <p className="mt-3">No se encuentran Reposos registrados Actualmente.</p>
      ) : (
        <>
          <h3 className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
            Reposos Disponibles
          </h3>
          <Card className="mt-5 w-full p-6">
            <ul className="mt-2">
              {reposos.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>{item.patient_name}</span>
                  <Link
                    href={item.recipe_url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold hover:text-primary hover:underline"
                  >
                    Ver
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        </>
      )}
    </section>
  );
}
