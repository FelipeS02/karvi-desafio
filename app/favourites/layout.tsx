import { ReactNode } from 'react';

import FavouritesTitle from '@/components/features/favourites/favourites-title';

export default async function FavouritesLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className='flex flex-col max-w-section m-auto h-[calc(100%_-_6rem)]'>
      <FavouritesTitle />
      {children}
    </div>
  );
}
