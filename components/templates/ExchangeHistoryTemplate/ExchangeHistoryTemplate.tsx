'use client';

import { Suspense, useMemo, useState } from 'react';

import { LoadingSpinner } from '@/components/atoms';
import { Pagination } from '@/components/molecules';
import { ExchangeHistoryTable, Navbar } from '@/components/organisms';
import { useOrders } from '@/lib/hooks/useExchange';

const ITEMS_PER_PAGE = 10;

function ExchangeHistoryContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: orders } = useOrders();

  const { paginatedOrders, totalPages } = useMemo(() => {
    if (!orders) {
      return { paginatedOrders: [], totalPages: 0 };
    }

    const sortedOrders = [...orders].sort((a, b) => {
      return new Date(b.orderedAt).getTime() - new Date(a.orderedAt).getTime();
    });

    const total = Math.ceil(sortedOrders.length / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginated = sortedOrders.slice(startIndex, endIndex);

    return { paginatedOrders: paginated, totalPages: total };
  }, [orders, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="px-10 py-10 mx-auto bg-white min-w-container max-w-container">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="mb-2 text-[32px] font-bold leading-primary">
            환전 내역
          </h1>
          <p className="text-[18px] font-medium leading-primary text-custom-gray-600">
            환전 내역을 확인하실 수 있어요.
          </p>
        </div>

        {/* 테이블 */}
        <ExchangeHistoryTable orders={paginatedOrders} />

        {/* 페이지네이션 */}
        {totalPages > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            className="mt-8"
          />
        )}
      </main>
    </div>
  );
}

export const ExchangeHistoryTemplate = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner
            size="lg"
            message="환전 내역을 불러오는 중입니다..."
          />
        </div>
      }
    >
      <ExchangeHistoryContent />
    </Suspense>
  );
};
