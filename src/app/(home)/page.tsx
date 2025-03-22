'use client';

// import Image from 'next/image';

import { useGetData } from '@/hooks';

import { CardList } from '@/components';

export default function PageHome() {
  const { data } = useGetData({ param: 'people' });

  return (
    <main>


      <CardList data={data?.results} />

      {/* <Image
        className="dark:invert"
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      /> */}
    </main>
  );
}
