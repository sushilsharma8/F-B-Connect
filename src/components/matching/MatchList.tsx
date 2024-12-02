import React from 'react';
import { MatchCard } from './MatchCard';
import type { ServiceProviderProfile } from '../../types';

interface MatchListProps {
  matches: ServiceProviderProfile[];
  onAcceptMatch: (providerId: string) => void;
  onDeclineMatch: (providerId: string) => void;
}

export const MatchList: React.FC<MatchListProps> = ({
  matches,
  onAcceptMatch,
  onDeclineMatch
}) => {
  if (matches.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No matches found at this time.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {matches.map(provider => (
        <MatchCard
          key={provider.id}
          provider={provider}
          onAccept={onAcceptMatch}
          onDecline={onDeclineMatch}
        />
      ))}
    </div>
  );
}