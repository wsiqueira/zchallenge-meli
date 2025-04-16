import Link from 'next/link';

import { dataFetch } from '@/lib/utils';

import type { LinkListType } from './types';

export function LinkList({ data, hrefReplace, ...props }: LinkListType) {
  return data?.map(async (item, index) => {
    const label = await dataFetch(item);
    const hrefNew = item.replace(
      `${hrefReplace?.termFind}`,
      `${hrefReplace?.termReplace}`
    );

    return (
      <Link key={index} {...props} href={hrefNew ? hrefNew : item}>
        {(label.name && label.name) || (label.title && label.title) || item}
      </Link>
    );
  });
}
