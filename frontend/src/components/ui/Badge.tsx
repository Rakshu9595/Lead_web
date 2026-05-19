import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-secondary text-secondary-foreground',
      success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400', // Qualified
      warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400', // Contacted
      danger: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400', // Lost
      info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400', // New
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';

export const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'New':
      return <Badge variant="info">New</Badge>;
    case 'Contacted':
      return <Badge variant="warning">Contacted</Badge>;
    case 'Qualified':
      return <Badge variant="success">Qualified</Badge>;
    case 'Lost':
      return <Badge variant="danger">Lost</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};
