import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'strategic' | 'process' | 'support' | 'default' | 'verified';
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-[var(--badge-radius)] px-3 py-1 text-xs font-medium',
          {
            'bg-primary/10 text-primary': variant === 'strategic',
            'bg-[var(--warning)]/10 text-[var(--warning)]': variant === 'process',
            'bg-[var(--success)]/10 text-[var(--success)]': variant === 'support',
            'bg-accent/20 text-accent-foreground': variant === 'verified',
            'bg-muted text-muted-foreground': variant === 'default',
          },
          className,
        )}
        {...props}
      />
    );
  },
);
Badge.displayName = 'Badge';
