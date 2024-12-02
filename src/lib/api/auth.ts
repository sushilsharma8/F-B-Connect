import { apiClient } from './client';
import type { User, LoginData, RegisterData } from '../../types';
import config from '../../config';

interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

export class AuthError extends Error {
  constructor(
    message: string,
    public readonly errors?: Record<string, string[]>,
    public readonly status?: number
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

export const authApi = {
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login/', {
        email: data.email,
        password: data.password,
      });
      
      // Store tokens
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      
      // Set the Authorization header for subsequent requests
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
      
      return response.data;
    } catch (error: any) {
      console.error('Login API Error:', error);
      
      throw new AuthError(
        error.response?.data?.detail || error.message || 'Login failed',
        error.response?.data?.errors || error.errors,
        error.response?.status || error.status
      );
    }
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      if (config.debug) {
        console.log('Sending registration request:', {
          ...data,
          password1: '[FILTERED]',
          password2: '[FILTERED]'
        });
      }

      const response = await apiClient.post<AuthResponse>('/auth/registration/', {
        email: data.email,
        name: data.name,
        password1: data.password1,
        password2: data.password2,
        role: data.role === 'seller' ? 'provider' : 'client',
      });
      
      if (config.debug) {
        console.log('Registration response:', {
          status: response.status,
          data: { ...response.data, tokens: '[FILTERED]' }
        });
      }

      // Store tokens
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      
      // Set the Authorization header for subsequent requests
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
      
      return response.data;
    } catch (error: any) {
      console.error('Registration API Error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      
      throw new AuthError(
        error.response?.data?.detail || error.message || 'Registration failed',
        error.response?.data?.errors || error.errors,
        error.response?.status || error.status
      );
    }
  },

  async getCurrentUser(): Promise<User> {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No access token found');
      }

      const response = await apiClient.get<User>('/auth/user/');
      return response.data;
    } catch (error: any) {
      console.error('Get Current User Error:', error);
      throw new AuthError(
        error.message || 'Failed to fetch user profile',
        error.errors,
        error.status
      );
    }
  },

  async logout(): Promise<void> {
    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        await apiClient.post('/auth/logout/', null, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (error: any) {
      console.error('Logout Error:', error);
    } finally {
      // Clear tokens and headers
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      delete apiClient.defaults.headers.common['Authorization'];
    }
  },

  async refreshToken(): Promise<{ access: string }> {
    try {
      const refresh_token = localStorage.getItem('refresh_token');
      if (!refresh_token) {
        throw new Error('No refresh token found');
      }
      
      const response = await apiClient.post<{ access: string }>('/auth/token/refresh/', {
        refresh: refresh_token
      });
      
      // Store new access token
      localStorage.setItem('access_token', response.data.access);
      
      // Update Authorization header with new token
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
      
      return response.data;
    } catch (error: any) {
      console.error('Token Refresh Error:', error);
      throw new AuthError(
        error.message || 'Failed to refresh token',
        error.errors,
        error.status
      );
    }
  },
};