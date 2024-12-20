'use client';

import { ComponentProps, FC, HTMLAttributes, memo, useState } from 'react';

import { Trash, X } from 'lucide-react';
import { SetValues, Values } from 'nuqs';
import { useMediaQuery } from 'usehooks-ts';

import ViewGrid from '@/components//icons/view-grid';
import { Button } from '@/components//ui/button';
import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components//ui/pagination';
import Tag from '@/components//ui/tag';
import { FilterOption } from '@/components/features/catalog/filter/filter-category';
import ItemsList from '@/components/features/catalog/items-list';
import CatalogContainer from '@/components/layout/catalog-container';

import { formatCurrency } from '@/lib/number-format';
import { isAFilterSelected } from '@/lib/server-filters';
import { isFilterMultiple } from '@/lib/utils';
import { cn } from '@/lib/utils';
import useFiltersState from '@/hooks/use-filters-state';
import usePaginationState from '@/hooks/use-pagination-state';
import { Filters, ItemsList as ItemListType } from '@/models/api';
import {
  ClientFiltersParsers,
  MultipleFilterChangeHandler,
} from '@/models/client-filters';
import { ItemsView } from '@/models/items-view';
import { ServerFiltersParsers } from '@/models/server-filters';

export interface CatalogProps {
  items?: ItemListType;
  totalPages?: number;
  totalItems?: number;
}

export type Entry = [
  string,
  Values<ClientFiltersParsers>[keyof ClientFiltersParsers]
];

const RenderListByType: FC<{
  entry: Entry;
  onMultipleSelect: MultipleFilterChangeHandler;
  onSingleSelect: SetValues<ClientFiltersParsers>;
}> = ({ entry, onMultipleSelect, onSingleSelect }) => {
  const [type, selection] = entry;

  if (!isFilterMultiple(selection)) {
    if (!selection) return null;

    return (
      <Tag
        key={`${type}-tag`}
        size='sm'
        variant='outline'
        close
        onClick={() =>
          onSingleSelect((values) => ({
            ...values,
            [type as keyof Filters]: null,
          }))
        }
      >
        {type} {formatCurrency(selection)}
        <X />
      </Tag>
    );
  }

  return (
    <>
      {selection.map((value) => (
        <Tag
          key={`${value}-tag`}
          size='sm'
          variant='outline'
          close
          onClick={() =>
            onMultipleSelect(
              type as keyof Filters,
              value as FilterOption['value']
            )
          }
        >
          {value}
          <X />
        </Tag>
      ))}
    </>
  );
};

const FiltersList = memo(function FiltersList({
  className = '',
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  const { handleMultipleFilterChange, setFilters, filters, resetFilters } =
    useFiltersState();

  const entries = Object.entries(filters);

  if (!isAFilterSelected(filters as Values<ServerFiltersParsers>)) return null;

  return (
    <div
      className={cn(
        'max-md:hidden grid grid-cols-5 gap-4 items-center',
        className
      )}
      {...rest}
    >
      <div className='flex gap-2 flex-wrap py-3 col-span-4'>
        {entries.flatMap((entry) => (
          <RenderListByType
            entry={entry}
            onMultipleSelect={handleMultipleFilterChange}
            onSingleSelect={setFilters}
            key={`${entry[0]}-selections`}
          />
        ))}
      </div>
      <Button
        variant='ghost'
        size='sm'
        onClick={resetFilters}
        className='text-primary/80 hover:bg-transparent hover:text-primary pr-0 justify-end'
      >
        <Trash /> Limpiar filtros
      </Button>
    </div>
  );
});

const ItemsPagination = ({
  totalPages,
  ...rest
}: ComponentProps<'nav'> & { totalPages: number }) => {
  const [currentPage, setCurrentPage] = usePaginationState();

  return (
    <Pagination {...rest}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious disabled={currentPage === 1} />
        </PaginationItem>
      </PaginationContent>

      <PaginationContent>
        {Array.from({ length: totalPages }, (_, i) => {
          const pageNumber = i + 1;
          return (
            <PaginationItem key={`pagination-item-${pageNumber}`}>
              <PaginationButton
                isActive={Number(currentPage) === pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                size='lg'
              >
                {pageNumber}
              </PaginationButton>
            </PaginationItem>
          );
        })}
      </PaginationContent>

      <PaginationContent>
        <PaginationItem>
          <PaginationNext disabled={currentPage === totalPages} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

const Catalog: FC<CatalogProps> = ({
  items = [],
  totalPages = 1,
  totalItems = 0,
}) => {
  const [view, setView] = useState<ItemsView>('grid');
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Lock grid view in desktop
  const viewByDevice = isMobile ? view : 'grid';

  return (
    <div
      className='flex flex-col gap-3 relative animate-appear'
      key={items.length}
      style={{ gridArea: 'items' }}
    >
      <FiltersList />

      {items?.length > 0 ? (
        <div className='inline-flex w-full justify-between py-1 items-center'>
          <p className='font-medium'>{totalItems} carros encontrados</p>
          <Button
            variant='ghost'
            onClick={() =>
              setView((prev) => (prev === 'grid' ? 'list' : 'grid'))
            }
            size='lg'
            className='lg:hidden -mr-4'
          >
            <ViewGrid />
          </Button>
        </div>
      ) : null}

      <CatalogContainer view={viewByDevice}>
        <ItemsList items={items} view={viewByDevice} />
      </CatalogContainer>

      {totalItems > 0 ? (
        <ItemsPagination
          totalPages={totalPages}
          className='w-full justify-between'
        />
      ) : null}
    </div>
  );
};

export default Catalog;
