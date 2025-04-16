import Link from 'next/link';

import { dataFetch } from '@/lib/utils';

import type { LinkListType } from './types';

const api = process.env.NEXT_PUBLIC_API_HOST;
const isTech = api?.includes('tech');

export function LinkList({ data, hrefReplace, ...props }: LinkListType) {
  return data?.map(async (item, index) => {
    const label = await dataFetch(item).then((data) => {
      return {
        name: isTech ? data.result.properties.name : data.name,
        title: data.title,
      };
    });

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
