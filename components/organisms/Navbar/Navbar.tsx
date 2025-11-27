'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { Button } from '@/components/atoms';
import { cn } from '@/lib/cn';
import { useAuthStore } from '@/lib/stores/auth-store';

const NAV_LINKS = [
  { href: '/exchange-rate', label: '환전 하기' },
  { href: '/exchange-history', label: '환전 내역' },
];

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const isActive = (path: string) => pathname === path;

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <nav className="w-full bg-white border-b border-custom-gray-0">
      <div className="mx-auto flex h-[75px] min-w-container max-w-container items-center justify-between gap-2.5 px-10 py-4">
        {/* 좌측: 로고 + 타이틀 */}
        <div className="flex items-center gap-1.5">
          <Image
            src="/images/ic_rss.svg"
            alt="RSS Icon"
            width={24}
            height={24}
          />
          <span className="text-[24px] font-bold leading-primary">
            Exchange app
          </span>
        </div>

        {/* 우측 */}
        <div className="flex items-center gap-10">
          {/* 링크들 */}
          <div className="flex items-center gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex h-[43px] items-center justify-center gap-2.5 rounded-xl px-3 py-2',
                  'text-center text-[20px] font-bold leading-primary',
                  'transition-colors',
                  isActive(link.href)
                    ? 'text-cta-hover'
                    : 'text-custom-gray-500'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* 로그아웃 버튼 */}
          <Button
            variant="primary"
            className="h-[43px] w-[94px] gap-2.5 px-3 py-2 text-[20px] font-semibold leading-primary"
            onClick={handleLogout}
          >
            Log out
          </Button>
        </div>
      </div>
    </nav>
  );
};
