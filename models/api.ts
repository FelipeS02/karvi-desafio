import {
  apiResponseSchema,
  brandFilterSchema,
  cityFilterSchema,
  filtersSchema,
  itemSchema,
  itemsListSchema,
  modelFilterSchema,
  versionFilterSchema,
  yearFilterSchema,
} from '@/validators/api';

// #region Filters

export type YearFilter = typeof yearFilterSchema._output;

export type CityFilter = typeof cityFilterSchema._output;

export type BrandFilter = typeof brandFilterSchema._output;

export type ModelFilter = typeof modelFilterSchema._output;

export type VersionFilter = typeof versionFilterSchema._output;

export type Filters = typeof filtersSchema._output;

// #endregion

// #region Items

export type Item = typeof itemSchema._output;

export type ItemsList = typeof itemsListSchema._output;

// #endregion

export type ApiResponse = typeof apiResponseSchema._output;
