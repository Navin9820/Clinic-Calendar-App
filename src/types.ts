export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  notes?: string;
}

export interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  color: string;
}

export interface User {
  email: string;
  name: string;
}