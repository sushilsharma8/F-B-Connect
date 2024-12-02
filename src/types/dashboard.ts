export interface DashboardStats {
  totalBookings: number;
  completedEvents: number;
  upcomingEvents: number;
  averageRating: number;
  totalEarnings: number;
}

export interface EventRequest {
  id: string;
  eventDate: Date;
  location: string;
  guestCount: number;
  status: 'pending' | 'accepted' | 'declined';
  rate: number;
}