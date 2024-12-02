import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { registerSchema, type RegisterData } from '../../types/auth';
import { FormField } from './FormField';
import { RoleSelector } from './RoleSelector';

export const RegisterForm: React.FC = () => {
  const { register: registerUser, isLoading, error } = useAuth();
  const navigate = useNavigate();
  
  const { register, handleSubmit, control, formState: { errors } } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'buyer'
    }
  });

  const onSubmit = async (data: RegisterData) => {
    try {
      console.log('Submitting registration data:', data);
      await registerUser(data);
      navigate('/');
    } catch (err) {
      console.error('Registration submission error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-900/20 rounded-md border border-red-900/50">
          {error}
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
        placeholder="Enter your email"
      />

      <FormField
        label="Password"
        type="password"
        {...register('password1')}
        error={errors.password1?.message}
        placeholder="Create a strong password"
      />

      <FormField
        label="Confirm Password"
        type="password"
        {...register('password2')}
        error={errors.password2?.message}
        placeholder="Confirm your password"
      />

      <RoleSelector
        control={control}
        error={errors.role?.message}
      />

      <div className="text-sm">
        <Link to="/auth/login" className="text-[#CCFF00] hover:text-[#B8E600]">
          Already have an account? Sign in
        </Link>
      </div>

      <Button
        type="submit"
        variant="neon"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Creating account...' : 'Create account'}
      </Button>
    </form>
  );
};