import { searchParamsSchema } from '@/validators/search-params';

export type SearchParams = typeof searchParamsSchema._output;
