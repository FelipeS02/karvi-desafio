import { z } from 'zod';

export const searchParamsSchema = z.object({
  brand: z.array(z.string()),
  model: z.array(z.string()),
  version: z.array(z.string()),
  year: z.array(z.number()),
  city: z.array(z.string()),
  min: z.number().optional(),
  max: z.number().optional(),
});
