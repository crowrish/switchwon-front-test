'use client';

import { Button } from '@/components/atoms';
import { cn } from '@/lib/cn';

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = '확인',
  cancelText = '취소',
  isLoading = false,
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={isLoading ? undefined : onClose}
      />

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

        {/* 버튼 그룹 */}
        <div className="flex gap-3">
          <Button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 bg-white border border-custom-gray-300 text-custom-gray-700 hover:bg-custom-gray-0"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};
