'use client';

import Link from 'next/link';
import React from 'react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils/ui';

interface IconLinkProps extends Omit<ButtonProps, 'asChild'> {
  href: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  external?: boolean;
  className?: string;
  linkClassName?: string;
}

export const IconLink = React.forwardRef<HTMLAnchorElement, IconLinkProps>(
  (
    {
      href,
      icon,
      iconPosition = 'right',
      external = false,
      className,
      linkClassName,
      children,
      variant,
      size,
      ...props
    },
    ref
  ) => {
    const externalProps = external
      ? {
          target: '_blank',
          rel: 'noopener noreferrer'
        }
      : {};

    // For standalone icon links (no text)
    const isIconOnly = !children && icon;
    const iconOnlySize = isIconOnly ? 'icon' : size;

    // Styled icon that respects position
    const styledIcon = icon ? (
      <span
        className={cn(
          'inline-flex transition-transform',
          iconPosition === 'right' && 'group-hover:translate-x-1',
          iconPosition === 'left' && 'group-hover:-translate-x-1'
        )}
      >
        {icon}
      </span>
    ) : null;

    return (
      <Link href={href} className={cn('group', linkClassName)} ref={ref} {...externalProps}>
        <Button className={className} variant={variant} size={iconOnlySize} {...props}>
          {iconPosition === 'left' && styledIcon}
          {children}
          {iconPosition === 'right' && styledIcon}
        </Button>
      </Link>
    );
  }
);

IconLink.displayName = 'IconLink';

// Standalone Icon Link with no text (for corner links, etc.)
interface CornerIconLinkProps {
  href: string;
  icon: React.ReactNode;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
}

export const CornerIconLink = ({
  href,
  icon,
  className,
  external = false,
  ariaLabel
}: CornerIconLinkProps) => {
  const externalProps = external
    ? {
        target: '_blank',
        rel: 'noopener noreferrer'
      }
    : {};

  return (
    <Link
      href={href}
      className={cn(
        'p-2 rounded-md hover:bg-accent/10 transition-colors inline-flex items-center justify-center',
        className
      )}
      aria-label={ariaLabel}
      {...externalProps}
    >
      {icon}
    </Link>
  );
};
