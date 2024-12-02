import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/Button';
import { FormField } from '../auth/FormField';
import { callbackSchema, type CallbackFormData } from '../../types/callback';

interface CallbackFormProps {
  onSubmit: (data: CallbackFormData) => void;
  onClose: () => void;
}

export const CallbackForm: React.FC<CallbackFormProps> = ({ onSubmit, onClose }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CallbackFormData>({
    resolver: zodResolver(callbackSchema),
    defaultValues: {
      bestTime: 'Morning',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormField
        label="Full Name"
        type="text"
        {...register('name')}
        error={errors.name?.message}
        placeholder="Enter your full name"
      />

      <FormField
        label="Phone Number"
        type="tel"
        {...register('phone_number')}
        error={errors.phone_number?.message}
        placeholder="+919xxxxxxxxx"
      />

      <FormField
        label="Email Address"
        type="email"
        {...register('email')}
        error={errors.email?.message}
        placeholder="Enter your email address"
      />

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">
          Best Time to Call
        </label>
        <select
          {...register('best_time')}
          className="mt-1 block w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-gray-400 focus:border-[#CCFF00] focus:outline-none focus:ring-1 focus:ring-[#CCFF00]"
        >
          <option value="Morning">Morning (9 AM - 12 PM)</option>
          <option value="Afternoon">Afternoon (12 PM - 5 PM)</option>
          <option value="Evening">Evening (5 PM - 8 PM)</option>
        </select>
        {errors.best_time && (
          <p className="mt-1 text-sm text-red-500">{errors.best_time.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">
          Message (Optional)
        </label>
        <textarea
          {...register('message')}
          className="mt-1 block w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-gray-400 focus:border-[#CCFF00] focus:outline-none focus:ring-1 focus:ring-[#CCFF00]"
          rows={4}
          placeholder="Any specific questions or requirements?"
          maxLength={200}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      <div className="flex gap-4">
        <Button 
          type="submit" 
          variant="neon" 
          className="flex-1"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </Button>
        <Button 
          type="button" 
          variant="secondary" 
          onClick={onClose} 
          className="flex-1"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};