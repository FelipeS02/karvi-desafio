'use client';

import { FC } from 'react';

import useFiltersState from '@/hooks/use-filters-state';
import usePaginationState from '@/hooks/use-pagination-state';
import { Filters } from '@/models/api';
import { MultipleFilterChangeHandler } from '@/models/client-filters';

import { Accordion } from '../../ui/accordion';
import FilterCategory, { FilterOption } from './filter/filter-category';
import PriceFilter, { PriceFilterSubmit } from './filter/price-filter';

const FiltersList: FC<{ filters: Filters }> = ({ filters }) => {
  const {
    handleMultipleFilterChange,
    filters: selectedFilters,
    setFilters,
  } = useFiltersState();

  const [, setPage] = usePaginationState();

  const handleSelect: MultipleFilterChangeHandler = (type, value) => {
    handleMultipleFilterChange(type, value);
    setPage(1);
  };

  const handlePriceFilter: PriceFilterSubmit = (min, max) => {
    const newValues = {} as Record<'min' | 'max', number>;

    if (min) newValues['min'] = min;
    if (max) newValues['max'] = max;

    setFilters({ ...selectedFilters, ...newValues });
    setPage(1);
  };

  const clearPriceFilter = () => {
    setFilters({ ...selectedFilters, min: null, max: null });
  };

  return (
    <>
      <PriceFilter
        maxValue={(selectedFilters?.max as number) ?? 0}
        minValue={(selectedFilters?.min as number) ?? 0}
        onSubmit={handlePriceFilter}
        onClear={clearPriceFilter}
      />
      <Accordion type='single'>
        {Object.entries(filters).map(([t, options]) => {
          const type = t as keyof Filters;

          const categorySelections = selectedFilters[type];

          return (
            <FilterCategory
              type={type}
              options={options as FilterOption[]}
              onSelect={(value) => handleSelect(type, value)}
              selections={categorySelections}
              key={`${type}-filter`}
            />
          );
        })}
      </Accordion>
    </>
  );
};

export default FiltersList;
