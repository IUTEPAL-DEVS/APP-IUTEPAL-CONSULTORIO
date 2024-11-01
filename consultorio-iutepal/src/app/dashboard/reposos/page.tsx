'use client'
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { useState } from "react";

const reposos = [
    {
        name: "Carlos Gómez",
        recipes: "Ver",
    },
    {
        name: "Mariana Fuentes",
        recipes: "Ver",
    },
    {
        name: "José Martínez",
        recipes: "Ver",
    },
    {
        name: "Luisa Castillo",
        recipes: "Ver",
    },
    {
        name: "Gabriela Ramírez",
        recipes: "Ver",
    },
];

export default function Page() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section>
            {/* <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
                <DialogPanel className="max-w-4xl">
                    <Flex alignItems="center" justifyContent="between" className="mb-4">
                        <Title className="mb-3">Importar/Registrar Reposo o Recipe</Title>
                        <XMarkIcon
                            className="h-6 w-6 cursor-pointer"
                            onClick={() => setIsOpen(false)}
                        />
                    </Flex>
                    <FileLoad />
                </DialogPanel>
            </Dialog> */}
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex justify-end">
                <Button onClick={() => setIsOpen(true)}>
                    Importar
                </Button>
            </div>
            {reposos.length === 0 ? (
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
                                    <li key={item.name} className="flex justify-between">
                                        <span>{item.name}</span>
                                        <a href="https://mag.wcoomd.org/uploads/2018/05/blank.pdf" target="_blank" rel="noreferrer" className="hover:underline hover:text-primary font-bold">
                                            {item.recipes}
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