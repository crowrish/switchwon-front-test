'use client';

import { Suspense, useMemo } from 'react';

import { LoadingSpinner } from '@/components/atoms';
import { ExchangeRateCard, Toast } from '@/components/molecules';
import { ExchangeForm, MyAssetsCard, Navbar } from '@/components/organisms';
import { getErrorMessage } from '@/lib/api/error-handler';
import {
  useCreateOrder,
  useExchangeRates,
  useWallets,
} from '@/lib/hooks/useExchange';
import { useToast } from '@/lib/hooks/useToast';

function ExchangeRateContent() {
  const { data: rates, refetch: refetchRates } = useExchangeRates();
  const { data: wallets } = useWallets();
  const createOrder = useCreateOrder();

  const { toastMessage, showToast } = useToast();

  // 환율 정렬 (exchangeRateId 오름차순)
  const sortedRates = useMemo(() => {
    if (!rates || !Array.isArray(rates)) return [];
    return [...rates].sort((a, b) => a.exchangeRateId - b.exchangeRateId);
  }, [rates]);

  const handleExchange = async (params: {
    action: 'BUY' | 'SELL';
    currencyCode: string;
    amount: number;
    exchangeRateId: number;
  }) => {
    try {
      await createOrder.mutateAsync({
        exchangeRateId: params.exchangeRateId,
        fromCurrency: params.action === 'BUY' ? 'KRW' : params.currencyCode,
        toCurrency: params.action === 'BUY' ? params.currencyCode : 'KRW',
        forexAmount: params.amount,
      });
      showToast('환전이 완료되었습니다!');
    } catch (error) {
      console.error('환전 실패:', error);

      // 환율 불일치 에러인 경우 자동으로 최신 환율 갱신
      if (
        error &&
        typeof error === 'object' &&
        'code' in error &&
        error.code === 'EXCHANGE_RATE_MISMATCH'
      ) {
        await refetchRates();
        showToast('환율이 변경되었습니다. 최신 환율로 다시 시도해주세요.');
        return;
      }

      const errorMessage = getErrorMessage(error);
      showToast(errorMessage);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="px-10 py-10 mx-auto bg-white min-w-container max-w-container">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="mb-2 text-[32px] font-bold leading-primary">
            환율 정보
          </h1>
          <p className="text-[18px] font-medium leading-primary text-custom-gray-600">
            실시간 환율을 확인하고 간편하게 환전하세요.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* 좌측: 환율 카드 + 내 지갑 */}
          <div className="flex flex-col gap-6">
            {/* 환율 카드들 */}
            <div className="grid grid-cols-2 gap-5">
              {sortedRates.map((rate) => (
                <ExchangeRateCard
                  key={rate.exchangeRateId}
                  currency={rate.currency}
                  rate={rate.rate}
                  changePercentage={rate.changePercentage}
                />
              ))}
            </div>

            {/* 내 지갑 */}
            <MyAssetsCard wallets={wallets} />
          </div>

          {/* 우측: 환전 폼 */}
          <ExchangeForm
            exchangeRates={rates}
            wallets={wallets}
            onExchange={handleExchange}
            onRefreshRates={async () => {
              await refetchRates();
            }}
            isLoading={createOrder.isPending}
          />
        </div>
      </main>

      {/* Toast */}
      <Toast message={toastMessage} />
    </div>
  );
}

export const ExchangeRateTemplate = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner
            size="lg"
            message="환율 정보를 불러오는 중입니다..."
          />
        </div>
      }
    >
      <ExchangeRateContent />
    </Suspense>
  );
};
