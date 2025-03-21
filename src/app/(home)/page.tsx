'use client';

import Image from 'next/image';

import { useGetData } from '@/hooks';

export default function PageHome() {
  const { data } = useGetData({ param: 'people' });

  console.log('data', data);

  return (
    <main>
      <Image
        className="dark:invert"
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
    </main>
  );
}
