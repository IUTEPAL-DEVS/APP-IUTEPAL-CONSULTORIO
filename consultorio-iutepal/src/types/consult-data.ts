export interface ConsultData {
  id: string;
  patient_id: string;
  created_at: string;
  height: number;
  weight: number;
  blood_type: string;
  temperature: number;
  pathology: {
    name: string;
  };
  reason_consultation: string;
  diagnosis: string;
  medical_history: boolean;
  smoke: boolean;
  drink: boolean;
  allergic: boolean;
  discapacity: boolean;
  recipe_url: string;
  updated_at: string;
  pathology_system_id: {
    name: string;
  };
}
