'use client';

import { Button } from '@/components/atoms';
import { cn } from '@/lib/cn';

export interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  confirmText?: string;
}

export const AlertModal = ({
  isOpen,
  onClose,
  title,
  message,
  confirmText = '확인',
}: AlertModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div
        role="dialog"
        className={cn(
          'relative z-10 w-full max-w-md rounded-2xl border border-custom-gray-300 bg-white p-6 shadow-xl',
          'animate-in fade-in zoom-in-95 duration-200'
        )}
      >
        {/* 제목 */}
        <h3 className="mb-4 text-[24px] font-bold leading-primary">
          {title}
        </h3>

        {/* 메시지 */}
        <div className="mb-6 whitespace-pre-line text-[16px] font-medium leading-primary text-custom-gray-600">
          {message}
        </div>

        {/* 버튼 */}
        <Button onClick={onClose} className="w-full">
          {confirmText}
        </Button>
      </div>
    </div>
  );
};
