import React from 'react';

import Image from 'next/image';

import { cn } from '@/lib/cn';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  // 최대 10개 페이지만 표시
  const maxVisible = 10;

  const getVisiblePages = () => {
    if (totalPages <= maxVisible) {
      // 전체 페이지가 10개 이하면 모두 표시
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // 현재 페이지를 중심으로 10개 표시
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + maxVisible - 1);

    // end가 totalPages에 도달하면 start 조정
    if (end === totalPages) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      {/* 이전 버튼 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-lg',
          'transition-colors',
          currentPage === 1
            ? 'cursor-not-allowed opacity-30'
            : 'hover:bg-custom-gray-100'
        )}
      >
        <Image
          src="/images/ic_arrow_prev.svg"
          alt="이전"
          width={24}
          height={24}
        />
      </button>

      {/* 페이지 번호 - 최대 10개까지 표시 */}
      {visiblePages.map((pageNum) => {
        const isActive = pageNum === currentPage;

        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-lg',
              'text-[16px] font-medium transition-colors',
              isActive
                ? 'bg-brand-blue text-white'
                : 'text-custom-gray-700 hover:bg-custom-gray-100'
            )}
          >
            {pageNum}
          </button>
        );
      })}

      {/* 다음 버튼 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-lg',
          'transition-colors',
          currentPage === totalPages
            ? 'cursor-not-allowed opacity-30'
            : 'hover:bg-custom-gray-100'
        )}
      >
        <Image
          src="/images/ic_arrow_next.svg"
          alt="다음"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
};
