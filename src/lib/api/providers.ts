import { apiClient } from './client';
import type { 
  ServiceProviderProfile, 
  ProviderApplicationData,
  ProviderApplicationResponse,
  ProviderDashboardStats,
  Availability
} from '../../types/providers';
import type { Event } from '../../types/events';

export const providersApi = {
  async becomeProvider(profileData: ProviderApplicationData): Promise<ProviderApplicationResponse> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const { data } = await apiClient.post<ProviderApplicationResponse>('/providers/apply/', profileData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return data;
  },

  async getDashboardStats(): Promise<ProviderDashboardStats> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const { data } = await apiClient.get<ProviderDashboardStats>('/providers/dashboard/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return data;
  },

  async getUpcomingEvents(): Promise<Event[]> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const { data } = await apiClient.get<{ events: Event[] }>('/providers/upcoming-events/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return data.events || [];
  },

  async getEventRequests(): Promise<Event[]> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const { data } = await apiClient.get<{ requests: Event[] }>('/providers/event-requests/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return data.requests || [];
  },

  async acceptEventRequest(eventId: string): Promise<Event> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const { data } = await apiClient.post<Event>(`/providers/events/${eventId}/accept/`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return data;
  },

  async declineEventRequest(eventId: string): Promise<Event> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const { data } = await apiClient.post<Event>(`/providers/events/${eventId}/decline/`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return data;
  },

  async updateAvailability(availability: Availability[]): Promise<Availability[]> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const { data } = await apiClient.put<Availability[]>('/providers/availability/', availability, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return data;
  },

  async getProviderProfile(): Promise<ServiceProviderProfile> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const { data } = await apiClient.get<ServiceProviderProfile>('/providers/me/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return data;
  }
};