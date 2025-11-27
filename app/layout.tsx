import type { Metadata } from 'next';

import { pretendard } from '@/lib/fonts';
import { QueryProvider } from '@/lib/providers/QueryProvider';

import './globals.css';

export const metadata: Metadata = {
  title: 'Exchange app',
  description: 'Exchange app for front test',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} antialiased`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
