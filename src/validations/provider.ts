import { z } from 'zod';

export const providerApplicationSchema = z.object({
  service_type: z.enum(['chef', 'bartender', 'server'], {
    required_error: 'Service type is required'
  }),
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z.string()
    .email('Invalid email address'),
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be less than 15 digits')
    .regex(/^\+?[\d\s-]+$/, 'Invalid phone number format'),
  experience: z.string()
    .min(50, 'Please provide at least 50 characters describing your experience')
    .max(1000, 'Experience description must be less than 1000 characters')
});