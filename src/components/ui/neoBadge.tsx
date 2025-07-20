import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';
import { cn } from '@/lib/utils/ui';

const neoBadgeVariants = cva(
  'inline-block font-mono rounded-md border-2 border-black transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-accent text-accent-foreground hover:bg-accent-dark',
        dark: 'bg-accent-dark text-accent-foreground hover:bg-accent',
        light: 'bg-accent-light text-accent-foreground hover:bg-accent',
        outline:
          'bg-primary text-primary-foreground border-2 border-border hover:bg-accent hover:text-accent-foreground'
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
        sm: 'px-1 py-0.5 sm:px-1.5 sm:py-0.5 md:px-1.5 md:py-0.5 lg:px-2 lg:py-1 xl:px-2 xl:py-1 2xl:px-2.5 2xl:py-1',
        md: 'px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-2 md:py-1 lg:px-2.5 lg:py-1 xl:px-2.5 xl:py-1 2xl:px-3 2xl:py-1.5',
        lg: 'px-2 py-1 sm:px-2.5 sm:py-1 md:px-2.5 md:py-1 lg:px-3 lg:py-1.5 xl:px-3 xl:py-1.5 2xl:px-4 2xl:py-2'
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
