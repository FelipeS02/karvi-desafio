import { serverNumberParser, serverPriceParser, serverStringParser } from '@/lib/server-filters';

import { Filters } from './api';

export type ServerFiltersParsers = Record<
  keyof Filters,
  | typeof serverNumberParser
  | typeof serverStringParser
  | typeof serverPriceParser
>;
