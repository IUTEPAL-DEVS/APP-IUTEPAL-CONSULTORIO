'use client'
import { useEffect, useState } from 'react';
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";

interface Reposo {
    id: string;
    patient_name: string;
    recipe_url: string;
}

export default function Page() {
    const [reposos, setReposos] = useState<Reposo[]>([]);
    const [loading, setLoading] = useState(true);

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

    console.log(reposos);

    return (
        <section>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex justify-end">
                <Button>
                    Importar
                </Button>
            </div>
            {loading ? (
                <p className="mt-3">Cargando...</p>
            ) : reposos.length === 0 ? (
                <p className="mt-3">
                    No se encuentran Reposos registrados Actualmente.
                </p>
            ) : (
                <>
                    <h3 className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
                        Reposos Disponibles
                    </h3>
                    <Card className="mt-5 w-full">
                        <CardContent>
                            <ul className="mt-2">
                                {reposos.map((item) => (
                                    <li key={item.id} className="flex justify-between">
                                        <span>{item.patient_name}</span>
                                        <a href={item.recipe_url} target="_blank" rel="noreferrer" className="hover:underline hover:text-primary font-bold">
                                            Ver
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </>
            )}
        </section>
    );
}