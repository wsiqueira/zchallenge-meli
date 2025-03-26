'use client';

import { useState } from 'react';
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
  itemsTotal: number;
  itemsPerPage?: number;
};

export function Pagination({
  itemsTotal = 0,
  itemsPerPage = 10,
}: PaginationType) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const getParams = (param: string) => {
    return searchParams.get(param) || '1';
  };

  const setParams = (param: string, value: string) => {
    const params = new URLSearchParams(window.location.search);

    if (value !== '') {
      params.set(param, value);
    } else {
      params.delete(param);
    }

    router.push(`?${params.toString()}`);
  };

  const [pageCurrent, setCurrentPage] = useState(
    Number(getParams('page').slice(-1))
  );
  const totalPages = Math.ceil(itemsTotal / itemsPerPage);

  const handlePageChange = (
    event: React.MouseEvent<HTMLAnchorElement>,
    index: number
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (index < 1 || index > totalPages) return;
    setParams('page', index.toString());
    setCurrentPage(index);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const leftBound = pageCurrent - 2;
    const rightBound = pageCurrent + 2;

    for (let page = 1; page <= totalPages; page++) {
      if (
        page === 1 ||
        page === totalPages ||
        (page >= leftBound && page <= rightBound)
      ) {
        pages.push(page);
      } else if (
        (page === leftBound - 1 && leftBound > 2) ||
        (page === rightBound + 1 && rightBound < totalPages - 1)
      ) {
        pages.push('...');
      }
    }

    return pages.map((page, index) => {
      if (page === '...') {
        return (
          <PaginationItem key={index}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      return (
        <PaginationItem key={index}>
          <PaginationLink
            href=""
            onClick={(event) => handlePageChange(event, Number(page))}
            isActive={pageCurrent === page}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    });
  };

  return (
    <UIPagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href=""
            onClick={(event) => handlePageChange(event, pageCurrent - 1)}
            aria-disabled={pageCurrent === 1}
            className="aria-[disabled=true]:pointer-events-none aria-[disabled=true]:opacity-25"
          />
        </PaginationItem>

        {renderPageNumbers()}

        <PaginationItem>
          <PaginationNext
            href=""
            onClick={(event) => handlePageChange(event, pageCurrent + 1)}
            aria-disabled={pageCurrent === totalPages}
            className="aria-[disabled=true]:pointer-events-none aria-[disabled=true]:opacity-25"
          />
        </PaginationItem>
      </PaginationContent>
    </UIPagination>
  );
}
