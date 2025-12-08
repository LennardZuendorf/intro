import type * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import Link from 'next/link';
import { titleCase } from 'title-case';
import { cn } from '@/lib/utils/ui';

function formatContent(children: React.ReactNode): React.ReactNode {
  return typeof children === 'string' ? titleCase(children) : children;
}

// Base typography props that can be shared across components
export interface BaseTypographyProps extends Omit<React.HTMLAttributes<HTMLElement>, 'color' | 'children'> {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
  asChild?: boolean;
  weight?: 'light' | 'regular' | 'medium' | 'bold' | 'semibold' | 'black';
  color?: 'default' | 'muted' | 'accent' | 'foreground';
  highContrast?: boolean;
  truncate?: boolean;
  wrap?: 'wrap' | 'nowrap' | 'pretty' | 'balance';
  trim?: 'normal' | 'start' | 'end' | 'both';
  align?: 'left' | 'center' | 'right';
}

interface TypographyProps extends BaseTypographyProps {
  className?: string;
  children: React.ReactNode;
}

interface VariantTypographyProps extends BaseTypographyProps {
  className?: string;
  children: React.ReactNode;
  type?: 'foreground' | 'default';
}

// Helper function to get weight classes
function getWeightClass(weight?: BaseTypographyProps['weight']): string {
  switch (weight) {
    case 'light':
      return 'font-light';
    case 'regular':
      return 'font-normal';
    case 'medium':
      return 'font-medium';
    case 'semibold':
      return 'font-semibold';
    case 'bold':
      return 'font-bold';
    case 'black':
      return 'font-black';
    default:
      return '';
  }
}

// Helper function to get color classes
function getColorClass(
  color?: BaseTypographyProps['color'],
  highContrast?: boolean,
  type?: 'foreground' | 'default'
): string {
  if (color === 'muted' || type === 'default') {
    return highContrast ? 'text-muted-foreground' : 'text-muted-foreground';
  }
  if (color === 'accent') {
    return 'text-accent';
  }
  if (color === 'foreground' || type === 'foreground') {
    return 'text-foreground';
  }
  return '';
}

// Helper function to get wrap classes
function getWrapClass(wrap?: BaseTypographyProps['wrap']): string {
  switch (wrap) {
    case 'nowrap':
      return 'whitespace-nowrap';
    case 'pretty':
      return 'text-pretty';
    case 'balance':
      return 'text-balance';
    default:
      return '';
  }
}

// Helper function to get trim classes
// Note: Leading trim requires CSS variables or custom implementation
// For now, we'll use margin adjustments as a workaround
function getTrimClass(trim?: BaseTypographyProps['trim']): string {
  switch (trim) {
    case 'start':
      return '-mt-[0.42em]';
    case 'end':
      return '-mb-[0.36em]';
    case 'both':
      return '-mt-[0.42em] -mb-[0.36em]';
    default:
      return '';
  }
}

// Helper function to get align classes
function getAlignClass(align?: BaseTypographyProps['align']): string {
  switch (align) {
    case 'left':
      return 'text-left';
    case 'center':
      return 'text-center';
    case 'right':
      return 'text-right';
    default:
      return '';
  }
}

// Responsive sizing: sm/md bigger, lg/xl regular, 2xl bigger, no scaling beyond
// H1: Base -> sm/md (bigger) -> lg/xl (regular) -> 2xl (bigger)
const H1: React.FC<TypographyProps> = ({
  className = '',
  children,
  as: Component,
  asChild = false,
  weight = 'black',
  color,
  highContrast,
  truncate,
  wrap,
  trim,
  align,
  ...props
}) => {
  const content = formatContent(children);
  const Comp = asChild ? Slot : Component || 'h1';

  return (
    <Comp
      className={cn(
        'scroll-m-20 tracking-tight first:mt-0',
        // Responsive sizing: base smaller, sm/md bigger, lg/xl regular, 2xl bigger
        'text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl',
        getWeightClass(weight),
        getColorClass(color, highContrast),
        getWrapClass(wrap),
        getTrimClass(trim),
        getAlignClass(align),
        truncate && 'truncate',
        className
      )}
      {...props}
    >
      {content}
    </Comp>
  );
};

