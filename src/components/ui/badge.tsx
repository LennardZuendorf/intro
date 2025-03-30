import { type VariantProps, cva } from 'class-variance-authority';

import type * as React from 'react';

import { cn } from '@/lib/utils/ui';

const badgeVariants = cva(
  'inline-flex items-center rounded-base border-2 border-border px-2.5 font-base py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-main text-mtext hover:bg-accent-light hover:text-atext',
        revered: 'bg-bg text-mtext hover:bg-accent-light hover:text-atext',
        accent: 'bg-accent text-atext hover:bg-accent-dark'
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
