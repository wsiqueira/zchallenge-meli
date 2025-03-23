'use client';

import { useSearchParams } from 'next/navigation';
import { useGetData } from '@/hooks';
import { CardList, Pagination, Loading } from '@/components';

export default function PagePlanets() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';
  
  const { data, isLoading } = useGetData({
    param: 'planets',
    query: `?page=${page}`,
  });

  return (
    <main className="container grid place-content-center gap-8 mx-auto md:max-w-6xl">
      {isLoading ? (
        <Loading variant="spaceship" />
      ) : (
        <>
          <div className="flex justify-end">[INPUT]</div>
          <CardList data={data?.results} />

          {data && <Pagination pages={data.count} />}
        </>
      )}
    </main>
  );
}
