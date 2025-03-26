'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  NavigationMenu,
  // NavigationMenuContent,
  // NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  // NavigationMenuTrigger,
  // NavigationMenuViewport,
} from '@/components/ui/navigation-menu';

import type { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import type { HeaderNavType, NavItemType } from './types';

export function HeaderNav({ data, ...props }: HeaderNavType & NavigationMenuProps) {
  const pathname = usePathname();

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className='flex-col md:flex-row items-end justify-start'>
        {data.map((item: NavItemType, index: number) => {
          const isActive = item.href === pathname;

          return (
            <NavigationMenuItem key={`navItem-${index}`}>
              <Link href={item.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className="data-[active=true]:font-bold"
                  data-active={isActive}
                >
                  {item.label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
