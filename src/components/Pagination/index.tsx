'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

type PaginationType = {
  pages: number;
  size?: number;
};

export function Pagination({ pages, size = 5 }: PaginationType) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const getParams = (param: string) => {
    return searchParams.get(param) || '1';
  }

  const setParams = (param: string, index: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set(param, index);
    router.push(`?${params.toString()}`);
  };

  const pageCurrent = Number(getParams('page').slice(-1));
  const pageTotal = pages;
  const pagePrevious = pageCurrent - 1;
  const pageNext = pageCurrent + 1;

  console.log('pageCurrent', pageCurrent);
  console.log('pageTotal', pageTotal);
  console.log('pagePrevious', pagePrevious);
  console.log('pageNext', pageNext);
  
  const paginationSize = size/pages
  console.log('paginationSize', paginationSize);

  function handlePaginationPrevious(event: React.MouseEvent<HTMLAnchorElement>) {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    if (pagePrevious < 1) return;
    
    setParams('page', `${pagePrevious}`);
  }

  function handlePaginationNext(event: React.MouseEvent<HTMLAnchorElement>) {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    
    if (pageNext >= pageTotal) return;

    setParams('page', `${pageNext}`);
  }

  return (
    <UIPagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href=""
            onClick={handlePaginationPrevious}
            aria-disabled={pageCurrent <= 1}
            className='aria-[disabled=true]:pointer-events-none aria-[disabled=true]:opacity-25'
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href=""
            onClick={handlePaginationNext}
            aria-disabled={pageCurrent >= pageTotal}
            className='aria-[disabled=true]:pointer-events-none aria-[disabled=true]:opacity-25'
          />
        </PaginationItem>
      </PaginationContent>
    </UIPagination>
  );
}
