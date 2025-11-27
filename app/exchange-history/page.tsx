import type { Metadata } from 'next';

import { ExchangeHistoryTemplate } from '@/components/templates';

export const metadata: Metadata = {
  title: '환전 내역 - Exchange app',
  description: '환전 내역',
};

export default function ExchangeHistoryPage() {
  return <ExchangeHistoryTemplate />;
}
