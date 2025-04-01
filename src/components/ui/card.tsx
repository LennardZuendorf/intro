import * as React from 'react';

import { cn } from '@/lib/utils/ui';
import { type VariantProps, cva } from 'class-variance-authority';

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const cardVariants = cva('rounded-md border-4 border-border text-mtext shadow-md transition-all', {
  variants: {
    variant: {
      default: 'bg-main',
      reversed: 'bg-bg',
      outline: 'bg-transparent'
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
      wiggle: 'hover:rotate-3 hover:scale-105',
      flip: 'hover:-rotate-1'
    },
    shadow: {
      none: '',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg'
    }
  },
  defaultVariants: {
    variant: 'default',
    rotation: 'none',
    interactive: 'none',
    shadow: 'md'
  }
});

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, rotation, interactive, shadow, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, rotation, interactive, shadow, className }))}
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
