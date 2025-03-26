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

  if(!isRoot) return <div className="container flex items-center justify-between mx-auto -mt-6" />

  return (
    <UIBreadcrumb className="container flex items-center justify-between mx-auto -mt-6 px-4 md:px-0">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        {pathNames.map((item, index) => {
          const href = `/${pathNames.slice(0, index + 1).join('/')}`;
          const lastItem = pathNames.length - 1;

          return (
            <Fragment key={index}>
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                {lastItem !== index ? (
                  <BreadcrumbLink href={href} className='capitalize'>{item}</BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className='capitalize'>{item}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </UIBreadcrumb>
  );
}
