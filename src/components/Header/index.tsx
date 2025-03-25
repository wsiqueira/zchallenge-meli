'use client';

import { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import Image from 'next/image';

import { HeaderNav } from './HeaderNav';

const headerNavData = [
  { href: '/characters', label: 'Characters' },
  { href: '/planets', label: 'Planets' },
  { href: '/favorites', label: 'Favorites' },
];

export function Header() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([event]) =>
        event.target.toggleAttribute(
          'aria-checked',
          event.intersectionRatio < 1
        ),
      { threshold: [1] }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <header
      ref={ref}
      className={twMerge(
        'p-4 md:p-8 bg-neutral-100 shadow-sm',
        'sticky -top-[1px] z-10',
        'transition duration-200 ease-in-out',
        'aria-[checked]:p-4'
      )}
      aria-checked={false}
    >
      <div className="container flex items-center gap-4 mx-auto">
        <Link href="/" className="max-w-[96px] max-h-[46px] overflow-hidden">
          <Image
            src="/logo_star-wars.png"
            width={96}
            height={96}
            alt="Star Wars"
            style={{objectPosition: '0 calc(-96px / 4)'}}
          />
        </Link>

        <HeaderNav data={headerNavData} />
      </div>
    </header>
  );
}
