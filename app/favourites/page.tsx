'use client';

import ItemsList from '@/components/features/catalog/items-list';
import CatalogContainer from '@/components/layout/catalog-container';

import { getFavItems } from '@/lib/fav-items';

const Favourites = () => {
  const items = getFavItems();
  //! Hydration warning very likely because data from local storage is used, ideally there should be an API to avoid this behavior
  return (
    <CatalogContainer className='flex-grow grid-cols-3 lg:grid-cols-4' >
      {items?.length > 0 ? <ItemsList items={items} /> : null}
    </CatalogContainer>
  );
};

export default Favourites;
