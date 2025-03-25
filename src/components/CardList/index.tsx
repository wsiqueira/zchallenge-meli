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

import { acronym } from '@/lib/utils';
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
      {data.map((item: CardItemType, index: number) => {
        const hasPlanets = item.url.includes('planets');
        const cardVariant = hasPlanets
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
                'group/decal',
                'min-w-2xs shadow-md shadow-gray-300/50 relative z-10',
                isFavorite &&
                  item?.name === 'Luke Skywalker' &&
                  'border-blue-300 shadow-blue-300/50',
                isFavorite &&
                  item?.name === 'Darth Vader' &&
                  'border-red-300 shadow-red-300/50'
                // item?.name === 'Darth Vader' && 'text-white bg-neutral-500',
              )}
            >
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={cardVariant} />
                        <AvatarFallback>
                          {acronym(item?.name).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      {item?.name}
                    </div>

                    <button
                      className="group/star cursor-pointer"
                      onClick={(event) =>
                        handleFavoriteClick(event, item, isFavorite)
                      }
                    >
                      <Star
                        className={twMerge(
                          'stroke-gray-200 group-hover/star:stroke-yellow-400 group-hover:fill-yellow-300',
                          'transition timtransition duration-200 ease-in-out',
                          'aria-[checked=true]:stroke-yellow-400 aria-[checked=true]:fill-yellow-300'
                        )}
                        aria-checked={isFavorite}
                      />
                    </button>
                  </div>
                  <span
                    className={twMerge(
                      'decal',
                      'group-hover/decal:text-yellow-500 group-hover/decal:before:border-yellow-500 group-hover/decal:after:border-yellow-500 group-hover/decal:before:shadow-[0_0_6px_1px_rgba(255,255,0,0.75)] group-hover/decal:after:shadow-[0_0_6px_1px_rgba(255,255,0,0.75)]',
                      item?.name === 'Luke Skywalker' &&
                        'group-hover/decal:text-blue-500 group-hover/decal:before:border-blue-500 group-hover/decal:after:border-blue-500 group-hover/decal:before:shadow-[0_0_6px_1px_rgba(0,0,255,0.75)] group-hover/decal:after:shadow-[0_0_6px_1px_rgba(0,0,255,0.75)]',
                      item?.name === 'Darth Vader' &&
                        'group-hover/decal:text-red-500 group-hover/decal:before:border-red-500 group-hover/decal:after:border-red-500 group-hover/decal:before:shadow-[0_0_6px_1px_rgba(255,0,0,0.75)] group-hover/decal:after:shadow-[0_0_6px_1px_rgba(255,0,0,0.75)]'
                    )}
                  />
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
