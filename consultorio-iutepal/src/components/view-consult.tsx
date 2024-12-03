import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog';
import { ConsultData } from '../types/consult-data';
import { formatDateConsult } from '../lib/utils';

interface ViewConsultProps {
  children: React.ReactNode;
  id: string;
}

export const ViewConsult: React.FC<ViewConsultProps> = ({ children, id }) => {
  const [consult, setConsult] = React.useState<ConsultData | null>(null);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/consultas?id=${id}`);
        const result = await response.json();
        if (result.data && result.data.length > 0) {
          setConsult(result.data[0]);
        } else {
          console.error('No data found for the given ID');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [id]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="h-5/6 max-w-xl">
        <DialogTitle className="text-3xl">Datos de la Consulta</DialogTitle>

        {consult && (
          <div className="mt-[-180px] grid grid-cols-2 gap-3">
            <div>
              <div className="font-bold">Fecha de Consulta</div>
              <div>{formatDateConsult(consult.created_at)}</div>
            </div>
            <div>
              <div className="font-bold">Motivo de Consulta</div>
              <div>{consult.reason_consultation}</div>
            </div>
            <div>
              <div className="font-bold">Diagnostico</div>
              <div>{consult.diagnosis}</div>
            </div>
            <div>
              <div className="font-bold">Peso</div>
              <div>{consult.weight}</div>
            </div>
            <div>
              <div className="font-bold">Altura</div>
              <div>{consult.height}</div>
            </div>
            <div>
              <div className="font-bold">Tipo de Sangre</div>
              <div>{consult.blood_type}</div>
            </div>
            <div>
              <div className="font-bold">Temperatura</div>
              <div>{consult.temperature}</div>
            </div>
            <div>
              <div className="font-bold">Patologia</div>
              <div>{consult.pathology.name}</div>
            </div>
            <div>
              <div className="font-bold">Historial Medico</div>
              <div>{consult.medical_history ? 'Si' : 'No'}</div>
            </div>
            <div>
              <div className="font-bold">Fuma</div>
              <div>{consult.smoke ? 'Si' : 'No'}</div>
            </div>
            <div>
              <div className="font-bold">Bebe</div>
              <div>{consult.drink ? 'Si' : 'No'}</div>
            </div>
            <div>
              <div className="font-bold">Alergico</div>
              <div>{consult.allergic ? 'Si' : 'No'}</div>
            </div>
            <div>
              <div className="font-bold">Discapacidad</div>
              <div>{consult.discapacity ? 'Si' : 'No'}</div>
            </div>
            <div>
              <div className="font-bold">Reposo</div>
              <div>{consult.recipe_url ? 'Si posee' : 'No posee'}</div>
            </div>
            <div>
              <div className="font-bold">Actualizado</div>
              <div>{formatDateConsult(consult.updated_at)}</div>
            </div>
            <div>
              <div className="font-bold">Sistema Patologico</div>
              <div>{consult.pathology_system_id ? consult.pathology_system_id.name : 'N/A'}</div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
