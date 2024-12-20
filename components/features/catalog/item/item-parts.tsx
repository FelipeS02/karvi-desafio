import { ElementType, FC, HTMLAttributes } from 'react';

import Badge from '@/components/ui/badge';
import { Button, ButtonProps } from '@/components/ui/button';
import { MoneyCalculator } from '@/components/icons/money-calculator';

import { formatCurrency, formatDistance } from '@/lib/number-format';
import { cn } from '@/lib/utils';
import { Item as ItemType } from '@/models/api';
import ComposedComponent from '@/models/composed-component';

export const ItemAntiquity: FC<
  Pick<ItemType, 'year' | 'mileage'> & HTMLAttributes<HTMLDivElement>
> = ({ year, mileage, className = '', ...props }) => (
  <div
    className={cn('inline-flex w-full gap-2 font-medium', className)}
    {...props}
  >
    <Badge className='bg-gray-200 text-gray-1000'>{year}</Badge>
    <Badge className='bg-gray-200 text-gray-1000'>
      {formatDistance(mileage)}
    </Badge>
  </div>
);

export const ItemModel: FC<
  Pick<ItemType, 'model' | 'version' | 'brand'> &
    HTMLAttributes<HTMLHeadingElement>
> = ({ model, version, brand, className = '', ...props }) => (
  <h4 className={cn('font-bold leading-6 capitalize', className)} {...props}>
    {brand.toLowerCase()} {model.toLowerCase()}
    <br className='max-md:hidden' />
    <span className='capitalize leading-6 font-normal text-base'>
      {' '}
      {version.toLowerCase()}
    </span>
  </h4>
);

export const ItemPrice: FC<
  Pick<ItemType, 'price'> & HTMLAttributes<HTMLHeadingElement>
> = ({ price, className = '', ...props }) => (
  <h6
    className={cn(
      'text-xl leading-8 text-orange-500 tabular-nums font-medium',
      className
    )}
    {...props}
  >
    {formatCurrency(price)}
  </h6>
);

export const ItemCity: FC<
  Pick<ItemType, 'city'> & HTMLAttributes<HTMLParagraphElement>
> = ({ city, className = '', ...props }) => (
  <p className={cn('text-gray-700', className)} {...props}>
    {city}
  </p>
);

export const ItemButton: FC<ButtonProps> = ({
  children,
  className = '',
  ...props
}) => (
  <Button className={cn('w-full mt-2 group', className)} size='lg' {...props}>
    <MoneyCalculator className='fill-primary-foreground group-hover:[&_#dollar-sign]:animate-shake-dollar' />
    {children}
  </Button>
);

type BaseItemProps = {
  item: ItemType;
};

export type ItemProps<T extends ElementType = 'div'> = BaseItemProps &
  Partial<ComposedComponent<T>> &
  Pick<ButtonProps, 'onClick'>;

export const Item = <T extends ElementType = 'div'>({
  as,
  className,
  children,
}: ComposedComponent<T>) => {
  const Component = as ?? 'div';

  return (
    <Component
      className={cn(
        'col-span-1 flex flex-col justify-between rounded-xl h-fit bg-background',
        className
      )}
    >
      {children}
    </Component>
  );
};
