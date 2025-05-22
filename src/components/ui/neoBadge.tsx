import { cn } from '@/lib/utils/ui';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import type * as React from 'react';

const neoBadgeVariants = cva(
  'inline-block px-3 py-1.5 font-mono rounded-md border-2 border-black transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-accent text-atext hover:bg-accent-dark',
        dark: 'bg-accent-dark text-atext hover:bg-accent',
        light: 'bg-accent-light text-atext hover:bg-accent',
        outline: 'bg-bg text-mtext border-2 border-accent hover:bg-accent hover:text-atext'
      },
      rotation: {
        none: '',
        slight: 'rotate-slight',
        negative: 'rotate-negative',
        medium: 'rotate-medium',
        negativeMedium: 'rotate-negative-medium'
      },
      interactive: {
        none: '',
        grow: 'hover-grow',
        lift: 'hover-lift',
        bounce: 'hover-bounce',
        wiggle: 'hover-wiggle'
      },
      shadow: {
        none: '',
        sm: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg'
      },
      size: {
        sm: 'px-2 py-1 text-xs md:text-sm',
        md: 'px-3 py-1.5 text-sm md:text-base',
        lg: 'px-4 py-2 text-base md:text-lg'
      }
    },
    defaultVariants: {
      variant: 'default',
      rotation: 'none',
      interactive: 'none',
      shadow: 'sm',
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
