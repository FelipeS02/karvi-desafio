import { ApiResponse, Filters, ItemsList } from '@/models/api';
import { SearchParams } from '@/models/search-params';

import { apiResponseSchema, itemsListSchema } from '@/validators/api';

import { timeout } from './utils';

// Fetch data from the API
const getData = async () => {
  const data = await fetch(process.env.API_URL ?? '', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-cache',
    
  });

  // Validate and parse the API response
  return apiResponseSchema.parse(await data.json());
};

function filterBy(
  filters: SearchParams[keyof SearchParams],
  value: string | number
) {
  if (!Array.isArray(filters)) return;
  // If no filters are applied, return true to pass filter validation
  if (filters.length === 0) return true;

  // Check if the value matches any of the provided filters
  const res = filters.includes(value as never);
  return res;
}

const PAGE_SIZE = 12;

// Divide items in chunks based in page size
function paginateItems(items: ItemsList): ItemsList[] {
  const pages = [];

  // Loop through the items and slice them into pages
  for (let i = 0; i < items.length; i += PAGE_SIZE) {
    pages.push(items.slice(i, i + PAGE_SIZE));
  }

  return pages;
}

export interface GetItemsParameters extends SearchParams {
  page: number;
}

/**
 *
 * @param GetItemsParameters
 * @returns List of filtered products
 */
export const getItems = async (
  params: GetItemsParameters
): Promise<Partial<ApiResponse>> => {
  const { items } = await getData();
  const { min = 0, max = 0 } = params;

  // Filter items based on the provided search parameters
  const filteredItems = itemsListSchema.safeParse(
    items.filter((item) => {
      const isMoreThanmin = min > 0 ? item.price >= min : true;
      const isLessThanmax = max > 0 ? item.price <= max : true;

      return (
        filterBy(params.city, item.city) &&
        filterBy(params.model, item.model) &&
        filterBy(params.year, item.year) &&
        filterBy(params.brand, item.brand) &&
        filterBy(params.version, item.version) &&
        isMoreThanmin &&
        isLessThanmax
      );
    })
  );

  // If filtering fails, return an empty response with pagination metadata
  if (!filteredItems.data)
    return {
      items: [],
      totalPages: 1,
      pageSize: PAGE_SIZE,
      totalCount: 0,
      page: 1,
    };

  const parsedItems = filteredItems.data;

  // Paginate the filtered items
  const paginatedItems = paginateItems(parsedItems);

  await timeout(1500);

  // Return the current page along with metadata
  return {
    items: paginatedItems[params.page - 1],
    totalPages: Math.ceil(parsedItems.length / PAGE_SIZE),
    pageSize: PAGE_SIZE,
    totalCount: parsedItems.length,
    page: params.page,
  };
};

// Fetch available filters from the API
export const getFilters = async (): Promise<Filters> => {
  const { availableFilters } = await getData();

  return availableFilters;
};
