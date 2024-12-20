import { FC } from 'react';

import { Check } from 'lucide-react';
import { Values } from 'nuqs';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { isFilterMultiple } from '@/lib/utils';
import { Filters } from '@/models/api';
import { ClientFiltersParsers } from '@/models/client-filters';

export type FilterOption = {
  value: string;
  name: string;
};

type FilterCategoryProps = {
  type: keyof Filters;
  options: FilterOption[];
  onSelect?: (value: FilterOption['value']) => void;
  selections?: Values<ClientFiltersParsers>[keyof Values<ClientFiltersParsers>];
};

const FilterInner: FC<FilterCategoryProps> = ({
  type,
  selections = [],
  options,
  onSelect = () => undefined,
}) => {
  if (!isFilterMultiple(selections)) return null;

  return (
    <div className='flex flex-col'>
      {options.map((option) => {
        const isOptionSelected = selections.includes(option.value as never);

        return (
          <button
            className='py-1 border-border border-b last:border-0 font-medium text-left  group/filter'
            onClick={() => onSelect(option.value)}
            data-selected={isOptionSelected}
            aria-label={`Filter by ${type} ${option.name}`}
            key={`option-${option.name}`}
          >
            <span className='py-2 px-1 inline-flex justify-between w-full hover:bg-gray-100 rounded-sm transition-colors'>
              {option.name}
              <Check
                size={18}
                className='opacity-0 group-data-[selected=true]/filter:opacity-100 text-orange-400 transition-opacity duration-100'
              />
            </span>
          </button>
        );
      })}
    </div>
  );
};

const FilterCategory: FC<FilterCategoryProps> = ({ type, ...rest }) => {
  return (
    <AccordionItem value={type}>
      <AccordionTrigger>{type}</AccordionTrigger>
      <AccordionContent>
        <FilterInner type={type} {...rest} />
      </AccordionContent>
    </AccordionItem>
  );
};

export default FilterCategory;
