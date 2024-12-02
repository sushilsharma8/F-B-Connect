import React from 'react';
import { format } from 'date-fns';
import { MapPin, Users } from 'lucide-react';
import { Button } from '../ui/Button';
import type { Event } from '../../types';

interface EventRequestListProps {
  requests: Event[];
  onAccept: (eventId: string) => void;
  onDecline: (eventId: string) => void;
  isLoading?: boolean;
}

export const EventRequestList: React.FC<EventRequestListProps> = ({
  requests,
  onAccept,
  onDecline,
  isLoading
}) => {
  if (isLoading) {
    return (
      <div className="bg-white/5 backdrop-blur-lg rounded-lg ring-1 ring-white/10">
        <div className="p-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white">Event Requests</h2>
        </div>
        <div className="divide-y divide-white/10">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-4 animate-pulse">
              <div className="h-4 bg-white/10 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-white/10 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-white/10 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-lg rounded-lg ring-1 ring-white/10 p-8 text-center">
        <p className="text-gray-400">No pending event requests</p>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-lg ring-1 ring-white/10">
      <div className="p-4 border-b border-white/10">
        <h2 className="text-lg font-semibold text-white">Event Requests</h2>
      </div>
      <div className="divide-y divide-white/10">
        {requests.map((request) => (
          <div key={request.id} className="p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-medium text-white">
                  {format(new Date(request.date), 'MMM d, yyyy')}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                  <MapPin className="w-4 h-4" />
                  {request.address}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                  <Users className="w-4 h-4" />
                  {request.guest_count} guests
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="neon"
                size="sm"
                className="flex-1"
                onClick={() => onAccept(request.id)}
              >
                Accept
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="flex-1"
                onClick={() => onDecline(request.id)}
              >
                Decline
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};