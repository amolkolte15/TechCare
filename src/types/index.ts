export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  availability: {
    [key: string]: string[]; // date -> available times
  };
}

export interface Stats {
  appointmentsBooked: number;
  doctorsAvailable: number;
  patientsServed: number;
  satisfactionRate: number;
}

export type UserRole = 'patient' | 'doctor' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  mfaEnabled: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}