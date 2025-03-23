'use client';

import { useGetData } from '@/hooks';
import { CardList, Loading } from '@/components';

export default function PagePlanets() {
  const { data, isLoading } = useGetData({ param: 'planets' });

  return (
    <main className="container grid place-content-center gap-8 mx-auto md:max-w-6xl">
      {isLoading ? (
        <Loading variant="spaceship" />
      ) : (
        <>
          <CardList data={data?.results} />
          <div>[Pagination]</div>
        </>
      )}
    </main>
  );
}
