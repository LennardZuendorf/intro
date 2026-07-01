'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils/ui';

export type CalloutType = 'info' | 'check' | 'warning' | 'danger' | 'note';

export interface CalloutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof calloutVariants> {
  type?: CalloutType;
}

const calloutVariants = cva(
  'rounded-md border-4 border-border text-card-foreground shadow-md shadow-shadow transition-all',
  {
    variants: {
      variant: {
        default: 'bg-card',
        reversed: 'bg-card',
        outline: 'bg-transparent text-foreground',
        accent: 'bg-accent text-accent-foreground',
        info: 'bg-card border-border',
        check: 'bg-card border-border',
        warning: 'bg-card border-border',
        danger: 'bg-card border-border',
        note: 'bg-card border-border'
      },
      borderStyle: {
        default: 'border-4 border-border',
        accent: 'border-4 border-accent',
        none: 'border-0'
      }
    },
    defaultVariants: {
      variant: 'default',
      borderStyle: 'default'
    }
  }
);

const Callout = React.forwardRef<HTMLDivElement, CalloutProps>(
  ({ className, variant, borderStyle, type, ...props }, ref) => {
    // If type is provided, use it as variant; otherwise use provided variant
    const finalVariant = type ? (type as CalloutProps['variant']) : variant;

    return (
      <div
        ref={ref}
        className={cn(calloutVariants({ variant: finalVariant, borderStyle }), className)}
        {...props}
      />
    );
  }
);
Callout.displayName = 'Callout';

const CalloutIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { type?: CalloutType }
>(({ className, type, ...props }, ref) => (
  <div ref={ref} className={cn('shrink-0', className)} {...props} />
));
CalloutIcon.displayName = 'CalloutIcon';

const CalloutHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1 p-3', className)} {...props} />
  )
);
CalloutHeader.displayName = 'CalloutHeader';

const CalloutTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-base font-heading tracking-tight', className)} {...props} />
));
CalloutTitle.displayName = 'CalloutTitle';

const CalloutDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm text-muted-foreground font-base mt-1!', className)}
    {...props}
  />
));
CalloutDescription.displayName = 'CalloutDescription';

const CalloutContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-3 pt-0', className)} {...props} />
  )
);
CalloutContent.displayName = 'CalloutContent';

const CalloutFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center justify-center p-2 pt-0', className)}
      {...props}
    />
  )
);
CalloutFooter.displayName = 'CalloutFooter';

export {
  Callout,
  CalloutContent,
  CalloutDescription,
  CalloutFooter,
  CalloutHeader,
  CalloutIcon,
  CalloutTitle,
  calloutVariants
};
