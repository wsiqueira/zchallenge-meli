'use client';

import { twMerge } from 'tailwind-merge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Card,
  CardContent,
  // CardDescription,
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

const api = process.env.NEXT_PUBLIC_API_HOST;

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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {data?.map((item: CardItemType, index: number) => {
        const itemChecker = item.hasOwnProperty('properties')
          ? item.properties
          : item;

        const hasPlanets = itemChecker?.url.includes('planets');
        const cardVariant = hasPlanets
          ? avatarList['planets']
          : avatarList[`${itemChecker?.name}`];
        const isFavorite = favorites
          .map((favorite: CardItemType) => favorite?.url)
          .includes(`${itemChecker?.url}`);

        const isPeople = itemChecker?.url.includes('people');
        const hrefFix = isPeople
          ? itemChecker?.url.replace(`${api}/people`, '/characters')
          : itemChecker?.url.replace(`${api}/`, '');

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
                'min-w-2xs border-0 shadow-md shadow-gray-300/50 relative z-10',
                isFavorite &&
                  itemChecker?.name === 'Luke Skywalker' &&
                  'border-blue-300 shadow-blue-300/50',
                isFavorite &&
                  itemChecker?.name === 'Darth Vader' &&
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
                          {acronym(`${itemChecker?.name}`).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      {itemChecker?.name}
                    </div>

                    <button
                      className="group/star cursor-pointer"
                      onClick={(event) =>
                        handleFavoriteClick(event, itemChecker!, isFavorite)
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
                      itemChecker?.name === 'Luke Skywalker' &&
                        'group-hover/decal:text-blue-500 group-hover/decal:before:border-blue-500 group-hover/decal:after:border-blue-500 group-hover/decal:before:shadow-[0_0_6px_1px_rgba(0,0,255,0.75)] group-hover/decal:after:shadow-[0_0_6px_1px_rgba(0,0,255,0.75)]',
                      itemChecker?.name === 'Darth Vader' &&
                        'group-hover/decal:text-red-500 group-hover/decal:before:border-red-500 group-hover/decal:after:border-red-500 group-hover/decal:before:shadow-[0_0_6px_1px_rgba(255,0,0,0.75)] group-hover/decal:after:shadow-[0_0_6px_1px_rgba(255,0,0,0.75)]'
                    )}
                  />
                </CardTitle>
              </CardHeader>

              <CardContent>
                <ul>
                  {Object.entries(itemChecker!).map(([key, val], index) => {
                    if (
                      // index > 3 ||
                      key === 'name' ||
                      key === 'url' ||
                      key === 'created' ||
                      key === 'edited' ||
                      key === 'gender' ||
                      key === 'homeworld' ||
                      key === 'hair_color' ||
                      key === 'skin_color' ||
                      key === 'gravity' ||
                      key === 'terrain' ||
                      key === 'rotation_period' ||
                      key === 'orbital_period' ||
                      key === 'uid'
                    )
                      return;

                    return (
                      <li key={index} className="grid grid-cols-2 capitalize">
                        <span>{key.replace(/_/g, ' ')}: </span>
                        <strong>{val}</strong>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>

              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href={`${hrefFix}`}>More</Link>
                </Button>
              </CardFooter>
            </Card>
          </Tilt>
        );
      })}
    </div>
  );
}
