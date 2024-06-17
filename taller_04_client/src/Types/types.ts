type User = {
  id?: string
  name?: string
  email?: string
  active: boolean
  roles: Role[]
}

type AppointmentRequest = {
    id: string;
    reason: string;
    f_estimada_finalizacion?: string | null;
    state: string;
    prescriptions: Prescription[];
    f_realizacion?: string | null;
    f_finalizacion?: string | null;
    f_solicitada?: string;
    attend: Attends;
}

type DoctorSchedule = {
    medics: User[];
    medicalHistories: MedicalHistory[];
}

type MedicalHistory = {
    id: string;
    date: Date;
    reason: string;
    user: User;
}

type Prescription = {
    id?: string;
    dosis: string;
    finalDate: Date;
    medicine: string;
}

type Role = {
    code: string;
    name: string;
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
