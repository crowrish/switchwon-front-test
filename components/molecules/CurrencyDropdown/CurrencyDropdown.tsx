'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import type { ExchangeRate } from '@/lib/api/types';
import { cn } from '@/lib/cn';

export interface CurrencyDropdownProps {
  exchangeRates: ExchangeRate[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const CURRENCY_FLAG_IMAGES: Record<string, string> = {
  USD: '/images/ic_usa.svg',
  JPY: '/images/ic_japan.svg',
};

const CURRENCY_LABELS: Record<string, string> = {
  USD: '미국 USD',
  JPY: '일본 JPY',
};

export const CurrencyDropdown = ({
  exchangeRates,
  value,
  onChange,
  className,
}: CurrencyDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedRate = exchangeRates.find((rate) => rate.currency === value);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      {/* 선택된 항목 */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center focus:outline-none"
      >
        <Image
          src={CURRENCY_FLAG_IMAGES[selectedRate?.currency || 'USD']}
          alt={`${selectedRate?.currency || 'USD'} flag`}
          width={24}
          height={24}
        />
        <span className="ml-2 text-[18px] font-bold leading-primary text-cta-hover">
          {CURRENCY_LABELS[selectedRate?.currency || 'USD']}
        </span>
        <Image
          src={isOpen ? '/images/ic_arrow_up.svg' : '/images/ic_arrow_down.svg'}
          alt={isOpen ? 'arrow up' : 'arrow down'}
          width={28}
          height={28}
          className="ml-1"
        />
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-[140px] overflow-hidden rounded-xl border border-custom-gray-300 bg-white shadow-lg">
          {exchangeRates.map((rate) => (
            <button
              key={rate.currency}
              type="button"
              onClick={() => handleSelect(rate.currency)}
              className={cn(
                'flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-custom-gray-100',
                rate.currency === value && 'bg-custom-gray-100'
              )}
            >
              <Image
                src={CURRENCY_FLAG_IMAGES[rate.currency]}
                alt={`${rate.currency} flag`}
                width={20}
                height={20}
              />
              <span className="text-[14px] font-medium leading-primary text-custom-gray-700">
                {CURRENCY_LABELS[rate.currency]}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
