import { FilterOption } from '@/components/features/catalog/filter/filter-category';

import {
  clientNumberParser,
  clientPriceParser,
  clientStringParser,
} from '@/lib/client-filters';

import { Filters } from './api';

export type ClientFiltersParsers = Record<
  keyof Filters,
  | typeof clientStringParser
  | typeof clientNumberParser
  | typeof clientPriceParser
>;
export type MultipleFilterChangeHandler = (
  type: keyof Filters,
  newValue: FilterOption['value']
) => void;
