import { Values } from 'nuqs';
import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  SearchParams,
} from 'nuqs/server';

import { Filters } from '@/models/api';
import { ServerFiltersParsers } from '@/models/server-filters';

import { searchParamsSchema } from '@/validators/search-params';

import { isFilterMultiple } from './utils';

/**
 *
 * @argument keyList Object keys from filters list
 * @returns A list of custom keys to make url shorter
 *
 */
export const getFiltersCustomKeys = (keyList: string[]) => {
  if (keyList?.length === 0) return {};

  return keyList.reduce((urlKeys, filterKey) => {
    urlKeys[filterKey as keyof Filters] = filterKey[0];

    return urlKeys;
  }, {} as Record<keyof Filters, string>);
};

export const serverStringParser = parseAsArrayOf<string>(
  parseAsString
).withDefault([]);
export const serverNumberParser = parseAsArrayOf<number>(
  parseAsInteger
).withDefault([]);
export const serverPriceParser = parseAsInteger.withDefault(0);

export const serverFiltersParsers: ServerFiltersParsers = {
  brand: serverStringParser,
  model: serverStringParser,
  version: serverStringParser,
  year: serverNumberParser,
  city: serverStringParser,
  min: serverPriceParser,
  max: serverPriceParser,
};

export const urlKeys = {
  ...getFiltersCustomKeys(Object.keys(serverFiltersParsers)),
  max: 'max',
  min: 'min',
};

export const isAFilterSelected = (filters: Values<ServerFiltersParsers>) => {
  return Object.entries(filters).find(([, selection]) => {
    if (!isFilterMultiple(selection)) {
      return Boolean(selection);
    }

    return selection.length > 0;
  });
};

export const searchParamsCache = createSearchParamsCache(
  {
    ...serverFiltersParsers,
  },
  { urlKeys }
);

/**
 *
 * @param searchParams Url loaded with nuqs search params
 * @returns Zod-validated params
 */
export const getJSONSearchParams = async (
  searchParams: Promise<SearchParams>
): Promise<typeof searchParamsSchema._output> =>
  searchParamsSchema.parse(await searchParamsCache.parse(searchParams));
