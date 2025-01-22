import React, { useState } from 'react';
import { Calendar, Clock, User, CheckCircle, X } from 'lucide-react';

interface AppointmentWizardProps {
  onComplete: (appointmentId: string) => void;
}

interface AppointmentType {
  id: string;
  name: string;
  duration_minutes: number;
  description: string;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
}

interface TimeSlot {
  id: string;
  start_time: string;
  end_time: string;
}

export function AppointmentWizard({ onComplete }: AppointmentWizardProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    appointmentType: '',
    doctorId: '',
    selectedSlot: '',
    notes: ''
  });

  // Mock data for demonstration
  const appointmentTypes: AppointmentType[] = [
    { id: '1', name: 'Regular Checkup', duration_minutes: 30, description: 'Routine health checkup' },
    { id: '2', name: 'Consultation', duration_minutes: 45, description: 'General consultation' },
    { id: '3', name: 'Follow-up', duration_minutes: 20, description: 'Follow-up appointment' }
  ];

  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=500'
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Neurology',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=500'
    }
  ];

  const timeSlots: TimeSlot[] = [
    { id: '1', start_time: '2024-03-20T09:00:00', end_time: '2024-03-20T09:30:00' },
    { id: '2', start_time: '2024-03-20T10:00:00', end_time: '2024-03-20T10:30:00' },
    { id: '3', start_time: '2024-03-20T11:00:00', end_time: '2024-03-20T11:30:00' }
  ];

  const handleConfirmation = async () => {
    // In a real application, this would make an API call to create the appointment
    const mockAppointmentId = 'mock-appointment-123';
    onComplete(mockAppointmentId);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Select Appointment Type</h3>
            {appointmentTypes.map(type => (
              <button
                key={type.id}
                onClick={() => {
                  setFormData(prev => ({ ...prev, appointmentType: type.id }));
                  setStep(2);
                }}
                className="w-full p-4 text-left border rounded-lg hover:border-blue-500 transition-colors"
              >
                <h4 className="font-semibold">{type.name}</h4>
                <p className="text-sm text-gray-600">{type.description}</p>
                <p className="text-sm text-gray-500">Duration: {type.duration_minutes} minutes</p>
              </button>
            ))}
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Choose a Doctor</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {doctors.map(doctor => (
                <button
                  key={doctor.id}
                  onClick={() => {
                    setFormData(prev => ({ ...prev, doctorId: doctor.id }));
                    setStep(3);
                  }}
                  className="p-4 border rounded-lg hover:border-blue-500 transition-colors"
                >
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h4 className="font-semibold">{doctor.name}</h4>
                  <p className="text-sm text-gray-600">{doctor.specialty}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Select Time Slot</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {timeSlots.map(slot => (
                <button
                  key={slot.id}
                  onClick={() => {
                    setFormData(prev => ({ ...prev, selectedSlot: slot.id }));
                    setStep(4);
                  }}
                  className="p-4 border rounded-lg hover:border-blue-500 transition-colors"
                >
                  <Clock className="w-5 h-5 mb-2" />
                  <p className="font-semibold">
                    {new Date(slot.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(slot.start_time).toLocaleDateString()}
                  </p>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Confirm Appointment</h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Appointment Type</p>
                  <p className="font-semibold">
                    {appointmentTypes.find(t => t.id === formData.appointmentType)?.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Doctor</p>
                  <p className="font-semibold">
                    {doctors.find(d => d.id === formData.doctorId)?.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="font-semibold">
                    {timeSlots.find(s => s.id === formData.selectedSlot)?.start_time}
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full p-2 border rounded-lg"
                  rows={3}
                />
              </div>
              <button
                onClick={handleConfirmation}
                className="mt-6 w-full bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors"
              >
                Confirm Appointment
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="text-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Book Appointment</h2>
        <button
          onClick={() => onComplete('')}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex mb-8">
        {[
          { number: 1, title: 'Type', icon: Calendar },
          { number: 2, title: 'Doctor', icon: User },
          { number: 3, title: 'Time', icon: Clock },
          { number: 4, title: 'Confirm', icon: CheckCircle }
        ].map((s, i) => (
          <div
            key={s.number}
            className={`flex-1 ${i !== 0 ? 'border-l' : ''} ${
              step === s.number ? 'text-blue-900' : 'text-gray-400'
            }`}
          >
            <div className="flex items-center justify-center">
              <s.icon className="w-6 h-6" />
              <span className="ml-2">{s.title}</span>
            </div>
          </div>
        ))}
      </div>

      {renderStep()}
    </div>
  );
}