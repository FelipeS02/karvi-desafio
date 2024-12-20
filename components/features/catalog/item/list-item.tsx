import { ElementType } from 'react';

import ComposedComponent from '@/models/composed-component';

import { ItemImage } from './item-image';
import {
  Item,
  ItemAntiquity,
  ItemCity,
  ItemModel,
  ItemPrice,
  ItemProps,
} from './item-parts';

export const ListItem = <T extends ElementType = 'div'>({
  item: i,
  className,
  as,

  ...rest
}: ItemProps<T>) => {
  // Re-initialize as composed component props to satisfy container props
  const itemProps = {
    as,
    className,
    ...rest,
  } as ComposedComponent<T>;

  return (
    <Item
      {...itemProps}
      className='flex-row max-w-none justify-normal p-2 gap-3 shadow-card-list items-center'
    >
      <ItemImage
        item={i}
        containerProps={{
          className: ' w-[200px]',
        }}
        itemProps={{
          className: 'min-h-full aspect-[16/11]',
        }}
      />

      <div className='flex flex-col gap-5'>
        <div>
          <ItemAntiquity mileage={i.mileage} year={i.year} />
          <ItemModel brand={i.brand} model={i.model} version={i.version} />
        </div>

        <div>
          <ItemPrice price={i.price} />
          <ItemCity city={i.city} />
        </div>
      </div>
    </Item>
  );
};
