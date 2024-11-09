import React from "react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Patients } from "../types/patient"

interface ViewPatientsProps {
    children: React.ReactNode
    id: string
}

export const ViewPatients: React.FC<ViewPatientsProps> = ({ children, id }) => {
    const [patient, setPatient] = React.useState<Patients | null>(null);

    React.useEffect(() => {
        async function fetchData() {
            const response = await fetch(`/api/pacientes?id=${id}`);
            const result = await response.json();
            setPatient(result.data[0]);
        }
        fetchData();
    }, [id]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="max-w-6xl h-4/6">
                <DialogHeader className="pb-0">
                    <DialogTitle className="text-3xl">Datos del paciente</DialogTitle>
                </DialogHeader>

                {patient && (
                    <div className="grid grid-cols-4 gap-3 mt--5">
                        <div>
                            <h4 className="font-semibold text-lg text-primary">Cedula</h4>
                            <p>{patient.id}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg text-primary">Nombre Completo</h4>
                            <p>{patient.firts_name} {patient.second_name} {patient.last_name} {patient.second_last_name}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg text-primary">Sexo</h4>
                            <p>{patient.sex ? "Masculino" : "Femenino"}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg text-primary">Correo Electrónico</h4>
                            <p>{patient.email}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg text-primary">Teléfono</h4>
                            <p>{patient.phone}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg text-primary">Dirección</h4>
                            <p>{patient.direction}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg text-primary">Fecha de Nacimiento</h4>
                            <p>{patient.dob}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg text-primary">Edad</h4>
                            <p>{patient.age}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg text-primary">Altura</h4>
                            <p>{patient.height} m</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg text-primary">Peso</h4>
                            <p>{patient.weight} Kg</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg text-primary">Tipo de Sangre</h4>
                            <p>{patient.blood_type}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg text-primary">Temperatura</h4>
                            <p>{patient.temperature} C</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg text-primary">Patología</h4>
                            <p>{patient.pathology}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg text-primary">Motivo de Consulta</h4>
                            <p>{patient.query_reason}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg text-primary">Diagnóstico</h4>
                            <p>{patient.diagnosis}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg text-primary">Antecedentes Clínicos</h4>
                            <p>{patient.clinical_history ? "Sí" : "No"}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg text-primary">Fuma</h4>
                            <p>{patient.smoke ? "Sí" : "No"}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg text-primary">Bebe</h4>
                            <p>{patient.drink ? "Sí" : "No"}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg text-primary">Es Alérgico</h4>
                            <p>{patient.allergic ? "Sí" : "No"}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg text-primary">Discapacidad</h4>
                            <p>{patient.disability ? "Sí" : "No"}</p>
                        </div>
                    </div>
                )}

            </DialogContent>
        </Dialog>
    )
}