import { z } from 'zod';

export const callbackSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  phone_number: z.string()
    .regex(/^\+[1-9]\d{1,14}$/, 'Please enter a valid phone number with country code (e.g., +1234567890)'),
  email: z.string()
    .email('Please enter a valid email address'),
  best_time: z.enum(['Morning', 'Afternoon', 'Evening'], {
    required_error: 'Please select a preferred time'
  }),
  message: z.string()
    .max(200, 'Message must not exceed 200 characters')
    .optional(),
});

export type CallbackFormData = z.infer<typeof callbackSchema>;