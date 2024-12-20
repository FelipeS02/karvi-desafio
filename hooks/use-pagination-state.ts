import { useQueryStates } from 'nuqs';

import { defaultFilterStateOptions } from '@/lib/client-filters';
import { clientPaginationParser } from '@/lib/client-pagination';

type SetterFunction = (newPage: number) => void;

export default function usePaginationState(): [number, SetterFunction] {
  const [{ currentPage }, setParams] = useQueryStates(clientPaginationParser, {
    urlKeys: {
      currentPage: 'page',
    },
    ...defaultFilterStateOptions,
  });

  const setCurrentPage: SetterFunction = (newPage) => {
    setParams({ currentPage: newPage });
  };

  return [currentPage, setCurrentPage];
}
