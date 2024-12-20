// components/common/item/item-grid.tsx
import { ElementType } from 'react';

import ComposedComponent from '@/models/composed-component';

import { ItemImage } from './item-image';
import {
  Item,
  ItemAntiquity,
  ItemButton,
  ItemCity,
  ItemModel,
  ItemPrice,
  ItemProps,
} from './item-parts';

const GridItem = <T extends ElementType = 'div'>({
  item: i,
  className,
  onClick = () => undefined,
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
    <Item {...itemProps} className='shadow-card-grid flex flex-col'>
      <ItemImage
        item={i}
        containerProps={{ className: 'm-2 mb-0' }}
        itemProps={{ className: 'aspect-[16/10]' }}
      />

      <div className='px-4 py-3 flex-grow flex flex-col justify-between'>
        <div className='mb-1 flex flex-col gap-1'>
          <ItemAntiquity mileage={i.mileage} year={i.year} />
          <ItemModel model={i.model} brand={i.brand} version={i.version} />
        </div>

        <div>
          <ItemPrice price={i.price} />
          <ItemCity city={i.city} />

          <ItemButton
            size='lg'
            className='max-lg:hidden mt-2 mb-1'
            onClick={onClick}
          >
            Simular parcelas
          </ItemButton>
          <ItemButton
            size='sm'
            className='lg:hidden mt-2 mb-1'
            onClick={onClick}
          >
            Simular parcelas
          </ItemButton>
        </div>
      </div>
    </Item>
  );
};

export { GridItem };
