import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { callbackSchema, type CallbackFormData } from '../../types/callback';
import { callbackApi } from '../api/callback';

export const useCallbackForm = (onSuccess: () => void) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<CallbackFormData>({
    resolver: zodResolver(callbackSchema),
    defaultValues: {
      name: '',
      phone_number: '',
      email: '',
      best_time: 'Morning',
      message: ''
    }
  });

  const handleSubmit = async (data: CallbackFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await callbackApi.submitCallbackRequest(data);
      form.reset();
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit request');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    error,
    handleSubmit: form.handleSubmit(handleSubmit)
  };
};