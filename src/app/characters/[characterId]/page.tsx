import Link from 'next/link';
import Image from 'next/image';

import { twMerge } from 'tailwind-merge';
import { Button } from '@/components/ui/button';

import { acronym } from '@/lib/utils';
import { avatarList } from '@/utils';

export default async function PageCharacter({
  params,
}: {
  params: Promise<{ characterId: string }>;
}) {
  const data = await fetch(
    `https://swapi.dev/api/people/${params.characterId}`,
    {
      cache: 'force-cache',
    }
  ).then((response) => response.json());

  const formatter = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  data['created'] = formatter.format(data['created'].value);
  data['edited'] = formatter.format(data['edited'].value);

  return (
    <main className="container grid place-content-center gap-8 mx-auto md:max-w-6xl">
      <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
        <div className="rounded-t-lg h-32 overflow-hidden">
          <Image
            src="https://picsum.photos/seed/picsum/640/480"
            width={400}
            height={400}
            alt="Random pictures"
          />
        </div>
        <div className="mx-auto w-32 h-32 relative -mt-16 text-gray-200 bg-white border-4 border-white rounded-full overflow-hidden">
          {avatarList[`${data?.name}`] ? (
            <Image
              src={avatarList[`${data?.name}`]}
              width={256}
              height={256}
              alt="Photo"
            />
          ) : (
            acronym(data?.name).toUpperCase()
          )}
        </div>
        <div className="text-center mt-2">
          <h2 className="font-semibold">{data?.name}</h2>{' '}
          {/* <p className="text-gray-500">Freelance Web Designer</p> */}
        </div>
        <ul className="p-4 mt-2 text-gray-700 flex-col items-center justify-around">
          {Object.entries(data).map(([key, val], index) => {
            if (key === 'name' || key === 'url') return;

            return (
              <li key={index} className="grid grid-cols-2 capitalize">
                <span>{key.replace(/_/g, ' ')}: </span>
                <strong>{val}</strong>
              </li>
            );
          })}
        </ul>
        <div className="p-4 border-t mx-8 mt-2">
          <Button className="w-full" asChild>
            <Link href="/characters">Voltar</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
