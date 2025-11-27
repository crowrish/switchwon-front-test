import React from 'react';

import { cn } from '@/lib/cn';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'hover' | 'pressed' | 'primary';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2.5',
          'w-[496px] h-[77px]',
          'px-2.5 py-6',
          'rounded-xl',
          'text-[22px] font-bold leading-primary',
          'transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-cta text-white hover:bg-cta-hover active:bg-cta-pressed':
              variant === 'default',
            'bg-cta-hover text-white': variant === 'hover',
            'bg-cta-pressed text-white': variant === 'pressed',
            'bg-brand-blue text-white hover:opacity-90 active:opacity-80':
              variant === 'primary',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
