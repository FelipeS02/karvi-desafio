import { FC } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import CatalogContainer, { CatalogContainerProps } from '@/components/layout/catalog-container';

import ItemSkeleton from './item/item-skeleton';



const Loading: FC<CatalogContainerProps> = (props) => {
  return (
    <div>
      <Skeleton className='h-4 w-60 my-4' />
      <CatalogContainer {...props}>
        {Array.from({ length: 6 }, (_, index) => (
          <ItemSkeleton key={`${Skeleton}-${index}`} />
        ))}
      </CatalogContainer>
    </div>
  );
};
export default Loading;
