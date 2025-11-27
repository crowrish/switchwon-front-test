import React from 'react';

import { cn } from '@/lib/cn';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'w-[496px] h-[75px]',
          'border rounded-xl',
          'p-6',
          'text-[20px] font-semibold leading-primary',
          'text-custom-gray-600',
          'placeholder:text-gray-400',
          'transition-colors',
          'focus:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error
            ? 'border-buy-primary'
            : 'border-custom-gray-300 focus:border-custom-gray-700',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
