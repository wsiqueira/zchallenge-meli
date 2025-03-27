'use client';

import { useState } from 'react';
import Link from 'next/link';

import useFavoritesStore from '@/store/favorites';

import { Input } from '@/components/ui/input';
import { CardList, Loading } from '@/components';

export default function PageFavorites() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const hasHydrated = useFavoritesStore((state) => state._hasHydrated);

  const [searchTerm, setSearchTerm] = useState('');
  const dataFiltered = favorites?.filter((item) => {
    if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return item;
    }
  });

  if (!hasHydrated) {
    return (
      <main className="container grid place-content-center gap-8 mx-auto md:max-w-6xl">
        <Loading variant="default" />
      </main>
    );
  }

  return (
    <main className="container grid place-content-center gap-8 mx-auto md:max-w-6xl">
      {favorites.length === 0 ? (
        <div className="text-center">
          <h1 className="heading1">You haven&apos;t marked your favorites yet!</h1>
          <p>
            Take a look at the <Link href="/characters" className="link">Characters</Link> page
          </p>
        </div>
      ) : (
        <>
          {favorites && (
            <div className="flex justify-end">
              <Input
                type="search"
                placeholder="Search"
                className="md:max-w-48"
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
          )}
          {searchTerm.length >= 2 && dataFiltered.length === 0 && (
            <div className="text-center">
              <h1 className="heading1">No results found!</h1>
              <p>Try another search term</p>
            </div>
          )}

          <CardList data={dataFiltered} />
        </>
      )}
    </main>
  );
}
