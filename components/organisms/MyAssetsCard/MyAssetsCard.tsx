import type { WalletsResponse } from '@/lib/api/types';
import { cn } from '@/lib/cn';
import { formatCurrency } from '@/lib/utils/currency';

export interface MyAssetsCardProps {
  wallets?: WalletsResponse;
  className?: string;
}

export const MyAssetsCard = ({ wallets, className }: MyAssetsCardProps) => {
  const walletList = wallets?.wallets || [];
  const totalBalanceKrw = wallets?.totalKrwBalance || 0;
  return (
    <div
      className={cn(
        'flex h-full flex-col gap-6 rounded-xl border border-custom-gray-300 bg-custom-gray-0 p-6',
        className
      )}
    >
      {/* 제목 */}
      <h3 className="text-[24px] font-bold leading-primary">내 지갑</h3>

      {/* 각 통화별 잔액 */}
      <div className="flex flex-col gap-4">
        {walletList.length > 0 ? (
          walletList.map((wallet) => (
            <div
              key={wallet.walletId}
              className="flex items-center justify-between"
            >
              <span className="text-[18px] font-medium leading-primary text-custom-gray-600">
                {wallet.currency}
              </span>
              <span className="text-[20px] font-semibold leading-primary text-custom-gray-600">
                {formatCurrency(wallet.balance, wallet.currency)}
              </span>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center py-4">
            <span className="text-[16px] font-medium leading-primary text-custom-gray-600">
              지갑이 비어있습니다
            </span>
          </div>
        )}
      </div>

      {/* 구분선 */}
      <div className="h-px mt-auto bg-custom-gray-300" />

      {/* 총 보유 자산 */}
      <div className="flex items-center justify-between">
        <span className="text-[20px] font-medium leading-primary text-custom-gray-600">
          총 보유 자산
        </span>
        <span className="text-[20px] font-bold leading-primary text-brand-blue">
          ₩ {totalBalanceKrw.toLocaleString('ko-KR')}
        </span>
      </div>
    </div>
  );
};
