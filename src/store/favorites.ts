import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

type favoritesStoreType = {
  favorites: any;
  favoriteAdd: (favorite: any) => void;
  favoriteRemove: (favoriteId: any) => void;
};

const useFavoritesStore = create<favoritesStoreType>()(
  persist(
    (set, get) => ({
      favorites: [],
      favoriteAdd: (favorite) => set((state) => ({ favorites: [...state.favorites, favorite] })),  
      favoriteRemove: (favoriteURL) => set((state) => ({ favorites: state.favorites.filter((favorite) => favorite.url !== favoriteURL) })),
    }),
    {
      name: 'favorites',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export default useFavoritesStore;
