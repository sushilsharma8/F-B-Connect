import React from 'react';
import { DollarSign, Calendar, Star, CheckCircle } from 'lucide-react';
import type { ProviderDashboardStats } from '../../types/providers';
import { StatCard } from './StatCard';

interface StatsOverviewProps {
  stats?: ProviderDashboardStats;
  isLoading?: boolean;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ stats, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white/5 animate-pulse h-32 rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <StatCard
        icon={<Calendar className="w-6 h-6 text-blue-600" />}
        label="Total Bookings"
        value={stats.total_bookings.toString()}
      />
      <StatCard
        icon={<CheckCircle className="w-6 h-6 text-green-600" />}
        label="Completed Events"
        value={stats.completed_events.toString()}
      />
      <StatCard
        icon={<Star className="w-6 h-6 text-yellow-500" />}
        label="Average Rating"
        value={stats.average_rating.toFixed(1)}
      />
      <StatCard
        icon={<DollarSign className="w-6 h-6 text-emerald-600" />}
        label="Total Earnings"
        value={`₹${stats.total_earnings.toLocaleString()}`}
      />
    </div>
  );
};