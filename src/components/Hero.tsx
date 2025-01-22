import React, { useState } from 'react';
import { Calendar, Clock, Users } from 'lucide-react';
import { AppointmentWizard } from './booking/AppointmentWizard';

export function Hero() {
  const [showBooking, setShowBooking] = useState(false);

  const handleBookingComplete = (appointmentId: string) => {
    setShowBooking(false);
    // You could add a success message or redirect here
  };

  return (
    <div className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Healthcare Made Simple
          </h1>
          <p className="mt-6 text-xl md:text-2xl max-w-2xl mx-auto">
            Book appointments with top healthcare professionals in minutes using our AI-driven scheduling system.
          </p>
          <div className="mt-10">
            <button 
              onClick={() => setShowBooking(true)}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors"
            >
              Book Appointment
            </button>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Calendar,
              title: "Easy Scheduling",
              description: "Book appointments 24/7 with our intuitive platform"
            },
            {
              icon: Clock,
              title: "Real-time Availability",
              description: "See doctor availability instantly and choose your preferred time"
            },
            {
              icon: Users,
              title: "Top Specialists",
              description: "Access to a network of qualified healthcare professionals"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-blue-800 bg-opacity-50 p-6 rounded-xl">
              <feature.icon className="w-12 h-12 mb-4 text-green-400" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-blue-100">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {showBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <AppointmentWizard onComplete={handleBookingComplete} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}