'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetData, useSetData } from '@/hooks';

import { Input } from '@/components/ui/input';
import { CardList, Pagination, Loading } from '@/components';

export default function PageCharacters() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading, refetch } = useGetData({
    param: 'people',
    query: `?page=${page}`,
  });

  const dataUpdate = useSetData({
    param: 'people',
    query: `?search=${searchTerm}`,
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const inputValue = event.target.value;

    if (inputValue.length >= 2) {
      dataUpdate.mutateAsync({
        param: 'people',
        query: `?search=${inputValue}`,
      });
    }

    if (inputValue.length === 0) {
      dataUpdate.mutateAsync({
        param: 'people',
        query: `?page=${page}`,
      });
    }

    setSearchTerm(inputValue);
  }

  useEffect(() => {
    refetch();
  }, [page, refetch]);

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
                className="md:max-w-48"
                onChange={handleChange}
              />
            </div>
          )}
          {searchTerm.length >= 2 && data.results.length === 0 && (
            <div className="text-center">
              <h1 className="heading1">No results found!</h1>
              <p>Try another search term</p>
            </div>
          )}
          {data.results.length > 0 && <CardList data={data.results} />}
          {data.results.length > 9 && <Pagination itemsTotal={data.count} />}
        </>
      )}
    </main>
  );
}
