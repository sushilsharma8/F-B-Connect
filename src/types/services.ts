export interface Service {
  id: string;
  name: string;
  description: string;
  category: 'chef' | 'bartender' | 'server';
}

export interface ServiceProviderProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: 'chef' | 'bartender' | 'server';
  experience: string;
  rating?: number;
  availability?: {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
  }[];
}