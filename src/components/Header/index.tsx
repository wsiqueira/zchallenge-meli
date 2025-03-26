'use client';

import { useState, useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

import { HeaderNav } from './HeaderNav';

const headerNavData = [
  { href: '/characters', label: 'Characters' },
  { href: '/planets', label: 'Planets' },
  { href: '/favorites', label: 'Favorites' },
];

export function Header() {
  const ref = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => setIsOpen(!isOpen);

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
      <div className="container flex items-center justify-between md:justify-start gap-4 mx-auto">
        <div className="w-[42px] md:hidden">
          <span className="sr-only">spacer</span>
        </div>

        <Link href="/" className="max-w-[96px] max-h-[46px] overflow-hidden">
          <Image
            src="/logo_star-wars.png"
            width={96}
            height={96}
            alt="Star Wars"
            className='relative z-20'
            style={{ objectPosition: '0 calc(-96px / 4)' }}
          />
        </Link>

        <HeaderNav
          data={headerNavData}
          className={twMerge(
            'bg-neutral-100 h-screen md:h-auto p-4 md:p-0 absolute md:static top-0 right-0 z-10',
            'transition-transform duration-200 translate-x-full md:translate-x-0',
            'aria-[checked=true]:translate-x-0',
          )}
          
          aria-checked={isOpen}
        />

        <Button
          variant="outline"
          className="md:hidden relative z-20"
          onClick={handleMenuClick}
        >
          {isOpen ? <X /> : <Menu />}
        </Button>
      </div>
    </header>
  );
}
