import { ReactNode } from 'react';

import FiltersList from '@/components/features/catalog/filters-list';
import Filters from '@/components/sections/home/filters';

import { getFilters } from '@/lib/api';

import styles from './catalog.module.css';

export default async function CatalogLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const filters = await getFilters();
  return (
    <div className={styles.catalog__wrapper}>
      <Filters>
        <FiltersList filters={filters} />
      </Filters>
      {children}
    </div>
  );
}
