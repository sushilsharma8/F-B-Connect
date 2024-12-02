import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { loginSchema, type LoginData } from '../../types/auth';
import { FormField } from './FormField';

export const LoginForm: React.FC = () => {
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: LoginData) => {
    try {
      await login({
        email: data.email,
        password: data.password
      });
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
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
        label="Email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
        placeholder="Enter your email"
        autoComplete="email"
      />

      <FormField
        label="Password"
        type="password"
        {...register('password')}
        error={errors.password?.message}
        placeholder="Enter your password"
        autoComplete="current-password"
      />

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <Link to="/auth/register" className="text-[#CCFF00] hover:text-[#B8E600]">
            Don't have an account? Sign up
          </Link>
        </div>
        <div className="text-sm">
          <a href="#" className="text-[#CCFF00] hover:text-[#B8E600]">
            Forgot password?
          </a>
        </div>
      </div>

      <Button 
        type="submit" 
        variant="neon" 
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  );
};