// H2: Base -> sm/md (bigger) -> lg/xl (regular) -> 2xl (bigger)
const H2: React.FC<TypographyProps> = ({
  className = '',
  children,
  as: Component,
  asChild = false,
  weight = 'semibold',
  color,
  highContrast,
  truncate,
  wrap,
  trim,
  align,
  ...props
}) => {
  const content = formatContent(children);
  const Comp = asChild ? Slot : Component || 'h2';

  return (
    <Comp
      className={cn(
        'scroll-m-20 tracking-tight',
        // Responsive sizing: base smaller, sm/md bigger, lg/xl regular, 2xl bigger
        'text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-xl',
        getWeightClass(weight),
        getColorClass(color, highContrast),
        getWrapClass(wrap),
        getTrimClass(trim),
        getAlignClass(align),
        truncate && 'truncate',
        className
      )}
      {...props}
    >
      {content}
    </Comp>
  );
};

// H3: Base -> sm/md (bigger) -> lg/xl (regular) -> 2xl (bigger)
const H3: React.FC<TypographyProps> = ({
  className = '',
  children,
  as: Component,
  asChild = false,
  weight = 'semibold',
  color,
  highContrast,
  truncate,
  wrap,
  trim,
  align,
  ...props
}) => {
  const content = formatContent(children);
  const Comp = asChild ? Slot : Component || 'h3';

  return (
    <Comp
      className={cn(
        'scroll-m-20 tracking-tight',
        // Responsive sizing: base smaller, sm/md bigger, lg/xl regular, 2xl bigger
        'text-[0.625rem] sm:text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-lg',
        getWeightClass(weight),
        getColorClass(color, highContrast),
        getWrapClass(wrap),
        getTrimClass(trim),
        getAlignClass(align),
        truncate && 'truncate',
        className
      )}
      {...props}
    >
      {content}
    </Comp>
  );
};

// H4: Base -> sm/md (bigger) -> lg/xl (regular) -> 2xl (bigger)
const H4: React.FC<TypographyProps> = ({
  className = '',
  children,
  as: Component,
  asChild = false,
  weight = 'semibold',
  color,
  highContrast,
  truncate,
  wrap,
  trim,
  align,
  ...props
}) => {
  const content = formatContent(children);
  const Comp = asChild ? Slot : Component || 'h4';

  return (
    <Comp
      className={cn(
        'scroll-m-20 tracking-tight',
        // Responsive sizing: base smaller, sm/md bigger, lg/xl regular, 2xl bigger
        'text-[0.625rem] sm:text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-lg',
        getWeightClass(weight),
        getColorClass(color, highContrast),
        getWrapClass(wrap),
        getTrimClass(trim),
        getAlignClass(align),
        truncate && 'truncate',
        className
      )}
      {...props}
    >
      {content}
    </Comp>
  );
};

// H5: Base -> sm/md (bigger) -> lg/xl (regular) -> 2xl (bigger)
const H5: React.FC<TypographyProps> = ({
  className = '',
  children,
  as: Component,
  asChild = false,
  weight = 'medium',
  color,
  highContrast,
  truncate,
  wrap,
  trim,
  align,
  ...props
}) => {
  const content = formatContent(children);
  const Comp = asChild ? Slot : Component || 'h5';

  return (
    <Comp
      className={cn(
        'scroll-m-20 tracking-tight',
        // Responsive sizing inspired by body S/M, but slightly bolder for headers
        'text-[0.5rem] sm:text-[0.625rem] md:text-xs lg:text-xs xl:text-sm 2xl:text-base',
        getWeightClass(weight),
        getColorClass(color, highContrast),
        getWrapClass(wrap),
        getTrimClass(trim),
        getAlignClass(align),
        truncate && 'truncate',
        className
      )}
      {...props}
    >
      {content}
    </Comp>
  );
};

// H6: Base -> sm/md (bigger) -> lg/xl (regular) -> 2xl (bigger)
const H6: React.FC<TypographyProps> = ({
  className = '',
  children,
  as: Component,
  asChild = false,
  weight = 'medium',
  color,
  highContrast,
  truncate,
  wrap,
  trim,
  align,
  ...props
}) => {
  const content = formatContent(children);
  const Comp = asChild ? Slot : Component || 'h6';

  return (
    <Comp
      className={cn(
        'scroll-m-20 tracking-tight',
        // Responsive sizing inspired by XS body, smaller for the smallest header
        'text-[0.5rem] sm:text-[0.5rem] md:text-[0.625rem] lg:text-[0.625rem] xl:text-xs 2xl:text-xs',
        getWeightClass(weight),
        getColorClass(color, highContrast),
        getWrapClass(wrap),
        getTrimClass(trim),
        getAlignClass(align),
        truncate && 'truncate',
        className
      )}
      {...props}
    >
      {content}
    </Comp>
  );
};

