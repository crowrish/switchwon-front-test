'use client';

export interface ToastProps {
  message: string;
}

export const Toast = ({ message }: ToastProps) => {
  if (!message) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="px-6 py-4 duration-200 shadow-2xl pointer-events-auto animate-in fade-in zoom-in-95 rounded-xl bg-custom-gray-700">
        <p className="text-[16px] font-medium leading-primary text-white">
          {message}
        </p>
      </div>
    </div>
  );
};
