export interface ServiceProviderProfile {
  id: string;
  service_type: 'chef' | 'bartender' | 'server';
  experience: string;
  phone: string;
  rating?: number;
  is_available: boolean;
  availability?: Availability[];
}

export interface Availability {
  day_of_week: number;
  start_time: string;
  end_time: string;
}

export interface ProviderDashboardStats {
  total_bookings: number;
  completed_events: number;
  upcoming_events: number;
  average_rating: number;
  total_earnings: number;
}

export interface ProviderApplicationData {
  service_type: 'chef' | 'bartender' | 'server';
  name: string;
  email: string;
  phone: string;
  experience: string;
}

export interface ProviderApplicationResponse {
  id: string;
  service_type: 'chef' | 'bartender' | 'server';
  name: string;
  email: string;
  phone: string;
  experience: string;
  created_at: string;
}