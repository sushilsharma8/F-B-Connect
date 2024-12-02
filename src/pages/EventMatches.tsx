import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MatchList } from '../components/matching/MatchList';
import { eventsApi } from '../lib/api/events';

export const EventMatches: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const queryClient = useQueryClient();

  const { data: event } = useQuery({
    queryKey: ['event', eventId],
    queryFn: () => eventsApi.getEvent(eventId!),
    enabled: !!eventId,
  });

  const { data: matches, isLoading } = useQuery({
    queryKey: ['eventMatches', eventId],
    queryFn: () => eventsApi.getEventMatches(eventId!),
    enabled: !!eventId,
  });

  const acceptMatchMutation = useMutation({
    mutationFn: (providerId: string) => 
      eventsApi.acceptMatch(eventId!, providerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eventMatches', eventId] });
    },
  });

  const declineMatchMutation = useMutation({
    mutationFn: (providerId: string) => 
      eventsApi.declineMatch(eventId!, providerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eventMatches', eventId] });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Matched Service Providers</h1>
        {event && (
          <p className="text-gray-600">
            Here are the best matches for your event on {new Date(event.date).toLocaleDateString()}
          </p>
        )}
      </div>

      <MatchList
        matches={matches || []}
        onAcceptMatch={(providerId) => acceptMatchMutation.mutate(providerId)}
        onDeclineMatch={(providerId) => declineMatchMutation.mutate(providerId)}
      />
    </div>
  );
}