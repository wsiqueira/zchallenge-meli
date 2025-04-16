'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetData, useSetData } from '@/hooks';

import { Input } from '@/components/ui/input';
import { CardList, Pagination, Loading } from '@/components';

const api = process.env.NEXT_PUBLIC_API_HOST;
const isTech = api?.includes('tech');

export default function PagePlanetsContent() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '9';
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading, refetch } = useGetData({
    param: 'planets',
    query: isTech
      ? `?page=${page}&limit=${limit}&expanded=true`
      : `?page=${page}`,
  });

  const dataChecker = {
    ...(data?.result && {
      results: [...data?.result],
    }),
    ...data,
  };

  const dataUpdate = useSetData({
    param: 'planets',
    query: isTech
      ? `?name=${searchTerm}&expanded=true`
      : `?search=${searchTerm}`,
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const inputValue = event.target.value;

    if (inputValue.length >= 2) {
      dataUpdate.mutateAsync({
        param: 'planets',
        query: isTech
          ? `?name=${inputValue}&expanded=true`
          : `?search=${inputValue}`,
      });
    }

    if (inputValue.length === 0) {
      dataUpdate.mutateAsync({
        param: 'planets',
        query: isTech
          ? `?page=${page}&limit=${limit}&expanded=true`
          : `?page=${page}`,
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
        <Loading variant="spaceship" />
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
          {searchTerm.length >= 2 && dataChecker.results.length === 0 && (
            <div className="text-center">
              <h1 className="heading1">No results found!</h1>
              <p>Try another search term</p>
            </div>
          )}
          {dataChecker.results.length > 0 && (
            <CardList data={dataChecker.results} />
          )}
          {dataChecker.results.length > 8 && (
            <Pagination
              itemsTotal={
                isTech ? dataChecker.total_records : dataChecker.count
              }
            />
          )}
        </>
      )}
    </main>
  );
}
