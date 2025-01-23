import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Mail, Lock, User, Phone, Calendar, GraduationCap, Stethoscope, Loader } from 'lucide-react';
import type { UserRole } from '../../types';
//import { supabase } from '../../lib/supabase';

const baseSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  role: z.enum(['patient', 'doctor', 'admin'] as const),
  fullName: z.string().min(2, 'Full name is required'),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  dateOfBirth: z.string().refine((date) => {
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
    return new Date(date) <= eighteenYearsAgo;
  }, 'Must be at least 18 years old'),
});

const doctorSchema = baseSchema.extend({
  specialty: z.string().min(2, 'Specialty is required'),
  licenseNumber: z.string().min(2, 'License number is required'),
  education: z.string().min(2, 'Education details are required'),
});

type SignUpFormData = z.infer<typeof doctorSchema>;

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const [role, setRole] = useState<UserRole>('patient');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(role === 'doctor' ? doctorSchema : baseSchema),
    defaultValues: {
      role: 'patient',
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (authError) throw authError;

      // 2. Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData.user?.id,
            role: data.role,
            full_name: data.fullName,
            phone_number: data.phoneNumber,
            date_of_birth: data.dateOfBirth,
            ...(data.role === 'doctor' && {
              specialty: data.specialty,
              license_number: data.licenseNumber,
              education: data.education,
            }),
          },
        ]);

      if (profileError) throw profileError;

      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during sign up');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-8">Create Account</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sign up as
            </label>
            <select
              {...register('role')}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                {...register('email')}
                type="email"
                className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                {...register('password')}
                type="password"
                className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Create a password"
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                {...register('fullName')}
                type="text"
                className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                {...register('phoneNumber')}
                type="tel"
                className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your phone number"
              />
            </div>
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                {...register('dateOfBirth')}
                type="date"
                className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {errors.dateOfBirth && (
              <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>
            )}
          </div>

          {role === 'doctor' && (
            <>
              <div>
                <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">
                  Specialty
                </label>
                <div className="relative">
                  <Stethoscope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    {...register('specialty')}
                    type="text"
                    className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your medical specialty"
                  />
                </div>
                {errors.specialty && (
                  <p className="mt-1 text-sm text-red-600">{errors.specialty.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  License Number
                </label>
                <div className="relative">
                  <input
                    {...register('licenseNumber')}
                    type="text"
                    className="pl-4 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your medical license number"
                  />
                </div>
                {errors.licenseNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.licenseNumber.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
                  Education
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <textarea
                    {...register('education')}
                    className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your educational background"
                    rows={3}
                  />
                </div>
                {errors.education && (
                  <p className="mt-1 text-sm text-red-600">{errors.education.message}</p>
                )}
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader className="w-5 h-5 mr-2 animate-spin" />
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={onClose}
              className="text-blue-900 hover:text-blue-800"
            >
              Sign in
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}