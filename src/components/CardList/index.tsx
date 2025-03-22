import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Star } from 'lucide-react';

import useFavoritesStore from '@/store/favorites';

import type { Film, People, Planet, Species, Starship } from 'ts-swapi';

type CardItemType = Film & People & Planet & Species & Starship & {};

type CardListType = {
  data: CardItemType[];
};

export function CardList({ data }: CardListType) {
  const favorites = useFavoritesStore((state) => state.favorites);
  const favoriteAdd = useFavoritesStore((state) => state.favoriteAdd);
  const favoriteRemove = useFavoritesStore((state) => state.favoriteRemove);

  function handleFavoriteClick(
    event: React.MouseEvent<HTMLButtonElement>,
    favorite: CardItemType,
    isFavorite: boolean
  ) {
    event.preventDefault();

    if (isFavorite) {
      favoriteRemove(favorite.url);
    } else {
      favoriteAdd(favorite);
    }
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {data?.map((item: CardItemType, index: number) => {
        const isFavorite = favorites
          .map((favorite: CardItemType) => favorite.url)
          .includes(item.url);

        return (
          <Card key={`card-${index}`}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {item?.name}{' '}
                <button
                  className="group"
                  onClick={(event) =>
                    handleFavoriteClick(event, item, isFavorite)
                  }
                >
                  <Star
                    className="group-hover:fill-yellow-300 aria-[checked=true]:fill-yellow-300 transition duration-200 ease-in-out"
                    aria-checked={isFavorite}
                  />
                </button>
              </CardTitle>
              {/* <CardDescription>
                Deploy your new project in one-click.
              </CardDescription> */}
            </CardHeader>

            <CardContent>CardContent</CardContent>

            <CardFooter className="flex justify-between">
              <Button variant="outline">Load more</Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
