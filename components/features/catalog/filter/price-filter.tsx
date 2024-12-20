'use client';

import { ChangeEvent, FC, useEffect, useState } from 'react';

import { ChevronRight, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const numberRegex = /^\d+$/;

export type PriceFilterSubmit = (min: number, max: number) => void;

export interface PriceFilterProps {
  onSubmit?: PriceFilterSubmit;
  onClear?: () => void;
  minValue: number;
  maxValue: number;
}

const PriceFilter: FC<PriceFilterProps> = ({
  maxValue = 0,
  minValue = 0,
  onSubmit = () => undefined,
  onClear,
}) => {
  const [{ min, max }, setRange] = useState({
    min: 0,
    max: 0,
  });

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (value.length === 0) setRange((prev) => ({ ...prev, [name]: 0 }));

    // ICheck if input is not a number
    if (!numberRegex.test(value)) return;

    setRange((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = () => onSubmit(min, max);

  const disableSubmit =
    max < min || min > max || (minValue === min && maxValue === max);

  useEffect(() => {
    setRange({
      min: minValue,
      max: maxValue,
    });
  }, [maxValue, minValue]);

  return (
    <div className='flex flex-col py-4 gap-2 border-b'>
      <div className='inline-flex w-full justify-between items-center'>
        <p className='font-semibold'>Precio</p>
        {(minValue || maxValue) && Boolean(onClear) ? (
          <Button size={'icon'} variant={'ghost'} onClick={onClear}>
            <Trash />
          </Button>
        ) : null}
      </div>
      <div className='w-full inline-flex rounded-full gap-2 items-center'>
        <Input
          placeholder='minimo'
          name='min'
          value={min ? min : ''}
          onChange={handleValueChange}
        />
        <span className='text-muted-foreground'>-</span>
        <Input
          placeholder='maximo'
          name='max'
          value={max ? max : ''}
          onChange={handleValueChange}
        />
        <Button
          size='icon'
          className='size-7 aspect-square'
          aria-label='Filter by price'
          disabled={disableSubmit}
          onClick={handleSubmit}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

PriceFilter.displayName = 'PriceFilter';

export default PriceFilter;
