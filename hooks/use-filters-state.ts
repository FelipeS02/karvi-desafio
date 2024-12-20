import { useCallback } from 'react';

import { useQueryStates } from 'nuqs';

import {
  clientFiltersParsers,
  defaultFilterStateOptions,
} from '@/lib/client-filters';
import { urlKeys } from '@/lib/server-filters';
import { isFilterMultiple } from '@/lib/utils';
import { MultipleFilterChangeHandler } from '@/models/client-filters';

export default function useFiltersState() {
  const [filters, setFilters] = useQueryStates(clientFiltersParsers, {
    urlKeys,
    ...defaultFilterStateOptions,
  });

  const handleMultipleFilterChange: MultipleFilterChangeHandler = useCallback(
    (type, newValue) => {
      const currentFilters = filters[type];

      // Multiple filter handler
      if (isFilterMultiple(currentFilters)) {
        // Create a new array with the proper type
        const newFilters = [...currentFilters];

        const valueIndex = newFilters.indexOf(newValue as never);

        if (valueIndex === -1) {
          // Add value if not present
          newFilters.push(newValue as never);
        } else {
          // Remove value if present
          newFilters.splice(valueIndex, 1);
        }
        // Update the specific filter type with the new array
        setFilters({
          ...filters,
          [type]: newFilters,
        });

        return;
      }

      throw new Error('Filter type must be multiple');
    },
    [filters, setFilters]
  );

  const resetFilters = () => setFilters(null);

  return {
    filters,
    handleMultipleFilterChange,
    setFilters,
    resetFilters,
  };
}
