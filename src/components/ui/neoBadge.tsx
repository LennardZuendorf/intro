import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';
import { cn } from '@/lib/utils/ui';
import { M, S, L } from './typography';

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
        slight: '-rotate-1',
        negative: 'rotate-1',
        medium: '-rotate-2'
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
        sm: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg'
      },
      size: {
        sm: 'px-[0.6rem] py-[0.30rem] xl:px-[0.5rem] xl:py-[0.25rem]',
        md: 'px-[0.9rem] py-[0.45rem] xl:px-[0.7rem] xl:py-[0.35rem]',
        lg: 'px-[1.2rem] py-[0.6rem] xl:px-[0.9rem] xl:py-[0.45rem]'
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
  const typographyBySize = {
    sm: S,
    md: M,
    lg: L
  };
  const Typography = typographyBySize[size ?? 'md'] || M;

  return (
    <Comp
      className={cn(neoBadgeVariants({ variant, rotation, interactive, shadow, size }), className)}
      {...props}
    >
      <Typography as="span" className="m-0 p-0 leading-none">
        {props.children}
      </Typography>
    </Comp>
  );
}

export { NeoBadge, neoBadgeVariants };
