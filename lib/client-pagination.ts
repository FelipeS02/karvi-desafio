import { parseAsInteger } from 'nuqs';

export const clientPaginationParser = {
  currentPage: parseAsInteger.withDefault(1),
};
