import { cn } from '@/lib/utils/ui';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import type * as React from 'react';

const neoBadgeVariants = cva(
  'inline-block px-3 py-1.5 font-medium rounded-md border-2 border-black transition-all',
  {
    variants: {
      variant: {
        default: 'bg-accent text-atext hover:bg-accent-dark',
        dark: 'bg-accent-dark text-atext hover:bg-accent',
        light: 'bg-accent-light text-atext hover:bg-accent',
        outline:
          'bg-transparent text-mtext border-2 border-black hover:bg-accent-light hover:text-atext'
      },
      rotation: {
        none: '',
        slight: 'rotate-1',
        negative: '-rotate-1',
        medium: 'rotate-2',
        negativeMedium: '-rotate-2'
      },
      interactive: {
        none: '',
        grow: 'hover:scale-105',
        lift: 'hover:-translate-y-0.5',
        bounce: 'hover:-translate-y-1 hover:shadow-lg',
        wiggle: 'hover:rotate-3 hover:scale-105'
      },
      shadow: {
        none: '',
        sm: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg'
      },
      size: {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base'
      }
    },
    defaultVariants: {
      variant: 'default',
      rotation: 'none',
      interactive: 'none',
      shadow: 'none',
      size: 'md'
    }
  }
);

export interface NeoBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof neoBadgeVariants> {
  asChild?: boolean;
}

function NeoBadge({
  className,
  variant,
  rotation,
  interactive,
  shadow,
  size,
  asChild = false,
  ...props
}: NeoBadgeProps) {
  const Comp = asChild ? Slot : 'span';
  return (
    <Comp
      className={cn(neoBadgeVariants({ variant, rotation, interactive, shadow, size }), className)}
      {...props}
    />
  );
}

export { NeoBadge, neoBadgeVariants };
