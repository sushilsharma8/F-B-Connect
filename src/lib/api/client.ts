import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import config from '../../config';

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status?: number;
}

const apiClient = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 15000,
  withCredentials: true, // Enable credentials
});

// Request interceptor for auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('access_token');
    
    // Always include token if it exists, except for auth endpoints
    if (token && !config.url?.includes('/auth/login') && !config.url?.includes('/auth/registration')) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.debug) {
      const logData = {
        method: config.method?.toUpperCase(),
        url: config.url,
        headers: { ...config.headers },
        data: config.data ? { ...config.data } : undefined
      };

      if (logData.data?.password) logData.data.password = '[FILTERED]';
      console.log('🌐 API Request:', logData);
    }

    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and token refresh
apiClient.interceptors.response.use(
  (response) => {
    if (config.debug) {
      const logData = {
        status: response.status,
        headers: response.headers,
        data: { ...response.data }
      };

      if (logData.data?.access) logData.data.access = '[FILTERED]';
      if (logData.data?.refresh) logData.data.refresh = '[FILTERED]';

      console.log('✅ API Response:', logData);
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;
    
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken) {
        try {
          const response = await apiClient.post('/auth/token/refresh/', {
            refresh: refreshToken
          });

          const { access } = response.data;
          localStorage.setItem('access_token', access);
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${access}`;

          // Retry the original request with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${access}`;
          }
          return apiClient(originalRequest);
        } catch (refreshError) {
          // If refresh fails, clear tokens and redirect to login
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          delete apiClient.defaults.headers.common['Authorization'];
          window.location.href = '/auth/login';
          return Promise.reject(refreshError);
        }
      }
    }

    const apiError: ApiError = {
      message: 'An unexpected error occurred',
      status: error.response?.status,
      errors: {},
    };

    if (error.response?.data) {
      const data = error.response.data as any;
      apiError.message = data.detail || data.message || data.non_field_errors?.[0] || 'An error occurred';
      apiError.errors = data.errors;
    } else if (error.request) {
      apiError.message = 'Unable to connect to the server. Please try again later.';
    }

    return Promise.reject(apiError);
  }
);

export { apiClient };