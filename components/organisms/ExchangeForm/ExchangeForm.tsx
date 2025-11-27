'use client';

import { useState } from 'react';

import Image from 'next/image';

import { Button, Input, LoadingSpinner } from '@/components/atoms';
import {
  AlertModal,
  ConfirmModal,
  CurrencyDropdown,
} from '@/components/molecules';
import type { ExchangeRate, WalletsResponse } from '@/lib/api/types';
import { cn } from '@/lib/cn';
import { getCurrencyUnit } from '@/lib/utils/currency';
import { formatNumber, parseFormattedNumber } from '@/lib/utils/number';
import { validateAmount, validateBalance } from '@/lib/utils/validation';

export interface ExchangeFormProps {
  exchangeRates?: ExchangeRate[];
  wallets?: WalletsResponse;
  onExchange: (params: {
    action: 'BUY' | 'SELL';
    currencyCode: string;
    amount: number;
    exchangeRateId: number;
  }) => void;
  onRefreshRates?: () => Promise<void>;
  isLoading?: boolean;
  className?: string;
}

export const ExchangeForm = ({
  exchangeRates = [],
  wallets,
  onExchange,
  onRefreshRates,
  isLoading,
  className,
}: ExchangeFormProps) => {
  const [action, setAction] = useState<'BUY' | 'SELL'>('BUY');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [amount, setAmount] = useState('');
  const [displayAmount, setDisplayAmount] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const hasRates = exchangeRates.length > 0;

  const handleAmountChange = (value: string) => {
    let cleanValue = parseFormattedNumber(value);

    // 앞의 0 제거
    if (
      cleanValue.length > 1 &&
      cleanValue[0] === '0' &&
      cleanValue[1] !== '.'
    ) {
      cleanValue = cleanValue.replace(/^0+/, '');
    }

    // JPY: 소수점 불가, 그외 통화: 소수점 2자리까지
    const maxDecimalPlaces = selectedCurrency === 'JPY' ? 0 : 2;

    if (cleanValue.includes('.')) {
      if (maxDecimalPlaces === 0) {
        // JPY는 소수점 입력 불가
        cleanValue = cleanValue.split('.')[0];
      } else {
        const [integer, decimal] = cleanValue.split('.');
        if (decimal && decimal.length > maxDecimalPlaces) {
          cleanValue = `${integer}.${decimal.slice(0, maxDecimalPlaces)}`;
        }
      }
    }

    const numValue = parseFloat(cleanValue);

    if (cleanValue === '' || (numValue >= 0 && numValue <= 999999999)) {
      setAmount(cleanValue);
      setDisplayAmount(formatNumber(cleanValue));
    }
  };

  const currentRate = exchangeRates.find(
    (rate) => rate.currency === selectedCurrency
  );

  const calculatedAmount = amount
    ? (parseFloat(amount) * (currentRate?.rate || 0)).toFixed(0)
    : '0';

  const handleExchangeClick = async () => {
    if (!amount || !currentRate) return;

    const inputAmount = parseFloat(amount);

    // 유효성 검증
    const amountValidation = validateAmount(amount, selectedCurrency);
    if (!amountValidation.isValid) {
      setAlertMessage(amountValidation.message || '');
      setIsAlertOpen(true);
      return;
    }

    const requiredKrw = inputAmount * currentRate.rate;

    // 잔액 검증
    const balanceValidation = validateBalance(
      action,
      wallets,
      selectedCurrency,
      inputAmount,
      requiredKrw
    );

    if (!balanceValidation.isValid) {
      setAlertMessage(balanceValidation.message || '');
      setIsAlertOpen(true);
      return;
    }

    // 최신 환율 재조회
    if (onRefreshRates) {
      setIsRefreshing(true);
      try {
        await onRefreshRates();
      } catch (error) {
        console.error('환율 재조회 실패:', error);
      } finally {
        setIsRefreshing(false);
      }
    }

    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    if (!amount || !currentRate) return;

    onExchange({
      action,
      currencyCode: selectedCurrency,
      amount: parseFloat(amount),
      exchangeRateId: currentRate.exchangeRateId,
    });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // 모달 메시지 생성
  const getConfirmMessage = () => {
    if (!currentRate || !amount) return '';

    const currencyName = getCurrencyUnit(selectedCurrency);
    const amountStr = parseFloat(amount).toLocaleString('ko-KR');
    const krwAmount = parseInt(calculatedAmount).toLocaleString('ko-KR');
    const rateStr = currentRate.rate.toLocaleString('ko-KR');

    if (action === 'BUY') {
      return `${amountStr} ${currencyName}를 구매하시겠습니까?\n\n필요 금액: ₩ ${krwAmount}\n적용 환율: 1 ${selectedCurrency} = ${rateStr} 원`;
    } else {
      return `${amountStr} ${currencyName}를 판매하시겠습니까?\n\n받을 금액: ₩ ${krwAmount}\n적용 환율: 1 ${selectedCurrency} = ${rateStr} 원`;
    }
  };

  return (
    <div
      className={cn(
        'flex flex-col gap-6 rounded-xl border border-custom-gray-300 bg-custom-gray-0 p-6',
        className
      )}
    >
      {!hasRates && (
        <div className="flex items-center justify-center p-4 rounded-xl bg-custom-gray-100">
          <LoadingSpinner
            size="sm"
            message="환율 정보를 불러오는 중입니다..."
          />
        </div>
      )}

      {/* 통화 선택 드롭다운 */}
      <CurrencyDropdown
        exchangeRates={exchangeRates}
        value={selectedCurrency}
        onChange={setSelectedCurrency}
      />

      {/* 구매/판매 탭 */}
      <div className="flex h-[83px] w-full gap-3 rounded-2xl border border-[#D0D6DB] bg-white p-3">
        <button
          onClick={() => setAction('BUY')}
          className={cn(
            'h-[59px] flex-1 rounded-lg text-[18px] font-bold leading-primary transition-colors',
            action === 'BUY'
              ? 'bg-buy-primary text-white'
              : 'bg-transparent text-buy-disabled'
          )}
        >
          살래요
        </button>
        <button
          onClick={() => setAction('SELL')}
          className={cn(
            'h-[59px] flex-1 rounded-lg text-[18px] font-bold leading-primary transition-colors',
            action === 'SELL'
              ? 'bg-sell-primary text-white'
              : 'bg-transparent text-sell-disabled'
          )}
        >
          팔래요
        </button>
      </div>

      {/* 매수 금액 */}
      <div className="flex flex-col gap-3">
        <label className="text-[18px] font-semibold leading-primary text-custom-gray-600">
          매수 금액
        </label>
        <div className="relative">
          <Input
            type="text"
            value={displayAmount}
            onChange={(e) => handleAmountChange(e.target.value)}
            placeholder="0"
            className="w-full text-right pr-28"
            disabled={!hasRates}
          />
          <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[20px] font-medium leading-primary text-custom-gray-600">
            {selectedCurrency === 'USD' ? '달러' : '엔화'}{' '}
            {action === 'BUY' ? '사기' : '팔기'}
          </span>
        </div>
      </div>

      {/* 환전 아이콘 */}
      <div className="flex justify-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-[20px] bg-[#D0D6DB]">
          <Image
            src="/images/ic_arrow_down.svg"
            alt="exchange arrow"
            width={20}
            height={20}
            className="brightness-0 invert"
          />
        </div>
      </div>

      {/* 필요 원화 */}
      <div className="flex flex-col gap-3">
        <label className="text-[18px] font-semibold leading-primary text-custom-gray-600">
          필요 원화
        </label>
        <div className="flex items-center justify-between px-6 py-5 border rounded-xl bg-custom-gray-100 border-custom-gray-500">
          <span className="flex-1 text-right text-[20px] font-bold leading-primary text-custom-gray-600">
            {parseInt(calculatedAmount).toLocaleString('ko-KR')}
          </span>
          <span
            className={cn(
              'ml-2 text-[20px] font-semibold leading-primary',
              action === 'BUY' ? 'text-buy-primary' : 'text-brand-blue'
            )}
          >
            {action === 'BUY' ? '원 필요해요' : '원 받을 수 있어요'}
          </span>
        </div>
      </div>

      {/* 적용 환율 */}
      <div className="flex items-center justify-between text-[16px] font-medium leading-primary text-custom-gray-600">
        <span>적용 환율</span>
        <span>
          1 {selectedCurrency} = {currentRate?.rate.toLocaleString('ko-KR')} 원
        </span>
      </div>

      {/* 환전하기 버튼 */}
      <Button
        onClick={handleExchangeClick}
        disabled={!hasRates || !amount || isLoading || isRefreshing}
        className="w-full"
      >
        {isRefreshing ? '환율 확인 중...' : '환전하기'}
      </Button>

      {/* 확인 모달 */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        title="환전 확인"
        message={getConfirmMessage()}
        confirmText="환전하기"
        cancelText="취소"
        isLoading={isLoading}
      />

      {/* 알림 모달 */}
      <AlertModal
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        title="잔액 부족"
        message={alertMessage}
      />
    </div>
  );
};
