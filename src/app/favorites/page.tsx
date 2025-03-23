'use client';

import Link from 'next/link';

import useFavoritesStore from '@/store/favorites';
import { CardList, Loading } from '@/components';

export default function PageFavorites() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const hasHydrated = useFavoritesStore((state) => state._hasHydrated);

  if (!hasHydrated) {
    return (
      <main className="container grid place-content-center gap-8 mx-auto md:max-w-6xl">
        <Loading type="default" />
      </main>
    );
  }

  return (
    <main className="container grid place-content-center gap-8 mx-auto md:max-w-6xl">
      {favorites.length === 0 ? (
        <div className="text-center">
          <h1 className="heading1">You haven't marked your favorites yet!</h1>
          <p>
            Take a look at the <Link href="/" className="link">Characters</Link> page
          </p>
        </div>
      ) : (
        <>
          <CardList data={favorites} />
          <div>[Pagination]</div>
        </>
      )}
    </main>
  );
}
