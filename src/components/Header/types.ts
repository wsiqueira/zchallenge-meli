import type { LinkProps } from 'next/link';

export type NavItemType = LinkProps & {
  label: string;
};

export type HeaderNavType = {
  data: NavItemType[];
};
