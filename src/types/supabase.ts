export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: 'patient' | 'doctor' | 'admin'
          full_name: string
          phone_number: string | null
          date_of_birth: string | null
          specialty: string | null
          license_number: string | null
          education: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role: 'patient' | 'doctor' | 'admin'
          full_name: string
          phone_number?: string | null
          date_of_birth?: string | null
          specialty?: string | null
          license_number?: string | null
          education?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: 'patient' | 'doctor' | 'admin'
          full_name?: string
          phone_number?: string | null
          date_of_birth?: string | null
          specialty?: string | null
          license_number?: string | null
          education?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'patient' | 'doctor' | 'admin'
    }
  }
}