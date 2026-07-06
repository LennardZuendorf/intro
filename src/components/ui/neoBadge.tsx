import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils/ui';
import { L, M, S } from './typography';

const neoBadgeVariants = cva(
  'inline-flex items-center font-head font-semibold rounded-base border-2 border-border outline-hidden transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary-hover',
        dark: 'bg-primary-hover text-primary-foreground hover:bg-primary',
        light: 'bg-primary-light text-primary-foreground hover:bg-primary',
        outline: 'bg-primary text-primary-foreground hover:bg-primary-hover'
      },
      rotation: {
        none: '',
        slight: '-rotate-1',
        negative: 'rotate-1',
        medium: '-rotate-2',
        negativeMedium: 'rotate-2'
      },
      interactive: {
        none: '',
        lift: 'hover:-translate-y-0.5',
        grow: 'hover:scale-[1.03]',
        bounce: 'hover:animate-bounce',
        wiggle: 'hover:-rotate-1'
      },
      shadow: {
        none: '',
        sm: 'shadow-sm shadow-shadow',
        md: 'shadow-md shadow-shadow',
        lg: 'shadow-lg shadow-shadow'
      },
      size: {
        sm: 'px-2 py-1',
        md: 'px-2.5 py-1.5',
        lg: 'px-3 py-2'
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
  children,
  ...props
}: NeoBadgeProps) {
  const typographyBySize = {
    sm: S,
    md: M,
    lg: L
  };
  const Typography = typographyBySize[size ?? 'md'] || M;

  if (asChild) {
    return (
      <Slot
        className={cn(
          neoBadgeVariants({ variant, rotation, interactive, shadow, size }),
          className
        )}
        {...props}
      >
        {children}
      </Slot>
    );
  }

  return (
    <Badge
      variant='outline'
      className={cn(
        'h-auto min-h-5 border-2 shadow-sm',
        neoBadgeVariants({ variant, rotation, interactive, shadow, size }),
        className
      )}
      {...props}
    >
      <Typography as='span' className='m-0 p-0 leading-none font-inherit'>
        {children}
      </Typography>
    </Badge>
  );
}

export { NeoBadge, neoBadgeVariants };
