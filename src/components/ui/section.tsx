'use client';

import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import React from 'react';
import { BackgroundGrid } from '@/components/ui/background-grid';
import { cn } from '@/lib/utils/ui';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Content for the section */
  children: ReactNode;
  /** Enable full viewport height */
  fullHeight?: boolean;
  /** Background variant */
  background?: 'default' | 'grid' | 'secondary' | 'accent';
  /** Content padding */
  padding?: string;
  /** Additional container class names */
  containerClassName?: string;
  /** Grid size for background (pixel value) */
  gridSize?: string;
  /** Mask intensity (0-100) - for potential future use */
  maskIntensity?: number;
  /** Render as a different HTML element */
  as?: ElementType;
  /** Center content (adds justify-center) */
  centerContent?: boolean;
  /** Custom gap class */
  gap?: string;
}

// Responsive gap that automatically scales with screen size
const responsiveGap = 'gap-6 lg:gap-9 xl:gap-12';

// Responsive gap for column layouts (doubled)
const responsiveColumnGap = 'gap-6 md:gap-8 lg:gap-12 xl:gap-16';

// Background color variants
const backgroundVariants = {
  default: 'bg-primary',
  grid: 'bg-primary',
  secondary: 'bg-secondary',
  accent: 'bg-accent-light'
};

function Section({
  children,
  className,
  fullHeight = true,
  background = 'default',
  padding = 'px-6 py-8 md:py-12 2xl:py-16',
  containerClassName,
  gridSize = '80px',
  maskIntensity = 40,
  centerContent = true,
  as: Element = 'section',
  gap,
  ...props
}: SectionProps) {
  // Base section classes
  const sectionClasses = cn(
    'w-full relative',
    fullHeight && 'min-h-[100svh]',
    'flex items-center justify-center',
    backgroundVariants[background],
    className
  );

  // Container for content with responsive width based on screen size
  const containerClasses = cn(
    'w-full flex',
    'flex-col',
    centerContent && 'items-center justify-center',
    padding,
    gap || responsiveGap,
    // Responsive max-width based on screen size
    'max-w-full sm:max-w-md md:max-w-lg lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl',
    containerClassName
  );

  // Content is just children
  const content: ReactNode = children;

  // Common content container
  const contentContainer = (
    <div id='section-content' className={containerClasses}>
      {content}
    </div>
  );

  // Background grid rendering
  if (background === 'grid') {
    return (
      <BackgroundGrid className={sectionClasses} {...props}>
        {contentContainer}
      </BackgroundGrid>
    );
  }

  // Default rendering
  return (
    <Element className={sectionClasses} {...props}>
      {contentContainer}
    </Element>
  );
}

interface SectionCompositionProps {
  children: ReactNode;
  className?: string;
  rowGap?: string;
  colGap?: string;
}

// Compositional components
function SectionTop({ children, className, colGap, rowGap }: SectionCompositionProps) {
  const childrenArray = React.Children.toArray(children);
  const elementChildren = childrenArray.filter((child) => React.isValidElement(child));

  // If exactly two element children, assume left/right layout
  if (elementChildren.length === 2) {
    const [leftChild, rightChild] = elementChildren as React.ReactElement[];

    return (
      <div
        id='top-section-left-right'
        className={cn(
          'grid grid-cols-1 lg:grid-cols-2 w-full justify-center items-center',
          colGap || responsiveColumnGap,
          className
        )}
      >
        <div
          className={cn(
            'col-span-1 w-full flex flex-col justify-center items-center',
            rowGap || responsiveGap
          )}
        >
          {leftChild}
        </div>
        <div
          className={cn(
            'col-span-1 w-full flex flex-col justify-center items-center',
            rowGap || responsiveGap
          )}
        >
          {rightChild}
        </div>
      </div>
    );
  }

  // Fallback to single content container
  return (
    <div id='top-section-single' className={className}>
      {children}
    </div>
  );
}
SectionTop.displayName = 'SectionTop';

function SectionBottom({ children, className, colGap, rowGap }: SectionCompositionProps) {
  // Detect if Bottom contains Left/Right for column layout
  const childrenArray = React.Children.toArray(children);
  const hasLeft = childrenArray.some(
    (child) =>
      React.isValidElement(child) &&
      typeof child.type !== 'string' &&
      (child.type as { displayName?: string })?.displayName === 'SectionLeft'
  );
  const hasRight = childrenArray.some(
    (child) =>
      React.isValidElement(child) &&
      typeof child.type !== 'string' &&
      (child.type as { displayName?: string })?.displayName === 'SectionRight'
  );

  if (hasLeft || hasRight) {
    // Column layout within Bottom
    const left = childrenArray.find(
      (child) =>
        React.isValidElement(child) &&
        typeof child.type !== 'string' &&
        (child.type as { displayName?: string })?.displayName === 'SectionLeft'
    ) as React.ReactElement<{ children?: React.ReactNode }> | undefined;

    const right = childrenArray.find(
      (child) =>
        React.isValidElement(child) &&
        typeof child.type !== 'string' &&
        (child.type as { displayName?: string })?.displayName === 'SectionRight'
    ) as React.ReactElement<{ children?: React.ReactNode }> | undefined;

    return (
      <div
        className={cn(
          'grid grid-cols-1 lg:grid-cols-2 w-full',
          colGap || responsiveColumnGap,
          className
        )}
      >
        <div
          className={cn(
            'w-full flex flex-col justify-center items-center',
            rowGap || responsiveGap
          )}
        >
          {left?.props.children}
        </div>
        <div
          className={cn(
            'w-full flex flex-col justify-center items-center',
            rowGap || responsiveGap
          )}
        >
          {right?.props.children}
        </div>
      </div>
    );
  }

  // Single content in Bottom
  return (
    <div
      className={cn('w-full flex justify-center items-center', colGap || responsiveGap, className)}
    >
      {children}
    </div>
  );
}
SectionBottom.displayName = 'SectionBottom';

function SectionLeft({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('flex flex-col w-full justify-items-center', responsiveGap, className)}>
      {children}
    </div>
  );
}
SectionLeft.displayName = 'SectionLeft';

function SectionRight({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('flex flex-col w-full justify-items-center', responsiveGap, className)}>
      {children}
    </div>
  );
}
SectionRight.displayName = 'SectionRight';

function SectionFull({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}
SectionFull.displayName = 'SectionFull';

// Export all components individually (like Card, CardHeader, etc.)
export { Section, SectionTop, SectionLeft, SectionRight, SectionBottom, SectionFull };
