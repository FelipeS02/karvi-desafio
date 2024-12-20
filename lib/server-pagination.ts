import { createSearchParamsCache, parseAsInteger } from 'nuqs/server';

export const serverPaginationParser = {
  currentPage: parseAsInteger.withDefault(1),
};

export const serverPaginationCache = createSearchParamsCache(
  serverPaginationParser,
  {
    urlKeys: {
      currentPage: 'page',
    },
  }
);
