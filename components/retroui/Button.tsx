import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React, { ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";

export const buttonVariants = cva(
  "font-head transition-all rounded outline-hidden cursor-pointer duration-200 font-medium flex items-center",
  {
    variants: {
      variant: {
        default:
          "shadow-md hover:shadow active:shadow-none bg-primary text-primary-foreground border-2 border-border transition hover:translate-y-1 active:translate-y-2 active:translate-x-1 hover:bg-primary-hover",
        secondary:
          "shadow-md hover:shadow active:shadow-none bg-secondary text-secondary-foreground border-2 border-border transition hover:translate-y-1 active:translate-y-2 active:translate-x-1",
        outline:
          "shadow-md hover:shadow active:shadow-none bg-transparent border-2 transition hover:translate-y-1 active:translate-y-2 active:translate-x-1",
        link: "bg-transparent hover:underline",
        ghost: "bg-transparent hover:bg-accent"
      },
      size: {
        sm: "px-3 py-1 text-sm shadow hover:shadow-none",
        md: "px-4 py-1.5 text-base",
        lg: "px-6 lg:px-8 py-2 lg:py-3 text-md lg:text-lg",
        icon: "p-2",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  },
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
      size = "md",
      className = "",
      variant = "default",
      asChild = false,
      ...props
    }: IButtonProps,
    forwardedRef,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={forwardedRef}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);

Button.displayName = 'Button';

// Wrapper for icon buttons with animated icons
export interface IconButtonProps extends IButtonProps {
  icon: React.ReactNode;
  animationType?: 'rotate' | 'bounce' | 'scale' | 'none';
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, animationType = 'scale', className, children, ...props }, ref) => {
    const iconAnimationClass = {
      rotate: 'group-hover:rotate-12 transition-transform duration-200',
      bounce: 'group-hover:animate-bounce',
      scale: 'group-hover:scale-110 transition-transform duration-200',
      none: ''
    }[animationType];

    return (
      <Button className={cn('group', className)} ref={ref} {...props}>
        <span className={cn('inline-flex items-center justify-center', iconAnimationClass)}>
          {icon}
        </span>
        {children}
      </Button>
    );
  }
);
IconButton.displayName = 'IconButton';

export { IconButton };