import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '../ui/Button';
import { ServiceSelector } from './ServiceSelector';
import { useMutation } from '@tanstack/react-query';
import { eventsApi, CreateEventData } from '../../lib/api/events';
import { useNavigate } from 'react-router-dom';

export const EventForm: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, control, formState: { errors } } = useForm<CreateEventData>({
    defaultValues: {
      date: '',
      address: '',
      guest_count: undefined,
      services: []
    }
  });

  const mutation = useMutation({
    mutationFn: (data: CreateEventData) => eventsApi.createEvent(data),
    onSuccess: (event) => {
      navigate(`/event-matches/${event.id}`);
    },
  });

  const onSubmit = (data: CreateEventData) => {
    console.log('Submitting event data:', data);
    mutation.mutate({
      ...data,
      guest_count: Number(data.guest_count)
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {mutation.error && (
        <div className="p-4 text-sm text-red-500 bg-red-900/20 rounded-lg border border-red-900/50">
          {(mutation.error as Error).message}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-200 mb-2">
            Event Date
          </label>
          <input
            type="date"
            id="date"
            {...register('date', { required: 'Date is required' })}
            className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-400 focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] focus:outline-none transition-colors"
          />
          {errors.date && (
            <p className="mt-2 text-sm text-red-500">{errors.date.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-200 mb-2">
            Event Location
          </label>
          <input
            type="text"
            id="address"
            {...register('address', { required: 'Address is required' })}
            className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-400 focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] focus:outline-none transition-colors"
            placeholder="Enter the full address of your event"
          />
          {errors.address && (
            <p className="mt-2 text-sm text-red-500">{errors.address.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="guest_count" className="block text-sm font-medium text-gray-200 mb-2">
            Number of Guests
          </label>
          <input
            type="number"
            id="guest_count"
            {...register('guest_count', { 
              required: 'Guest count is required',
              min: { value: 1, message: 'Minimum 1 guest required' },
              valueAsNumber: true
            })}
            className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-400 focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] focus:outline-none transition-colors"
            placeholder="Enter the number of guests"
          />
          {errors.guest_count && (
            <p className="mt-2 text-sm text-red-500">{errors.guest_count.message}</p>
          )}
        </div>

        <Controller
          name="services"
          control={control}
          rules={{ required: 'Please select at least one service' }}
          defaultValue={[]}
          render={({ field }) => (
            <ServiceSelector
              value={field.value}
              onChange={field.onChange}
              error={errors.services?.message}
            />
          )}
        />
      </div>

      <div className="pt-4">
        <Button 
          type="submit" 
          variant="neon"
          size="lg"
          className="w-full"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Creating Event...' : 'Submit Event Request'}
        </Button>
      </div>
    </form>
  );
};