type User = {
  id?: string
  name?: string
  email?: string
  active: boolean
  roles: string[]
}

type AppointmentRequest = {
    id: string;
    reason: string;
    f_estimada_finalizacion?: string | null;
    state: string;
    prescriptions: string[];
    f_realizacion?: string | null;
    f_finalizacion?: string | null;
    f_solicitada?: string;
}

type Prescription = {
    id: string;
    dosis: string;
    finalDate: string;
    medicine: string;
    medicalAppointment: MedicalAppointment;
}

type MedicalAppointment = {
    id: string;
    reason: string;
    F_realizacion: string;
    F_finalizacion: string;
    F_solicitada: string;
    f_estimada_finalizacion: string;
    state: string;
    prescriptions: Prescription[];
    attend: Attends;
}

type Attends = {
    id: string;
    user: User;
    medics: User[];
    specialization: Specialization;
    medicalAppointments: MedicalAppointment;
}

type Specialization = {
    id: string;
    code: string;
    name: string;
    attends: Attends[];
}
