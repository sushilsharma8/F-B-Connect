import React from 'react';
import { Star, Clock, Award, MapPin, Users } from 'lucide-react';
import { Button } from '../ui/Button';
import type { ServiceProviderProfile } from '../../types';

interface MatchCardProps {
  provider: ServiceProviderProfile;
  onAccept: (providerId: string) => void;
  onDecline: (providerId: string) => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({
  provider,
  onAccept,
  onDecline
}) => {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 ring-1 ring-white/10 hover:ring-[#CCFF00]/20 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-white capitalize mb-2">{provider.serviceType}</h3>
          {provider.rating && (
            <div className="flex items-center text-[#CCFF00]">
              <Star className="w-4 h-4 fill-current" />
              <span className="ml-1 text-sm font-medium">{provider.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2 bg-[#CCFF00]/10 px-3 py-1 rounded-full">
          <Clock className="w-4 h-4 text-[#CCFF00]" />
          <span className="text-sm font-medium text-[#CCFF00]">{provider.isAvailable ? 'Available' : 'Unavailable'}</span>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-2">Experience</h4>
          <p className="text-sm text-gray-400 line-clamp-3">
            {provider.experience}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">{provider.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">All Events</span>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-400">Phone: {provider.phone}</p>
          {provider.drivingLicense && (
            <p className="text-sm text-gray-400">Driving License: {provider.drivingLicense}</p>
          )}
          <p className="text-sm text-gray-400">Created At: {provider.createdAt}</p>
          <p className="text-sm text-gray-400">Updated At: {provider.updatedAt}</p>
        </div>
      </div>

      {provider.rating && provider.rating >= 4.5 && (
        <div className="flex items-center mb-6 px-3 py-2 bg-blue-500/10 rounded-lg">
          <Award className="w-4 h-4 text-blue-400 mr-2" />
          <span className="text-sm font-medium text-blue-400">Top Rated Provider</span>
        </div>
      )}

      <div className="flex space-x-3">
        <Button
          variant="neon"
          className="flex-1"
          onClick={() => onAccept(provider.id)}
        >
          Accept
        </Button>
        <Button
          variant="secondary"
          className="flex-1"
          onClick={() => onDecline(provider.id)}
        >
          Decline
        </Button>
      </div>
    </div>
  );
};
