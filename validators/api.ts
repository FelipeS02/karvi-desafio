import { z } from 'zod';

// #region Filters

export const yearFilterSchema = z
  .object({
    id: z.number(),
    name: z.number(),
  })
  .transform(({ name, id: value }) => ({ name, value }));

export const cityFilterSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
  })
  .transform(({ name, id: value }) => ({ name, value }));

export const brandFilterSchema = z
  .object({
    id: z.string(),
    name: z.string(),
  })
  .transform(({ name, id: value }) => ({ name, value }));

export const modelFilterSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    brand: z.string(),
  })
  .transform(({ name, id: value }) => ({ name, value }));

export const versionFilterSchema = z
  .object({
    id: z.string(),
    name: z.string(),
  })
  .transform(({ name, id: value }) => ({ name, value }));

export const filtersSchema = z.object({
  year: z.array(yearFilterSchema).nonempty(),
  city: z.array(cityFilterSchema).nonempty(),
  brand: z.array(brandFilterSchema).nonempty(),
  model: z.array(modelFilterSchema).nonempty(),
  version: z.array(versionFilterSchema).nonempty(),
  min: z.number().optional(),
  max: z.number().optional(),
});

// #endregion

// #region Items

export const itemSchema = z.object({
  id: z.number(),
  city: z.string(),
  year: z.number(),
  brand: z.string(),
  model: z.string(),
  version: z.string(),
  price: z.number(),
  mileage: z.number(),
});

export const itemsListSchema = z.array(itemSchema);

// #endregion

export const apiResponseSchema = z.object({
  availableFilters: filtersSchema,
  items: itemsListSchema,
  page: z.number(),
  pageSize: z.number(),
  totalCount: z.number(),
  totalPages: z.number(),
});
