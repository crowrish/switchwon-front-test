import type { Metadata } from 'next';

import { ExchangeRateTemplate } from '@/components/templates';

export const metadata: Metadata = {
  title: '환율 정보 - Exchange app',
  description: '실시간 환율 확인',
};

export default function ExchangeRatePage() {
  return <ExchangeRateTemplate />;
}
