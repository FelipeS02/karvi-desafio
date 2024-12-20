import { ButtonHTMLAttributes, forwardRef } from 'react';

import { Heart } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Item } from '@/models/api';

export interface FavButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  item: Item;
  checked?: boolean;
  onClick?: (item: Item) => void;
}

const FavButton = forwardRef<HTMLButtonElement, FavButtonProps>(
  (
    { checked = false, onClick = () => undefined, item, className = '' },
    ref
  ) => {
    return (
      <button
        className={cn(
          'rounded-full p-2 bg-background text-md group',
          className
        )}
        onClick={() => onClick(item)}
        data-checked={checked}
        ref={ref}
      >
        <Heart size={20} className='stroke-gray-700 group-data-[checked=true]:fill-orange-500 group-data-[checked=true]:stroke-orange-500' />
      </button>
    );
  }
);

FavButton.displayName = 'FavButton';

export default FavButton;
