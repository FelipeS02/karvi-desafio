import { SearchParams } from 'nuqs';

import Catalog from '@/components/sections/home/catalog';

import { getItems } from '@/lib/api';
import { getJSONSearchParams } from '@/lib/server-filters';
import { serverPaginationCache } from '@/lib/server-pagination';
import { Suspense } from 'react';
import CatalogLoading from './loading';

type Props = {
  searchParams: Promise<SearchParams>;
};

const Component = async ({ searchParams }: { searchParams: SearchParams }) => {
  const parsedSearchParams = await getJSONSearchParams(searchParams);
  const { currentPage: page } = await serverPaginationCache.parse(searchParams);

  const { items, totalPages, totalCount } = await getItems({
    ...parsedSearchParams,
    page,
  });

  return (
    <Catalog items={items} totalPages={totalPages} totalItems={totalCount} />
  );
};

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <Suspense key={JSON.stringify(params)} fallback={<CatalogLoading />}>
      <Component searchParams={params} />
    </Suspense>
  );
}
