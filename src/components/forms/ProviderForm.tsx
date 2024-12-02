import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/Button';
import { FormField } from '../auth/FormField';
import { useMutation } from '@tanstack/react-query';
import { providersApi } from '../../lib/api/providers';
import { useNavigate } from 'react-router-dom';
import { providerApplicationSchema } from '../../validations/provider';
import type { ProviderApplicationData } from '../../types/providers';
import { useAuth } from '../../contexts/AuthContext';

interface ProviderFormProps {
  serviceType: 'chef' | 'bartender' | 'server';
}

export const ProviderForm: React.FC<ProviderFormProps> = ({ serviceType }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<ProviderApplicationData>({
    resolver: zodResolver(providerApplicationSchema),
    defaultValues: {
      service_type: serviceType,
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      experience: ''
    }
  });

  const mutation = useMutation({
    mutationFn: (data: ProviderApplicationData) => providersApi.becomeProvider(data),
    onSuccess: () => {
      navigate('/provider/dashboard');
    },
    onError: (error: any) => {
      console.error('Provider application error:', error);
      if (error.message === 'Authentication required') {
        navigate('/auth/login');
      }
    }
  });

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
      {mutation.error && (
        <div className="p-3 text-sm text-red-500 bg-red-900/20 rounded-md border border-red-900/50">
          {(mutation.error as Error).message}
        </div>
      )}

      <FormField
        label="Full Name"
        type="text"
        {...register('name')}
        error={errors.name?.message}
        placeholder="Enter your full name"
      />

      <FormField
        label="Email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
        placeholder="Enter your email address"
      />

      <FormField
        label="Phone Number"
        type="tel"
        {...register('phone')}
        error={errors.phone?.message}
        placeholder="Enter your phone number"
      />

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">
          Professional Experience
        </label>
        <textarea
          {...register('experience')}
          className="mt-1 block w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-gray-400 focus:border-[#CCFF00] focus:outline-none focus:ring-1 focus:ring-[#CCFF00]"
          rows={4}
          placeholder="Tell us about your experience, certifications, and notable achievements..."
        />
        {errors.experience && (
          <p className="mt-1 text-sm text-red-500">{errors.experience.message}</p>
        )}
      </div>

      <Button 
        type="submit" 
        variant="neon" 
        className="w-full"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? 'Submitting...' : 'Submit Application'}
      </Button>
    </form>
  );
};