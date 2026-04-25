import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils/ui';

const cardHeaderVariants = cva('flex flex-col space-y-1.5', {
  variants: {
    spacing: {
      compact: 'p-3 pt-6',
      default: 'p-3 pt-6 md:p-4 md:pt-6'
    }
  },
  defaultVariants: { spacing: 'default' }
});

const cardContentVariants = cva('', {
  variants: {
    spacing: {
      compact: 'p-3',
      default: 'p-3 md:p-4'
    }
  },
  defaultVariants: { spacing: 'default' }
});

const cardFooterVariants = cva('flex items-center', {
  variants: {
    spacing: {
      compact: 'p-2 pt-0',
      default: 'p-2 pt-0 md:p-3 md:pt-0'
    }
  },
  defaultVariants: { spacing: 'default' }
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const cardVariants = cva(
  'rounded-md border-4 border-border text-primary-foreground shadow-black shadow-md transition-[transform,box-shadow] duration-200',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        reversed: 'bg-primary',
        outline: 'bg-transparent ',
        accent: 'bg-accent text-accent-foreground ',
        // Completely remove border and shadow, background is transparent, no outline at all
        invisible: 'bg-transparent! border-none! shadow-none!'
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
        slight: 'rotate-negative',
        slightNegative: 'rotate-1',
        medium: 'rotate-negative-medium',
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
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        cardVariants({ variant, shadow, borderStyle, rotation, interactive }),
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';

interface CardSectionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardHeaderVariants> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardSectionProps>(
  ({ className, spacing, ...props }, ref) => (
    <div ref={ref} className={cn(cardHeaderVariants({ spacing }), className)} {...props} />
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
    className={cn('text-sm text-primary-foreground font-base mt-3!', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, CardSectionProps>(
  ({ className, spacing, ...props }, ref) => (
    <div ref={ref} className={cn(cardContentVariants({ spacing }), className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, CardSectionProps>(
  ({ className, spacing, ...props }, ref) => (
    <div ref={ref} className={cn(cardFooterVariants({ spacing }), className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, cardVariants, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
