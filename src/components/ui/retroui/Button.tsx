import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/ui';

export const buttonVariants = cva(
  'font-head transition-all rounded outline-hidden cursor-pointer duration-200 font-medium flex items-center',
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
        outline:
          'shadow-md shadow-shadow hover:shadow-lg hover:shadow-shadow active:shadow-none bg-transparent border-2 transition hover:translate-y-1 active:translate-y-2 active:translate-x-1',
        link: 'bg-transparent hover:underline',
        ghost: 'bg-transparent hover:bg-accent'
      },
      size: {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-1.5 text-base',
        lg: 'px-6 lg:px-8 py-2 lg:py-3 text-md lg:text-lg',
        icon: 'p-2 shadow-md shadow-shadow hover:shadow-lg hover:shadow-shadow active:shadow-none'
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
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={forwardedRef}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = 'Button';
