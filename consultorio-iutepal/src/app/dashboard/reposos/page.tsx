'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/src/components/ui/button';
import { Card } from '@/src/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/components/ui/dialog';
import { Label } from '@/src/components/ui/label';
import { Input } from '@/src/components/ui/input';

interface Reposo {
  id: string;
  patient_name: string;
  recipe_url: string;
}

export default function Page() {
  const [reposos, setReposos] = useState<Reposo[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    recipe_url: '',
    patient_name: '',
    consultation_id: '',
  });

  useEffect(() => {
    async function fetchReposos() {
      try {
        const res = await fetch('/api/reposos');
        if (!res.ok) {
          throw new Error('Error fetching data');
        }
        const { data } = await res.json();
        setReposos(data);
      } catch (error) {
        console.error('Error fetching reposos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchReposos();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/reposos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
      <div className="mt-4 flex justify-end sm:ml-16 sm:mt-0 sm:flex-none">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">Importar Reposo</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Importar</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="recipe_url" className="text-right">
                  Recipe URL
                </Label>
                <Input
                  id="recipe_url"
                  value={formData.recipe_url}
                  onChange={handleChange}
                  className="col-span-3"
                  type="file"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="patient_name" className="text-right">
                  Nombre del Paciente
                </Label>
                <Input id="patient_name" value={formData.patient_name} onChange={handleChange} className="col-span-3" />
              </div>
              <DialogFooter>
                <Button type="submit">Guardar Reposo</Button>
              </DialogFooter>
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
                  <a
                    href={item.recipe_url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold hover:text-primary hover:underline"
                  >
                    Ver
                  </a>
                </li>
              ))}
            </ul>
          </Card>
        </>
      )}
    </section>
  );
}
