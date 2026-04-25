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
  'rounded-md border-4 border-border text-primary-foreground shadow-black shadow-md transition-all',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        reversed: 'bg-primary',
        outline: 'bg-transparent',
        accent: 'bg-accent text-accent-foreground',
        info: 'bg-primary border-border',
        check: 'bg-primary border-border',
        warning: 'bg-primary border-border',
        danger: 'bg-primary border-border',
        note: 'bg-primary border-border'
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
    className={cn('text-sm text-primary-foreground font-base mt-1!', className)}
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
  calloutVariants,
  CalloutHeader,
  CalloutFooter,
  CalloutTitle,
  CalloutDescription,
  CalloutContent,
  CalloutIcon
};
