import React from 'react';
import type { Stats } from '../types';

const stats: Stats = {
  appointmentsBooked: 50000,
  doctorsAvailable: 200,
  patientsServed: 25000,
  satisfactionRate: 98
};

export function StatsSection() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-900">
              {stats.appointmentsBooked.toLocaleString()}+
            </div>
            <div className="mt-2 text-sm text-gray-600">Appointments Booked</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-900">
              {stats.doctorsAvailable}+
            </div>
            <div className="mt-2 text-sm text-gray-600">Healthcare Providers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-900">
              {stats.patientsServed.toLocaleString()}+
            </div>
            <div className="mt-2 text-sm text-gray-600">Patients Served</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-900">
              {stats.satisfactionRate}%
            </div>
            <div className="mt-2 text-sm text-gray-600">Patient Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
}