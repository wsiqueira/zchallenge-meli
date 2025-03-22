'use client';

import useFavoritesStore from '@/store/favorites';

import { CardList } from '@/components';

export default function PageFavorites() {
  const favorites = useFavoritesStore((state) => state.favorites);

  return (
    <main className="container mx-auto md:max-w-6xl">
      <CardList data={favorites} />
    </main>
  );
}
