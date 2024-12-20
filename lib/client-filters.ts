import { HistoryOptions, parseAsArrayOf, parseAsInteger, parseAsString } from 'nuqs';

import { ClientFiltersParsers } from '@/models/client-filters';

export const clientStringParser = parseAsArrayOf<string>(
  parseAsString
).withDefault([]);
export const clientNumberParser = parseAsArrayOf<number>(
  parseAsInteger
).withDefault([]);
export const clientPriceParser = parseAsInteger;

export const clientFiltersParsers: ClientFiltersParsers = {
  brand: clientStringParser,
  model: clientStringParser,
  version: clientStringParser,
  year: clientNumberParser,
  city: clientStringParser,
  min: clientPriceParser,
  max: clientPriceParser,
};

export const defaultFilterStateOptions = {
  // Return to the top of the page
  scroll: true,
  // Setting it to false will trigger a network request to the server with the updated querystring.
  shallow: false,
  // Prevent history to stack when too many filters are applied
  history: 'replace' as HistoryOptions,
};
