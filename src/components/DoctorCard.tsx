import React from 'react';
import type { Doctor } from '../types';
import { Calendar } from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
  onSelect: (doctorId: string) => void;
}

export function DoctorCard({ doctor, onSelect }: DoctorCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={doctor.image}
        alt={doctor.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
        <p className="text-gray-600">{doctor.specialty}</p>
        <button
          onClick={() => onSelect(doctor.id)}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors"
        >
          <Calendar className="w-5 h-5" />
          Schedule Appointment
        </button>
      </div>
    </div>
  );
}