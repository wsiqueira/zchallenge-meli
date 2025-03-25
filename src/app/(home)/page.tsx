'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetData } from '@/hooks';

import { Input } from '@/components/ui/input';
import { CardList, Pagination, Loading } from '@/components';

export default function PageHome() {
  const searchParams = useSearchParams();
  const [page] = useState(searchParams.get('page') || '1');
  const [searchTerm, setSearchTerm] = useState('');

  const query =
    searchTerm.length >= 2
      ? `?search=${searchTerm.toLowerCase()}`
      : `?page=${page}`;

  const { data, isLoading, refetch } = useGetData({
    param: 'people',
    query: query,
  });

  useEffect(() => {
    refetch();
  }, [page, searchTerm, refetch]);

  return (
    <main className="container grid place-content-center gap-8 mx-auto md:max-w-6xl">
      {isLoading ? (
        <Loading variant="lightsaber" />
      ) : (
        <>
          {data && (
            <div className="flex justify-end">
              <Input
                type="search"
                placeholder="Search"
                className="max-w-48"
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
          )}
          {data && <CardList data={data.results} />}
          {data && <Pagination itemsTotal={data.count} />}
        </>
      )}
    </main>
  );
}
