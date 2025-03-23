'use client';

import { twMerge } from 'tailwind-merge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

import useFavoritesStore from '@/store/favorites';

import { avatarList } from '@/utils';

import type { CardListType, CardItemType } from './types';

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
        const cardVariant = item.url.includes('planets')
          ? avatarList['planets']
          : avatarList[`${item?.name}`];
        const isFavorite = favorites
          .map((favorite: CardItemType) => favorite.url)
          .includes(item.url);

        return (
          <Tilt
            key={`card-${index}`}
            // perspective={500}
            glareEnable={true}
            glareMaxOpacity={0.45}
            scale={1.05}
          >
            <Card
              className={twMerge(
                'min-w-2xs',
                item?.name === 'Darth Vader' && 'text-white bg-neutral-500'
              )}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={cardVariant} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    {item?.name}
                  </div>

                  <button
                    className="group cursor-pointer"
                    onClick={(event) =>
                      handleFavoriteClick(event, item, isFavorite)
                    }
                  >
                    <Star
                      className={twMerge(
                        'stroke-gray-200 group-hover:stroke-yellow-400 group-hover:fill-yellow-300',
                        'transition timtransition duration-200 ease-in-out',
                        'aria-[checked=true]:stroke-yellow-400 aria-[checked=true]:fill-yellow-300'
                      )}
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
          </Tilt>
        );
      })}
    </div>
  );
}
