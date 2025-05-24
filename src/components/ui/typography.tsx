import { cn } from '@/lib/utils/ui';
import type * as React from 'react';
import { titleCase } from 'title-case';

function formatContent(children: React.ReactNode): React.ReactNode {
  return typeof children === 'string' ? titleCase(children) : children;
}

interface TypographyProps {
  className?: string;
  children: React.ReactNode;
}

interface VariantTypographyProps {
  className?: string;
  children: React.ReactNode;
  type?: 'foreground' | 'default';
}

const H1: React.FC<TypographyProps> = ({ className = '', children }) => {
  const content = formatContent(children);
  return (
    <h1
      className={cn(
        'scroll-m-20 text-xl font-black tracking-tight sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-6xl first:mt-0',
        className
      )}
    >
      {content}
    </h1>
  );
};

const H2: React.FC<TypographyProps> = ({ className = '', children }) => {
  const content = formatContent(children);
  return (
    <h2
      className={cn(
        'scroll-m-20 text-lg font-semibold tracking-tight sm:text-xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl',
        className
      )}
    >
      {content}
    </h2>
  );
};

const H3: React.FC<TypographyProps> = ({ className = '', children }) => {
  const content = formatContent(children);
  return (
    <h3
      className={cn(
        'scroll-m-20 text-base font-semibold tracking-tight sm:text-lg md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl',
        className
      )}
    >
      {content}
    </h3>
  );
};

const H4: React.FC<TypographyProps> = ({ className = '', children }) => {
  const content = formatContent(children);
  return (
    <h4
      className={cn(
        'scroll-m-20 text-sm font-semibold tracking-tight sm:text-base md:text-base lg:text-lg xl:text-xl 2xl:text-2xl',
        className
      )}
    >
      {content}
    </h4>
  );
};

const Lead: React.FC<VariantTypographyProps> = ({ className = '', children, type = 'default' }) => {
  const content = formatContent(children);
  return (
    <p
      className={cn(
        'scroll-m-20 text-base font-semibold tracking-tight sm:text-lg md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl',
        className,
        {
          'text-muted-foreground': type === 'default',
          'text-foreground': type === 'foreground'
        }
      )}
    >
      {content}
    </p>
  );
};

const LQuote: React.FC<TypographyProps> = ({ className = '', children }) => {
  const content = formatContent(children);
  return (
    <blockquote
      className={cn(
        'mt-6 border-l-2 pl-6 text-base font-semibold sm:text-lg md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl',
        className
      )}
    >
      {content}
    </blockquote>
  );
};

const Quote: React.FC<TypographyProps> = ({ className = '', children }) => {
  return (
    <blockquote
      className={cn(
        'mt-6 border-l-2 pl-6 text-xs sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-lg',
        className
      )}
    >
      {children}
    </blockquote>
  );
};

const L: React.FC<TypographyProps> = ({ className = '', children }) => {
  return (
    <p
      className={cn(
        'text-sm font-semibold sm:text-base md:text-base lg:text-lg xl:text-xl 2xl:text-2xl',
        className
      )}
    >
      {children}
    </p>
  );
};

const M: React.FC<TypographyProps> = ({ className = '', children }) => {
  return (
    <p
      className={cn(
        'text-xs font-medium leading-7 [&:not(:first-child)]:mt-1 sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-lg',
        className
      )}
    >
      {children}
    </p>
  );
};

const S: React.FC<TypographyProps> = ({ className = '', children }) => {
  return (
    <small
      className={cn(
        'text-[0.625rem] font-medium leading-none sm:text-xs md:text-xs lg:text-sm xl:text-sm 2xl:text-base',
        className
      )}
    >
      {children}
    </small>
  );
};

const XS: React.FC<TypographyProps> = ({ className = '', children }) => {
  return (
    <small
      className={cn(
        'text-[0.5rem] font-light leading-none sm:text-[0.625rem] md:text-[0.7rem] lg:text-xs xl:text-xs 2xl:text-sm',
        className
      )}
    >
      {children}
    </small>
  );
};

const SMuted: React.FC<TypographyProps> = ({ className = '', children }) => {
  return (
    <p
      className={cn(
        'text-[0.5rem] text-muted-foreground sm:text-[0.625rem] md:text-[0.7rem] lg:text-xs xl:text-xs 2xl:text-sm',
        className
      )}
    >
      {children}
    </p>
  );
};

const Muted: React.FC<TypographyProps> = ({ className = '', children }) => {
  return (
    <p
      className={cn(
        'text-sm text-mono text-muted-foreground sm:text-base md:text-base lg:text-lg xl:text-lg 2xl:text-xl',
        className
      )}
    >
      {children}
    </p>
  );
};

const Code: React.FC<TypographyProps> = ({ className = '', children }) => {
  return (
    <p className={cn(className)}>
      <code
        className={cn(
          'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-semibold sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-lg'
        )}
      >
        {children}
      </code>
    </p>
  );
};

export { H1, H2, H3, H4, Lead, LQuote, Quote, L, M, S, XS, Muted, SMuted, Code };
