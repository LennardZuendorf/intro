import * as React from 'react';

import { cn } from '@/lib/utils/ui';
import { type VariantProps, cva } from 'class-variance-authority';

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  disableScale?: boolean;
}

const cardVariants = cva('rounded-md border-4 border-border text-mtext shadow-md transition-all', {
  variants: {
    variant: {
      default: 'bg-main',
      reversed: 'bg-bg',
      outline: 'bg-transparent ',
      accent: 'bg-accent text-atext',
      clickable: 'bg-main hover:bg-accent-dark hover:text-atext',
      invisible: 'bg-transparent border-none shadow-none'
    },
    rotation: {
      none: '',
      slight: 'rotate-slight',
      slightNegative: 'rotate-negative',
      medium: 'rotate-medium',
      mediumNegative: 'rotate-negative-medium'
    },
    interactive: {
      none: '',
      slight: 'hover-lift transition-all duration-300',
      medium: 'hover-grow hover:shadow-xl transition-all duration-300'
    },
    shadow: {
      none: 'shadow-none',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl'
    },
    borderStyle: {
      default: 'border-4 border-border',
      accent: 'border-4 border-accent',
      none: 'border-0'
    }
  },
  defaultVariants: {
    variant: 'default',
    rotation: 'none',
    interactive: 'none',
    shadow: 'lg',
    borderStyle: 'default'
  }
});

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      rotation,
      interactive,
      shadow,
      borderStyle,
      disableScale = false,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        !disableScale && 'scale-100',
        cardVariants({ variant, rotation, interactive, shadow, borderStyle }),
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-xl leading-none font-heading tracking-tight', className)}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-sm text-mtext font-base !mt-3', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, cardVariants, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
