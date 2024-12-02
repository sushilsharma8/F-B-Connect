import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { StatsOverview } from '../components/dashboard/StatsOverview';
import { EventRequestList } from '../components/dashboard/EventRequestList';
import { UpcomingEvents } from '../components/dashboard/UpcomingEvents';
import { providersApi } from '../lib/api/providers';

export const ProviderDashboard: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: stats, isLoading: isStatsLoading } = useQuery({
    queryKey: ['providerStats'],
    queryFn: providersApi.getDashboardStats,
  });

  const { data: upcomingEvents = [], isLoading: isEventsLoading } = useQuery({
    queryKey: ['upcomingEvents'],
    queryFn: providersApi.getUpcomingEvents,
    initialData: [],
  });

  const { data: eventRequests = [], isLoading: isRequestsLoading } = useQuery({
    queryKey: ['eventRequests'],
    queryFn: providersApi.getEventRequests,
    initialData: [],
  });

  const acceptRequestMutation = useMutation({
    mutationFn: (eventId: string) => providersApi.acceptEventRequest(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eventRequests'] });
      queryClient.invalidateQueries({ queryKey: ['upcomingEvents'] });
    },
  });

  const declineRequestMutation = useMutation({
    mutationFn: (eventId: string) => providersApi.declineEventRequest(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eventRequests'] });
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Provider Dashboard</h1>
        <p className="text-gray-400">Manage your events and track your performance</p>
      </div>

      <StatsOverview stats={stats} isLoading={isStatsLoading} />
      
      <div className="grid gap-6 md:grid-cols-2 mt-8">
        <EventRequestList
          requests={eventRequests}
          onAccept={(id) => acceptRequestMutation.mutate(id)}
          onDecline={(id) => declineRequestMutation.mutate(id)}
          isLoading={isRequestsLoading}
        />
        <UpcomingEvents 
          events={upcomingEvents}
          isLoading={isEventsLoading}
        />
      </div>
    </div>
  );
};