import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog';
import { ConsultData } from '../types/consult-data';

interface ViewConsultProps {
  children: React.ReactNode;
  id: string;
}

export const ViewConsult: React.FC<ViewConsultProps> = ({ children, id }) => {
  const [consult, setConsult] = React.useState<ConsultData | null>(null);
  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/consultas?id=${id}`);
      const result = await response.json();
      setConsult(result.data[0]);
    }
    fetchData();
  }, [id]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="h-4/6 max-w-xl">
        <DialogTitle className="text-3xl">Datos de la Consulta</DialogTitle>

        {consult && (
          <div className="mt-[-180px] grid grid-cols-2 gap-3">
            <div>
              <h4 className="text-lg font-semibold text-primary">Posee ALergias</h4>
              <p>{consult.allergic}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-primary">Tipo de Sangre</h4>
              <p>{consult.blood_type}</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-primary">Diagnostico</h4>
              <p>{consult.diagnosis}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-primary">Posee discapacidad</h4>
              <p>{consult.discapacity}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-primary">Toma Alcohol</h4>
              <p>{consult.drink}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-primary">Patologia</h4>
              <p>{consult.pathology}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-primary">Motivo de Consulta</h4>
              <p>{consult.reason_consultation}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-primary">Posee Reposo</h4>
              <p>{consult.recipe_url}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-primary">Fumador</h4>
              <p>{consult.smoke}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-primary">Temperatura corporal</h4>
              <p>{consult.temperature} °C</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
