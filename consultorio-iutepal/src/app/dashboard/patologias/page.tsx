'use client';
import { CreatePathologyModal } from '@/src/components/create-pathology-modal';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/src/components/ui/accordion';
import { Button } from '@/src/components/ui/button';
import { capitalizeFirstLetter } from '@/src/lib/utils';
import { PathologySystem } from '@/src/types/system-pathology';
import { PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Pathology {
  id: number;
  name: string;
  pathology_system_id: number;
}

export default function Page() {
  const [systemPathology, setSystemPathology] = useState<PathologySystem[]>([]);
  const [pathologies, setPathologies] = useState<Pathology[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [systemsResponse, pathologiesResponse] = await Promise.all([
          fetch('/api/sistema'),
          fetch('/api/patologias'),
        ]);

        const systemsData = await systemsResponse.json();
        const pathologiesData = await pathologiesResponse.json();

        console.log('Systems Data:', systemsData);
        console.log('Pathologies Data:', pathologiesData);

        setSystemPathology(Array.isArray(systemsData) ? systemsData : []);
        setPathologies(Array.isArray(pathologiesData.data) ? pathologiesData.data : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div className="flex justify-end">
        <CreatePathologyModal title="Sistema Patologia">
          <Button variant={'default'}>
            <PlusIcon className="size-6" aria-hidden="true" />
            Agregar
          </Button>
        </CreatePathologyModal>
      </div>
      <Accordion type="single" collapsible className="my-5 w-full">
        {systemPathology.map((system, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{system.name}</AccordionTrigger>
            <AccordionContent>
              {pathologies.filter((pathology) => pathology.pathology_system_id === system.id).length > 0 ? (
                pathologies
                  .filter((pathology) => pathology.pathology_system_id === system.id)
                  .map((pathology) => <div key={pathology.id}>{capitalizeFirstLetter(pathology.name)}</div>)
              ) : (
                <div>No hay actualmente patologías disponibles</div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
