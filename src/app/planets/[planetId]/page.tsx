import Link from 'next/link';
import Image from 'next/image';

import { twMerge } from 'tailwind-merge';
import { dataFetch, acronym, dateFormatter } from '@/lib/utils';
import { avatarList } from '@/utils';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MoveLeft } from 'lucide-react';

import { LinkList } from '@/components';

import type { Planet } from 'ts-swapi';

type PlanetProperties = Planet & {
  result: {
    properties: Planet;
  };
};
type Params = Promise<{ planetId: string }>;

const api = process.env.NEXT_PUBLIC_API_HOST;

export default async function PagePlanet({ params }: { params: Params }) {
  const { planetId } = await params;
  const data: PlanetProperties = await dataFetch(`${api}/planets/${planetId}`);

  const dataChecker = data.result.hasOwnProperty('properties')
    ? data.result.properties
    : data;
  const dataUpdated = Object.assign({}, dataChecker, {
    ...(dataChecker?.residents && {
      residents: LinkList({
        data: dataChecker.residents,
        href: '',
        className: 'link text-xs block',
        hrefReplace: {
          termFind: `${api}/people`,
          termReplace: '/characters',
        },
      }),
    }),

    ...(dataChecker?.films && {
      films: LinkList({
        data: dataChecker?.films,
        href: '',
        className: 'text-xs block pointer-events-none',
      }),
    }),

    created: dateFormatter(dataChecker.created),
    edited: dateFormatter(dataChecker.edited),
  });

  return (
    <main className="container grid place-content-center gap-8 mx-auto md:max-w-6xl">
      <Card className="md:w-2xl border-0 relative overflow-hidden">
        <CardHeader>
          <div className="relative -mt-6 -mb-8 scale-x-125 bg-gray-200">
            <Image
              src={`https://picsum.photos/seed/${dataUpdated?.name
                .replace(' ', '')
                .toLowerCase()}/672/266`}
              width={672}
              height={266}
              alt="Random pictures"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </div>
          <CardTitle>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-20 h-20 md:w-24 md:h-24 bg-white border-4 border-white rounded-full">
                  <AvatarImage
                    src={avatarList['planets']}
                    width={255}
                    height={255}
                  />
                  <AvatarFallback>
                    {acronym(dataUpdated?.name).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <h1 className="heading1 font-semibold">{dataUpdated?.name}</h1>
              </div>
            </div>
            <span
              className={twMerge(
                'decal',
                'group-hover/decal:text-yellow-500 group-hover/decal:before:border-yellow-500 group-hover/decal:after:border-yellow-500 group-hover/decal:before:shadow-[0_0_6px_1px_rgba(255,255,0,0.75)] group-hover/decal:after:shadow-[0_0_6px_1px_rgba(255,255,0,0.75)]',
                dataUpdated?.name === 'Luke Skywalker' &&
                  'group-hover/decal:text-blue-500 group-hover/decal:before:border-blue-500 group-hover/decal:after:border-blue-500 group-hover/decal:before:shadow-[0_0_6px_1px_rgba(0,0,255,0.75)] group-hover/decal:after:shadow-[0_0_6px_1px_rgba(0,0,255,0.75)]',
                dataUpdated?.name === 'Darth Vader' &&
                  'group-hover/decal:text-red-500 group-hover/decal:before:border-red-500 group-hover/decal:after:border-red-500 group-hover/decal:before:shadow-[0_0_6px_1px_rgba(255,0,0,0.75)] group-hover/decal:after:shadow-[0_0_6px_1px_rgba(255,0,0,0.75)]'
              )}
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {Object.entries(dataUpdated).map(([key, val], index) => {
              if (key === 'name' || key === 'url') return;

              return (
                <li key={index} className="grid grid-cols-2 capitalize">
                  <span>{key.replace(/_/g, ' ')}: </span>
                  <strong>{val}</strong>
                </li>
              );
            })}
          </ul>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link href="/planets">
              <MoveLeft className="w-4 h-4" /> Back
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
