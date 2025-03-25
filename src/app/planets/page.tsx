'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetData } from '@/hooks';

import { Input } from '@/components/ui/input';
import { CardList, Pagination, Loading } from '@/components';

export default function PagePlanets() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';

  const { data, isLoading, refetch } = useGetData({
    param: 'planets',
    query: `?page=${page}`,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const dataFiltered = data?.results?.filter((item) => {
    if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return item;
    }
  });

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  return (
    <main className="container grid place-content-center gap-8 mx-auto md:max-w-6xl">
      {isLoading ? (
        <Loading variant="spaceship" />
      ) : (
        <>
          {data && (
            <div className="flex justify-end">
              <Input
                type="search"
                placeholder="Search by name"
                className="max-w-48"
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
          )}

          <CardList data={dataFiltered} />

          {data && <Pagination itemsTotal={data.count} />}
        </>
      )}
    </main>
  );
}
