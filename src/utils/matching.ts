import type { Event, ServiceProviderProfile } from '../types';

export function calculateMatchScore(
  event: Event,
  provider: ServiceProviderProfile
): number {
  let score = 0;

  // Base score for service type match
  if (event.services.some(service => service.category === provider.serviceType)) {
    score += 50;
  } else {
    return 0; // No match if service type doesn't match
  }

  // Score based on provider rating
  if (provider.rating) {
    score += provider.rating * 10;
  }

  // Check availability
  if (provider.availability && isProviderAvailable(provider, event.date)) {
    score += 30;
  }

  return score;
}

export function isProviderAvailable(
  provider: ServiceProviderProfile,
  eventDate: Date
): boolean {
  if (!provider.availability) return true;

  const eventDay = eventDate.getDay();
  const eventTime = eventDate.toTimeString().slice(0, 5); // HH:MM format

  return provider.availability.some(schedule => 
    schedule.dayOfWeek === eventDay &&
    schedule.startTime <= eventTime &&
    schedule.endTime >= eventTime
  );
}

export function findBestMatches(
  event: Event,
  providers: ServiceProviderProfile[],
  limit: number = 3
): ServiceProviderProfile[] {
  const matches = providers
    .map(provider => ({
      provider,
      score: calculateMatchScore(event, provider)
    }))
    .filter(match => match.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return matches.map(match => match.provider);
}