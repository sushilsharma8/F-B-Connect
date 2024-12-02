import React from 'react';
import { format } from 'date-fns';
import { MapPin, Users, Clock } from 'lucide-react';
import type { Event } from '../../types';

interface UpcomingEventsProps {
  events: Event[];
  isLoading?: boolean;
}

export const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white/5 backdrop-blur-lg rounded-lg ring-1 ring-white/10">
        <div className="p-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white">Upcoming Events</h2>
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

  if (events.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-lg rounded-lg ring-1 ring-white/10 p-8 text-center">
        <p className="text-gray-400">No upcoming events</p>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-lg ring-1 ring-white/10">
      <div className="p-4 border-b border-white/10">
        <h2 className="text-lg font-semibold text-white">Upcoming Events</h2>
      </div>
      <div className="divide-y divide-white/10">
        {events.map((event) => (
          <div key={event.id} className="p-4">
            <div className="mb-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <p className="font-medium text-white">
                  {format(new Date(event.date), 'MMM d, yyyy')}
                </p>
              </div>
            </div>
            <div className="space-y-1 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {event.address}
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                {event.guest_count} guests
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};