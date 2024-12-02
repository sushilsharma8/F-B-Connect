import { apiClient } from './client';
import type { Event, CreateEventData, ServiceMatch } from '../../types';

export const eventsApi = {
  async createEvent(eventData: CreateEventData): Promise<Event> {
    const { data } = await apiClient.post<Event>('/events/', eventData);
    return data;
  },

  async getEvent(id: string): Promise<Event> {
    const { data } = await apiClient.get<Event>(`/events/${id}/`);
    return data;
  },

  async getUserEvents(): Promise<Event[]> {
    const { data } = await apiClient.get<Event[]>('/events/');
    return data;
  },

  async getEventMatches(eventId: string): Promise<ServiceMatch[]> {
    const { data } = await apiClient.get<ServiceMatch[]>(`/events/${eventId}/matches/`);
    return data;
  },

  async acceptMatch(eventId: string, matchId: string): Promise<ServiceMatch> {
    const { data } = await apiClient.post<ServiceMatch>(
      `/events/${eventId}/matches/${matchId}/accept/`
    );
    return data;
  },

  async declineMatch(eventId: string, matchId: string): Promise<ServiceMatch> {
    const { data } = await apiClient.post<ServiceMatch>(
      `/events/${eventId}/matches/${matchId}/decline/`
    );
    return data;
  }
};