import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils/ui';

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  disableScale?: boolean;
}

const cardVariants = cva(
  'rounded-md border-4 border-border text-primary-foreground shadow-black shadow-md transition-all',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        reversed: 'bg-primary',
        outline: 'bg-transparent ',
        accent: 'bg-accent text-accent-foreground ',
        // Completely remove border and shadow, background is transparent, no outline at all
        invisible: '!bg-transparent !border-none !shadow-none'
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
      },
      rotation: {
        none: '',
        slight: '-rotate-1',
        slightNegative: 'rotate-1',
        medium: '-rotate-2',
        mediumNegative: 'rotate-2'
      },
      interactive: {
        none: '',
        slight: 'hover:-translate-y-0.5',
        medium: 'hover:-translate-y-1'
      }
    },
    defaultVariants: {
      variant: 'default',
      shadow: 'lg',
      borderStyle: 'default',
      rotation: 'none',
      interactive: 'none'
    }
  }
);

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      shadow,
      borderStyle,
      rotation,
      interactive,
      disableScale = false,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        !disableScale && 'scale-100',
        cardVariants({ variant, shadow, borderStyle, rotation, interactive }),
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-3 pt-6', className)} {...props} />
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
  <div
    ref={ref}
    className={cn('text-sm text-primary-foreground font-base !mt-3', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-3', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-2 pt-0', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, cardVariants, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
