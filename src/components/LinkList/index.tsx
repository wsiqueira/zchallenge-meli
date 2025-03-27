import Link from 'next/link';

import type { LinkListType } from './types';

export function LinkList({ data, hrefReplace, ...props }: LinkListType) {
  return data.map((item, index) => {
    const hrefNew = item.replace(`${hrefReplace?.termFind}`, `${hrefReplace?.termReplace}`);

    return (
      <Link key={index} {...props} href={hrefNew ? hrefNew : item}>
        {hrefNew ? hrefNew : item}
      </Link>
    );
  });
}
