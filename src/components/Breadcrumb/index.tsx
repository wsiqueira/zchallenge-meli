'use client';

import { Fragment } from 'react';
import { usePathname } from 'next/navigation';

import {
  Breadcrumb as UIBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export function Breadcrumb() {
  const paths = usePathname();
  const pathNames = paths.split('/').filter((path) => path);
  const isRoot = pathNames.length > 0;

  return (
    <UIBreadcrumb className="container flex items-center justify-between mx-auto -mt-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          {isRoot ? (
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          ) : (
            <BreadcrumbPage>Characters</BreadcrumbPage>
          )}
        </BreadcrumbItem>

        {pathNames.map((item, index) => {
          const href = `/${pathNames.slice(0, index + 1).join('/')}`;
          const lastItem = pathNames.length - 1;

          return (
            <Fragment key={index}>
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                {lastItem !== index ? (
                  <BreadcrumbLink href={href}>{item}</BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{item}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </UIBreadcrumb>
  );
}
