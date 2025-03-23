'use client';

import { useGetData } from '@/hooks';
import { CardList, Loading } from '@/components';

export default function PageHome() {
  const { data, isLoading } = useGetData({ param: 'people' });

  return (
    <main className="container grid place-content-center gap-8 mx-auto md:max-w-6xl">
      {isLoading ? (
        <Loading variant="lightsaber" />
      ) : (
        <>
          <CardList data={data?.results} />
          <div>[Pagination]</div>
        </>
      )}
    </main>
  );
}
