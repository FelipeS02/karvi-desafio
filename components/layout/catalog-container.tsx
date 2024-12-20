import { FC, HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';
import { ItemsView } from '@/models/items-view';

export interface CatalogContainerProps extends HTMLAttributes<HTMLDivElement> {
  view?: ItemsView;
}

const CatalogContainer: FC<CatalogContainerProps> = ({
  className,
  children,
  view = 'grid',
  ...rest
}) => {
  return (
    <main
      aria-label='Cars list'
      className={cn(
        'grid data-[view="list"]:grid-cols-1 grid-cols-2 gap-2 lg:grid-cols-3 lg:gap-4 flex-grow',
        className
      )}
      data-view={view}
      {...rest}
    >
      {children}
    </main>
  );
};

export default CatalogContainer;
