'use client';

import { useState, Fragment, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { dataFetch } from '@/lib/utils';

import {
  Breadcrumb as UIBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const api = process.env.NEXT_PUBLIC_API_HOST;

export function Breadcrumb() {
  const paths = usePathname();
  const pathNames = paths.split('/').filter((path) => path);
  const isRoot = pathNames.length > 0;

  const [labelNew, setLabelNew] = useState('');

  const getLabel = async (param: string) => {
    const value = await dataFetch(`${api}/${param}`);

    if(value?.result?.hasOwnProperty('properties')) {
      setLabelNew(value?.result.properties.name);
    } else {
      setLabelNew(value?.name);
    }
  };

  useEffect(() => {
    if (!pathNames.includes('favorites')) {
      getLabel(`${pathNames.join('/').replace('characters', 'people')}`);
    }
  }, [pathNames]);

  if (!isRoot) return <div />;

  return (
    <UIBreadcrumb className="container flex items-center justify-between mx-auto -mt-6 px-4 md:px-0">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className='capitalize'>home</BreadcrumbLink>
        </BreadcrumbItem>

        {pathNames.map((item, index) => {
          const href = `/${pathNames.slice(0, index + 1).join('/')}`;
          const lastItem = pathNames.length - 1;

          return (
            <Fragment key={index}>
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                {lastItem !== index ? (
                  <BreadcrumbLink href={href} className="capitalize">
                    {item}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="capitalize">
                    {lastItem === index && item.length < 3 ? labelNew : item}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </UIBreadcrumb>
  );
}
