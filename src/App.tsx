import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { StatsSection } from './components/Stats';
import { DoctorCard } from './components/DoctorCard';
import { SignInModal } from './components/auth/SignInModal';
import { Activity, UserCog, Users } from 'lucide-react';
import type { UserRole } from './types';

const featuredDoctors = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=500',
    availability: {}
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Neurology',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=500',
    availability: {}
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrics',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=500',
    availability: {}
  }
];

function App() {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const handleDoctorSelect = (doctorId: string) => {
    console.log('Selected doctor:', doctorId);
    // TODO: Implement appointment booking flow
  };

  const handleSignIn = async (email: string, password: string, role: UserRole) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // TODO: Implement actual authentication
    console.log('Sign in attempt:', { email, password, role });
    
    // For demo purposes, throw an error if email doesn't contain '@'
    if (!email.includes('@')) {
      throw new Error('Please enter a valid email address');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Activity className="w-8 h-8 text-blue-900" />
              <span className="ml-2 text-xl font-semibold text-blue-900">TechCare</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Services</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Doctors</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
            </div>
            <div>
              <button 
                onClick={() => setIsSignInModalOpen(true)}
                className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <StatsSection />

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Specialists</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredDoctors.map(doctor => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onSelect={handleDoctorSelect}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Who We Serve</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: "Patients",
                  description: "Easy access to quality healthcare with convenient online scheduling"
                },
                {
                  icon: UserCog,
                  title: "Healthcare Providers",
                  description: "Streamlined practice management and patient coordination"
                },
                {
                  icon: Activity,
                  title: "Medical Facilities",
                  description: "Efficient resource allocation and improved patient care"
                }
              ].map((item, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-sm">
                  <item.icon className="w-12 h-12 text-blue-900 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About TechCare</h3>
              <p className="text-blue-100">Revolutionizing healthcare access through technology</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-100 hover:text-white">Find a Doctor</a></li>
                <li><a href="#" className="text-blue-100 hover:text-white">Book Appointment</a></li>
                <li><a href="#" className="text-blue-100 hover:text-white">Our Services</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-blue-100">support@techcare.com</li>
                <li className="text-blue-100">+91 73978896738</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-100 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-blue-100 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-blue-100 hover:text-white">HIPAA Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-blue-800 text-center text-blue-100">
            <p>&copy; {new Date().getFullYear()} TechCare. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
        onSignIn={handleSignIn}
      />
    </div>
  );
}

export default App;