import type { LinkProps } from 'next/link';

export type LinkListType = LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    data: string[];
    hrefReplace?: {
      termFind: string;
      termReplace: string;
    };
  };
