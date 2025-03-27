import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import type { CardItemType } from '@/components/CardList/types';

type favoritesStoreType = {
  favorites: CardItemType[];
  favoriteAdd: (favorite: CardItemType) => void;
  favoriteRemove: (favoriteId: string) => void;

  _hasHydrated: boolean
  setHasHydrated: (state: boolean) => void;
};

const useFavoritesStore = create<favoritesStoreType>()(
  persist(
    (set) => ({
      favorites: [],
      favoriteAdd: (favorite) =>
        set((state) => ({ favorites: [...state.favorites, favorite]})),
      favoriteRemove: (favoriteURL) =>
        set((state) => ({ favorites: state.favorites.filter((favorite) => favorite.url !== favoriteURL)})),

      _hasHydrated: false,
      setHasHydrated: (state) => {
        set({
          _hasHydrated: state,
        });
      },
    }),
    {
      name: 'favorites',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: (state) => {
        return () => state.setHasHydrated(true)
      }
    }
  )
);

export default useFavoritesStore;
