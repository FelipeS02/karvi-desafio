'use client';

import {
  ComponentProps,
  FC,
  HTMLAttributes,
  memo,
  useCallback,
  useState,
} from 'react';
import Image from 'next/image';

import {
  Carousel,
  CarouselContent,
  CarouselDotButtons,
  CarouselItem,
} from '@/components/ui/carousel';
import Car1 from '@/public/images/car1.avif';
import Car2 from '@/public/images/car2.avif';
import Car3 from '@/public/images/car3.avif';
import Car4 from '@/public/images/car4.avif';

import {
  alternateFavItem,
  getFavItems,
  getItemSelection,
} from '@/lib/fav-items';
import { cn } from '@/lib/utils';
import { Item } from '@/models/api';

import FavButton from './fav-button';

export interface ItemImageProps {
  item: Item;
  containerProps?: HTMLAttributes<HTMLDivElement>;
  itemProps?: ComponentProps<typeof CarouselContent>;
}

export const ItemImage: FC<ItemImageProps> = memo(({
  item,
  containerProps: { className: containerCn = '', ...containerProps } = {},
  itemProps: { className: itemCn = '', ...itemProps } = {},
}) => {
  const [isSelected, setIsSelected] = useState(
    getItemSelection(item, getFavItems()).isSelected
  );

  const images = [Car1, Car2, Car3, Car4];

  const handleFavClick = useCallback((item: Item) => {
    alternateFavItem(item);
    setIsSelected((prev) => !prev);
  }, []);

  return (
    <Carousel
      className={cn('overflow-clip relative rounded-md', containerCn)}
      {...containerProps}
    >
      <FavButton
        item={item}
        className='absolute top-2 right-2 z-10'
        checked={isSelected}
        onClick={handleFavClick}
      />
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem
            className={cn('relative', itemCn)}
            key={`carrousel-item-${item.model}-${index}`}
            {...itemProps}
          >
            <Image
              src={image}
              className='object-cover'
              fill
              alt={`${item.model}-${item.year}-index`}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselDotButtons className='absolute top-[90%] m-auto left-1/2 -translate-x-1/2' />
    </Carousel>
  );
});

ItemImage.displayName = "ItemImage"
