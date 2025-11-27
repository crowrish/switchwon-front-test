import { cn } from '@/lib/cn';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'lg';
  message?: string;
  className?: string;
}

export const LoadingSpinner = ({
  size = 'sm',
  message,
  className,
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    lg: 'h-12 w-12 border-3',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-custom-gray-300 border-t-brand-blue',
          sizeClasses[size]
        )}
      />
      {message && (
        <p className="mt-3 text-[16px] font-medium leading-primary text-custom-gray-600">
          {message}
        </p>
      )}
    </div>
  );
};
