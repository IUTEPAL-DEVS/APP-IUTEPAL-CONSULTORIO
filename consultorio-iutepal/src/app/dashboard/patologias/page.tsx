'use client';
import { CreatePathologyModal } from '@/src/components/create-pathology-modal';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/src/components/ui/accordion';
import { Button } from '@/src/components/ui/button';
import { PathologySystem } from '@/src/types/system-pathology';
import { PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Page() {
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
        {systemPathology.map((pathology, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{pathology.name}</AccordionTrigger>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
