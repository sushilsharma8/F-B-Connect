import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi, AuthError } from '../lib/api/auth';
import type { User, LoginData, RegisterData } from '../types';

interface AuthContextType {
  user: User | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Initialize auth state from localStorage
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    }
  }, [queryClient]);

  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ['user'],
    queryFn: authApi.getCurrentUser,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!localStorage.getItem('access_token'),
  });

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      setError(null);
    },
    onError: (err: AuthError) => {
      setError(err.message);
      console.error('Login Error:', {
        message: err.message,
        errors: err.errors,
        status: err.status,
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      setError(null);
    },
    onError: (err: AuthError) => {
      setError(err.message);
      console.error('Registration Error:', {
        message: err.message,
        errors: err.errors,
        status: err.status,
      });
    },
  });

  const login = useCallback(async (data: LoginData) => {
    await loginMutation.mutateAsync(data);
  }, [loginMutation]);

  const register = useCallback(async (data: RegisterData) => {
    await registerMutation.mutateAsync(data);
  }, [registerMutation]);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
      queryClient.setQueryData(['user'], null);
      queryClient.clear();
    } catch (err) {
      console.error('Logout Error:', err);
    }
  }, [queryClient]);

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        login,
        register,
        logout,
        isLoading: isUserLoading || loginMutation.isPending || registerMutation.isPending,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};