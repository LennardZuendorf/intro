import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/ui';

export const buttonVariants = cva(
  cn(
    'group/button font-head font-medium inline-flex cursor-pointer items-center justify-center gap-2 rounded whitespace-nowrap select-none transition-all duration-200 outline-hidden',
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
  ),
  {
    variants: {
      variant: {
        default:
          'shadow-md shadow-shadow hover:shadow-lg hover:shadow-shadow active:shadow-none bg-primary text-primary-foreground border-2 border-border transition hover:translate-y-1 active:translate-y-2 active:translate-x-1 hover:bg-primary-hover',
        flat: 'shadow-none bg-primary text-primary-foreground border-2 border-border hover:bg-primary-hover active:bg-primary-hover',
        secondary:
          'shadow-md shadow-shadow hover:shadow-lg hover:shadow-shadow active:shadow-none bg-secondary text-secondary-foreground border-2 border-border transition hover:translate-y-1 active:translate-y-2 active:translate-x-1 hover:bg-secondary-hover',
        flatSecondary:
          'shadow-none bg-secondary text-secondary-foreground border-2 border-border hover:bg-secondary-hover active:bg-secondary-hover',
        destructive:
          'shadow-md shadow-shadow hover:shadow-lg hover:shadow-shadow active:shadow-none bg-destructive text-destructive-foreground border-2 border-border transition hover:translate-y-1 active:translate-y-2 active:translate-x-1 hover:bg-destructive/90',
        outline:
          'shadow-md shadow-shadow hover:shadow-lg hover:shadow-shadow active:shadow-none bg-transparent border-2 border-border transition hover:translate-y-1 active:translate-y-2 active:translate-x-1',
        link: 'bg-transparent hover:underline shadow-none',
        ghost: 'bg-transparent hover:bg-accent shadow-none'
      },
      size: {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-1.5 text-base',
        default: 'px-4 py-1.5 text-base',
        lg: 'px-6 lg:px-8 py-2 lg:py-3 text-base lg:text-lg',
        icon: 'size-9 shrink-0 items-center justify-center p-0 shadow-md shadow-shadow hover:shadow-lg hover:shadow-shadow active:shadow-none',
        xs: 'px-2 py-0.5 text-xs',
        'icon-xs': 'size-7 p-1',
        'icon-sm': 'size-8 p-1.5',
        'icon-lg': 'size-10 p-3'
      }
    },
    compoundVariants: [
      {
        variant: ['flat', 'flatSecondary'],
        className: 'shadow-none hover:shadow-none active:shadow-none'
      },
      {
        variant: ['flat', 'flatSecondary'],
        size: 'icon',
        className: 'shadow-none hover:shadow-none active:shadow-none'
      },
      {
        variant: 'ghost',
        className: 'shadow-none hover:shadow-none active:shadow-none'
      },
      {
        variant: 'link',
        className: 'shadow-none hover:shadow-none active:shadow-none'
      }
    ],
    defaultVariants: {
      size: 'md',
      variant: 'default'
    }
  }
);

export interface IButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  (
    {
      children,
      size = 'md',
      className = '',
      variant = 'default',
      asChild = false,
      ...props
    }: IButtonProps,
    forwardedRef
  ) => {
    const classes = cn(buttonVariants({ variant, size }), className);

    if (asChild) {
      return (
        <Slot ref={forwardedRef} className={classes} {...props}>
          {children}
        </Slot>
      );
    }

    return (
      <ButtonPrimitive ref={forwardedRef} className={classes} {...props}>
        {children}
      </ButtonPrimitive>
    );
  }
);

Button.displayName = 'Button';
