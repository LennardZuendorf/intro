import { type VariantProps, cva } from 'class-variance-authority';

import type * as React from 'react';

import { cn } from '@/lib/utils/ui';

const badgeVariants = cva(
  'inline-flex items-center rounded-base border-2 border-border px-2.5 font-base py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-accent-light hover:text-accent-foreground',
        revered:
          'bg-primary text-primary-foreground hover:bg-accent-light hover:text-accent-foreground',
        accent: 'bg-accent text-accent-foreground hover:bg-accent-dark'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
