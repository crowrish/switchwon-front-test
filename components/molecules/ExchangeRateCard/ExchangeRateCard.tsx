import React from 'react';

import { cn } from '@/lib/cn';
import { getCurrencyName } from '@/lib/utils/currency';
import { formatPercentage } from '@/lib/utils/number';

export interface ExchangeRateCardProps {
  currency: 'KRW' | 'USD' | 'JPY';
  rate: number;
  changePercentage: number;
  className?: string;
}

export const ExchangeRateCard = ({
  currency,
  rate,
  changePercentage,
  className,
}: ExchangeRateCardProps) => {
  const isPositive = changePercentage >= 0;

  return (
    <div
      className={cn(
        'flex flex-col gap-2 rounded-xl border border-custom-gray-300 bg-white p-6',
        className
      )}
    >
      {/* 상단: 통화 코드와 이름 */}
      <div className="flex items-center justify-between">
        <span className="text-[20px] font-bold leading-primary">
          {currency}
        </span>
        <span className="text-[14px] font-medium leading-primary text-custom-gray-600">
          {getCurrencyName(currency)}
        </span>
      </div>

      {/* 중단: 환율 */}
      <div className="flex items-end">
        <span className="text-[28px] font-bold leading-primary">
          {rate.toLocaleString('ko-KR')} KRW
        </span>
      </div>

      {/* 하단: 변동률 */}
      <div className="flex items-center">
        <div
          className={cn(
            'flex items-center gap-1 text-[16px] font-semibold leading-primary',
            isPositive ? 'text-red-500' : 'text-blue-500'
          )}
        >
          <span>{isPositive ? '▲' : '▼'}</span>
          <span>{formatPercentage(changePercentage)}</span>
        </div>
      </div>
    </div>
  );
};
