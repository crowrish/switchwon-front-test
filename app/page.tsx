import type { Metadata } from 'next';

import { LoginTemplate } from '@/components/templates';

export const metadata: Metadata = {
  title: '로그인 - Exchange app',
  description: '로그인 페이지',
};

export default function Home() {
  return <LoginTemplate />;
}