// Lead: Base -> sm/md (bigger) -> lg/xl (regular) -> 2xl (bigger)
const Lead: React.FC<VariantTypographyProps> = ({
  className = '',
  children,
  type = 'default',
  as: Component,
  asChild = false,
  weight = 'semibold',
  color,
  highContrast,
  truncate,
  wrap,
  trim,
  align,
  ...props
}) => {
  const content = formatContent(children);
  const Comp = asChild ? Slot : Component || 'p';

  return (
    <Comp
      className={cn(
        'scroll-m-20 tracking-tight',
        // Responsive sizing: base smaller, sm/md bigger, lg/xl regular, 2xl bigger
        'text-xs sm:text-sm md:text-base lg:text-base xl:text-base 2xl:text-lg',
        getWeightClass(weight),
        getColorClass(color, highContrast, type),
        getWrapClass(wrap),
        getTrimClass(trim),
        getAlignClass(align),
        truncate && 'truncate',
        className
      )}
      {...props}
    >
      {content}
    </Comp>
  );
};

// LQuote: Base -> sm/md (bigger) -> lg/xl (regular) -> 2xl (bigger)
const LQuote: React.FC<TypographyProps> = ({
  className = '',
  children,
  as: Component,
  asChild = false,
  weight = 'semibold',
  color,
  highContrast,
  truncate,
  wrap,
  trim,
  align,
  ...props
}) => {
  const content = formatContent(children);
  const Comp = asChild ? Slot : Component || 'blockquote';

  return (
    <Comp
      className={cn(
        'mt-6 border-l-2 pl-6',
        // Responsive sizing: base smaller, sm/md bigger, lg/xl regular, 2xl bigger
        'text-xs sm:text-sm md:text-base lg:text-base xl:text-base 2xl:text-lg',
        getWeightClass(weight),
        getColorClass(color, highContrast),
        getWrapClass(wrap),
        getTrimClass(trim),
        getAlignClass(align),
        truncate && 'truncate',
        className
      )}
      {...props}
    >
      {content}
    </Comp>
  );
};

