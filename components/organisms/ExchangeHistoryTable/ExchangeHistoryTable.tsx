import React from 'react';

import type { Order } from '@/lib/api/types';
import { cn } from '@/lib/cn';
import { formatCurrency } from '@/lib/utils/currency';
import { formatDateTime } from '@/lib/utils/date';

export interface ExchangeHistoryTableProps {
  orders: Order[];
  className?: string;
}

export const ExchangeHistoryTable: React.FC<ExchangeHistoryTableProps> = ({
  orders,
  className,
}) => {
  if (orders.length === 0) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <p className="text-[18px] font-medium text-custom-gray-500">
          환전 내역이 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-custom-gray-300',
        className
      )}
    >
      {/* 헤더 */}
      <div className="grid grid-cols-5 gap-4 px-6 py-4 border-b border-custom-gray-300 bg-custom-gray-100">
        <div className="text-center text-[16px] font-bold text-custom-gray-700">
          거래 ID
        </div>
        <div className="text-center text-[16px] font-bold text-custom-gray-700">
          거래 일시
        </div>
        <div className="text-right text-[16px] font-bold text-custom-gray-700">
          매수 금액
        </div>
        <div className="text-right text-[16px] font-bold text-custom-gray-700">
          체결 환율
        </div>
        <div className="text-right text-[16px] font-bold text-custom-gray-700">
          매도 금액
        </div>
      </div>

      {/* 데이터 */}
      <div className="divide-y divide-custom-gray-300">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="grid grid-cols-5 gap-4 px-6 py-4 transition-colors hover:bg-custom-gray-100"
          >
            {/* 거래 ID */}
            <div className="flex items-center justify-center text-[16px] font-medium text-custom-gray-700">
              {order.orderId}
            </div>

            {/* 거래 일시 */}
            <div className="flex items-center justify-center text-[16px] font-medium text-custom-gray-600">
              {formatDateTime(order.orderedAt)}
            </div>

            {/* 매수 금액 */}
            <div className="flex items-center justify-end text-[16px] font-semibold text-custom-gray-700">
              {formatCurrency(order.toAmount, order.toCurrency)}
            </div>

            {/* 체결 환율 */}
            <div className="flex items-center justify-end text-[16px] font-medium text-custom-gray-600">
              {order.appliedRate.toLocaleString('ko-KR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>

            {/* 매도 금액 */}
            <div className="flex items-center justify-end text-[16px] font-semibold text-custom-gray-700">
              {formatCurrency(order.fromAmount, order.fromCurrency)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
