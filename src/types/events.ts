import type { ServiceProviderProfile } from './providers';

export interface Event {
  id: string;
  date: string;
  address: string;
  guest_count: number;
  status: 'pending' | 'matched' | 'confirmed' | 'completed' | 'cancelled';
  additional_details?: string;
  services: Service[];
  matches: ServiceMatch[];
}

export interface Service {
  id: string;
  category: 'chef' | 'bartender' | 'server';
  provider?: ServiceProviderProfile;
  rate?: number;
  status: 'pending' | 'matched' | 'confirmed' | 'completed' | 'cancelled';
}

export interface ServiceMatch {
  id: string;
  provider: ServiceProviderProfile;
  proposed_rate: number;
  status: 'pending' | 'accepted' | 'declined';
}

export interface CreateEventData {
  date: string;
  address: string;
  guest_count: number;
  services: ('chef' | 'bartender' | 'server')[];
  additional_details?: string;
}