// Quote: Base -> sm/md (bigger) -> lg/xl (regular) -> 2xl (bigger)
const Quote: React.FC<TypographyProps> = ({
  className = '',
  children,
  as: Component,
  asChild = false,
  weight,
  color,
  highContrast,
  truncate,
  wrap,
  trim,
  align,
  ...props
}) => {
  const Comp = asChild ? Slot : Component || 'blockquote';

  return (
    <Comp
      className={cn(
        'mt-6 border-l-2 pl-6',
        // Responsive sizing: base smaller, sm/md bigger, lg/xl regular, 2xl bigger
        'text-[0.625rem] sm:text-xs md:text-sm lg:text-sm xl:text-sm 2xl:text-base',
        getWeightClass(weight),
        getColorClass(color, highContrast),
        getWrapClass(wrap),
        getTrimClass(trim),
        getAlignClass(align),
        truncate && 'truncate',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};

// L: Base -> sm/md (bigger) -> lg/xl (regular) -> 2xl (bigger)
const L: React.FC<TypographyProps> = ({
  className = '',
  children,
  as: Component,
  asChild = false,
  weight = 'semibold',
  color,
  highContrast,
  truncate,
  wrap,
  trim,
  align,
  ...props
}) => {
  const Comp = asChild ? Slot : Component || 'p';

  return (
    <Comp
      className={cn(
        // Responsive sizing: base smaller, sm/md bigger, lg/xl regular, 2xl bigger
        'text-[0.625rem] sm:text-xs md:text-sm lg:text-xs xl:text-sm 2xl:text-base',
        getWeightClass(weight),
        getColorClass(color, highContrast),
        getWrapClass(wrap),
        getTrimClass(trim),
        getAlignClass(align),
        truncate && 'truncate',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};

// M: Base -> sm/md (bigger) -> lg/xl (regular) -> 2xl (bigger)
// Default styling for Link component
const M: React.FC<TypographyProps> = ({
  className = '',
  children,
  as: Component = 'p',
  asChild = false,
  weight = 'medium',
  color,
  highContrast,
  truncate,
  wrap,
  trim,
  align,
  ...props
}) => {
  const Comp = asChild ? Slot : Component;

  return (
    <Comp
      className={cn(
        'leading-6 not-first:mt-1',
        // Responsive sizing: base smaller, sm/md bigger, lg/xl regular, 2xl bigger
        'text-[0.625rem] sm:text-xs md:text-sm lg:text-xs xl:text-xs 2xl:text-sm',
        getWeightClass(weight),
        getColorClass(color, highContrast),
        getWrapClass(wrap),
        getTrimClass(trim),
        getAlignClass(align),
        truncate && 'truncate',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};

// S: Base -> sm/md (bigger) -> lg/xl (regular) -> 2xl (bigger)
const S: React.FC<TypographyProps> = ({
  className = '',
  children,
  as: Component,
  asChild = false,
  weight = 'medium',
  color,
  highContrast,
  truncate,
  wrap,
  trim,
  align,
  ...props
}) => {
  const Comp = asChild ? Slot : Component || 'small';

  return (
    <Comp
      className={cn(
        'leading-none',
        // Responsive sizing: base smaller, sm/md bigger, lg/xl regular, 2xl bigger
        'text-[0.5rem] sm:text-[0.625rem] md:text-xs lg:text-xs xl:text-xs 2xl:text-sm',
        getWeightClass(weight),
        getColorClass(color, highContrast),
        getWrapClass(wrap),
        getTrimClass(trim),
        getAlignClass(align),
        truncate && 'truncate',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};

// XS: Base -> sm/md (bigger) -> lg/xl (regular) -> 2xl (bigger)
const XS: React.FC<TypographyProps> = ({
  className = '',
  children,
  as: Component,
  asChild = false,
  weight = 'light',
  color,
  highContrast,
  truncate,
  wrap,
  trim,
  align,
  ...props
}) => {
  const Comp = asChild ? Slot : Component || 'small';

  return (
    <Comp
      className={cn(
        'leading-none',
        // Responsive sizing: base smaller, sm/md bigger, lg/xl regular, 2xl bigger
        'text-[0.5rem] sm:text-[0.5rem] md:text-[0.625rem] lg:text-[0.625rem] xl:text-[0.625rem] 2xl:text-xs',
        getWeightClass(weight),
        getColorClass(color, highContrast),
        getWrapClass(wrap),
        getTrimClass(trim),
        getAlignClass(align),
        truncate && 'truncate',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};

// SMuted: Base -> sm/md (bigger) -> lg/xl (regular) -> 2xl (bigger)
const SMuted: React.FC<TypographyProps> = ({
  className = '',
  children,
  as: Component,
  asChild = false,
  weight,
  color = 'muted',
  highContrast,
  truncate,
  wrap,
  trim,
  align,
  ...props
}) => {
  const Comp = asChild ? Slot : Component || 'p';

  return (
    <Comp
      className={cn(
        // Responsive sizing: base smaller, sm/md bigger, lg/xl regular, 2xl bigger
        'text-[0.5rem] sm:text-[0.5rem] md:text-[0.625rem] lg:text-[0.625rem] xl:text-[0.625rem] 2xl:text-xs',
        getWeightClass(weight),
        getColorClass(color, highContrast),
        getWrapClass(wrap),
        getTrimClass(trim),
        getAlignClass(align),
        truncate && 'truncate',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};

// Muted: Base -> sm/md (bigger) -> lg/xl (regular) -> 2xl (bigger)
const Muted: React.FC<TypographyProps> = ({
  className = '',
  children,
  as: Component,
  asChild = false,
  weight,
  color = 'muted',
  highContrast,
  truncate,
  wrap,
  trim,
  align,
  ...props
}) => {
  const Comp = asChild ? Slot : Component || 'p';

  return (
    <Comp
      className={cn(
        'text-mono',
        // Responsive sizing: base smaller, sm/md bigger, lg/xl regular, 2xl bigger
        'text-xs sm:text-xs md:text-sm lg:text-sm xl:text-sm 2xl:text-base',
        getWeightClass(weight),
        getColorClass(color, highContrast),
        getWrapClass(wrap),
        getTrimClass(trim),
        getAlignClass(align),
        truncate && 'truncate',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};

// Code: Base -> sm/md (bigger) -> lg/xl (regular) -> 2xl (bigger)
// Variants: solid, soft, outline, ghost
interface CodeProps extends BaseTypographyProps {
  variant?: 'solid' | 'soft' | 'outline' | 'ghost';
}

const Code: React.FC<CodeProps> = ({
  className = '',
  children,
  as: Component,
  asChild = false,
  variant = 'soft',
  weight = 'semibold',
  color,
  highContrast,
  truncate,
  wrap,
  trim,
  align,
  ...props
}) => {
  const Comp = asChild ? Slot : Component || 'code';

  return (
    <Comp
      className={cn(
        'relative rounded-sm px-[0.3rem] py-[0.2rem] font-mono',
        // Responsive sizing: base smaller, sm/md bigger, lg/xl regular, 2xl bigger
        'text-[0.5rem] sm:text-[0.625rem] md:text-xs lg:text-xs xl:text-xs 2xl:text-sm',
        getWeightClass(weight),
        "text-foreground",
        getColorClass(color, highContrast),
        getWrapClass(wrap),
        getTrimClass(trim),
        getAlignClass(align),
        truncate && 'truncate',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};

// Link component - composable with typography, defaults to M styling
type LinkProps = BaseTypographyProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'color' | 'children'> & {
    href: string;
    external?: boolean;
    underline?: 'auto' | 'always' | 'hover' | 'none';
  };

const TypographyLink: React.FC<LinkProps> = ({
  href,
  external = false,
  className = '',
  children,
  asChild = false,
  weight = 'medium',
  color = 'accent',
  highContrast,
  truncate,
  wrap,
  trim,
  align,
  underline = 'hover',
  as,
  onClick,
  ...props
}) => {
  const externalProps = external
    ? {
        target: '_blank',
        rel: 'noopener noreferrer'
      }
    : {};

  const underlineClasses = {
    auto: 'underline-offset-4',
    always: 'underline underline-offset-4',
    hover: 'hover:underline hover:underline-offset-4 hover:decoration-2',
    none: 'no-underline'
  };

  // If asChild, use Slot; otherwise use Next.js Link
  if (asChild) {
    const Comp = Slot;
  return (
      <Comp
        className={cn(
          // M component base styling
          'leading-6 not-first:mt-1',
          // Responsive sizing: base smaller, sm/md bigger, lg/xl regular, 2xl bigger
          'text-[0.625rem] sm:text-xs md:text-sm lg:text-xs xl:text-xs 2xl:text-sm',
          getWeightClass(weight),
          getColorClass(color, highContrast),
          getWrapClass(wrap),
          getTrimClass(trim),
          getAlignClass(align),
          underlineClasses[underline],
          truncate && 'truncate',
          'transition-all duration-200',
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        // M component base styling
        'leading-6 not-first:mt-1',
        // Responsive sizing: base smaller, sm/md bigger, lg/xl regular, 2xl bigger
        'text-[0.625rem] sm:text-xs md:text-sm lg:text-xs xl:text-xs 2xl:text-sm',
        getWeightClass(weight),
        getColorClass(color, highContrast),
        getWrapClass(wrap),
        getTrimClass(trim),
        getAlignClass(align),
        underlineClasses[underline],
        truncate && 'truncate',
        'transition-all duration-200',
        className
      )}
      {...externalProps}
      {...props}
    >
      {onClick ? (
        <span onClick={onClick} className="contents">
          {children}
        </span>
      ) : (
        children
      )}
    </Link>
  );
};

// Strong component
const Strong: React.FC<TypographyProps> = ({
  className = '',
  children,
  as: Component,
  asChild = false,
  weight = 'bold',
  color,
  highContrast,
  truncate,
  wrap,
  trim,
  align,
  ...props
}) => {
  const Comp = asChild ? Slot : Component || 'strong';

  return (
    <Comp
      className={cn(
        getWeightClass(weight),
        getColorClass(color, highContrast),
        getWrapClass(wrap),
        getTrimClass(trim),
        getAlignClass(align),
        truncate && 'truncate',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};

// Em component
const Em: React.FC<TypographyProps> = ({
  className = '',
  children,
  as: Component,
  asChild = false,
  weight,
  color,
  highContrast,
  truncate,
  wrap,
  trim,
  align,
  ...props
}) => {
  const Comp = asChild ? Slot : Component || 'em';

  return (
    <Comp
      className={cn(
        'italic',
        getWeightClass(weight),
        getColorClass(color, highContrast),
        getWrapClass(wrap),
        getTrimClass(trim),
        getAlignClass(align),
        truncate && 'truncate',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};

export {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Lead,
  LQuote,
  Quote,
  L,
  M,
  S,
  XS,
  Muted,
  SMuted,
  Code,
  TypographyLink as Link,
  Strong,
  Em
};
