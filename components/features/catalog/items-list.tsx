import { FC } from 'react';

import { SearchX } from 'lucide-react';

import { ItemsList as ItemsListType } from '@/models/api';
import { ItemsView } from '@/models/items-view';

import { GridItem } from './item/grid-item';
import { ListItem } from './item/list-item';

const ItemsList: FC<{ items?: ItemsListType; view?: ItemsView }> = ({
  items = [],
  view = 'grid',
}) => {
  const Component = view === 'grid' ? GridItem : ListItem;

  if (!items || items.length === 0)
    return (
      <div className='flex-grow text-gray-800 items-center justify-center flex flex-col w-full col-span-full'>
        <SearchX size={125} strokeWidth={1} />
        <p>No se ha encontrado ningun auto</p>
      </div>
    );

  return (
    <>
      {items.map((item) => (
        <Component item={item} as='article' key={`${view}-car-${item.id}`} />
      ))}
    </>
  );
};

export default ItemsList;
