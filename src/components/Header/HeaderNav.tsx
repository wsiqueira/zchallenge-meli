'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import type { HeaderNavType, NavItemType } from './types';

export function HeaderNav({ data }: HeaderNavType) {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex items-center justify-center gap-2">
        {data.map((item: NavItemType, index: number) => {
          return (
            <li key={`navItem-${index}`}>
              <Link
                href={item.href}
                className="aria-[checked=true]:underline"
                aria-checked={item.href === pathname}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
