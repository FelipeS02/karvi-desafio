'use client';

import { FC, HTMLAttributes, memo } from 'react';

import { useMediaQuery } from 'usehooks-ts';

import { cn } from '@/lib/utils';

import FiltersIcon from '../../icons/filters';
import { Button } from '../../ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../../ui/drawer';

const MobileContainer: FC<HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...props
}) => {
  return (
    <Drawer>
      <Button asChild variant='ghost' size='lg' className='text-primary'>
        <DrawerTrigger style={{ gridArea: 'filters' }}>
          <FiltersIcon /> Filtros
        </DrawerTrigger>
      </Button>
      <DrawerContent className={cn('px-4', className)} {...props}>
        <DrawerHeader>
          <DrawerTitle>Filtros</DrawerTitle>
        </DrawerHeader>
        {children}
      </DrawerContent>
    </Drawer>
  );
};

const DesktopContainer: FC<HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...props
}) => {
  return (
    <aside
      className={cn('flex relative', className)}
      style={{ gridArea: 'filters' }}
      {...props}
    >
      <div className='sticky top-20 w-full h-fit'>{children}</div>
    </aside>
  );
};

const Filters: FC<HTMLAttributes<HTMLDivElement>> = memo(({ ...props }) => {
  const isMobile = useMediaQuery('(max-width: 768px)', {
    initializeWithValue: false,
  });

  return isMobile ? (
    <MobileContainer {...props} />
  ) : (
    <DesktopContainer {...props} />
  );
});

Filters.displayName = 'Filters';

export default Filters;
