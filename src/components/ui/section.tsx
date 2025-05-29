'use client';

import { BackgroundGrid } from '@/components/ui/background-grid';
import { cn } from '@/lib/utils/ui';
import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import React from 'react';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Content for the section */
  children: ReactNode;
  /** Enable full viewport height */
  fullHeight?: boolean;
  /** Background variant */
  background?: 'default' | 'grid' | 'secondary' | 'accent';
  /** Max width for the content container */
  maxWidth?: string;
  /** Container width style */
  containerWidth?: string;
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
  /** Gap size between elements */
  gap?: 'sm' | 'md' | 'lg';
  /** Container width preset */
  width?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

// Gap scales
const gapScale = {
  sm: 'gap-2 md:gap-4 lg:gap-6 2xl:gap-8',
  md: 'gap-4 md:gap-8 lg:gap-12 2xl:gap-16',
  lg: 'gap-6 md:gap-12 lg:gap-16 2xl:gap-20'
};

// Width presets
const widthPresets = {
  sm: 'min(92%, 768px)',
  md: 'min(92%, 1024px)',
  lg: 'min(92%, 1280px)',
  xl: 'min(92%, 1536px)',
  full: '100%'
};

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
  maxWidth,
  containerWidth = 'clamp(100%, 80vw, 1600px)',
  padding = 'px-6 py-8 md:py-12 2xl:py-16',
  containerClassName,
  gridSize = '80px',
  maskIntensity = 40,
  centerContent = true,
  as: Element = 'section',
  gap = 'md',
  width,
  ...props
}: SectionProps) {
  // Determine maxWidth from width preset or use provided maxWidth
  const finalMaxWidth = width ? widthPresets[width] : maxWidth || widthPresets.lg;

  // Base section classes
  const sectionClasses = cn(
    'w-full relative',
    fullHeight && 'min-h-[100svh]',
    'flex items-center justify-center',
    backgroundVariants[background],
    className
  );

  // Container for content
  const containerClasses = cn(
    'w-full flex',
    'flex-col',
    centerContent && 'items-center justify-center',
    padding,
    gapScale[gap],
    containerClassName
  );

  // Content is just children, no legacy columns support
  const content: ReactNode = children;

  // Common content container
  const contentContainer = (
    <div
      className={containerClasses}
      style={{
        maxWidth: finalMaxWidth,
        width: containerWidth
      }}
    >
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

// Compositional components
function SectionTop({ children, gap = 'md' }: { children: ReactNode; gap?: 'sm' | 'md' | 'lg' }) {
  // Detect if Top contains Left/Right for column layout
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
    // Column layout within Top
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
        className={cn('grid w-full', 'grid-cols-1 lg:grid-cols-2', 'auto-rows-auto', gapScale[gap])}
      >
        <div className='w-full col-span-1 flex flex-col gap-4 md:gap-6 lg:gap-8'>
          {left?.props.children}
        </div>
        <div className='w-full col-span-1'>{right?.props.children}</div>
      </div>
    );
  }

  // Single content in Top
  return <div className='w-full'>{children}</div>;
}
SectionTop.displayName = 'SectionTop';

function SectionBottom({
  children,
  gap = 'md'
}: { children: ReactNode; gap?: 'sm' | 'md' | 'lg' }) {
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
        className={cn('grid w-full', 'grid-cols-1 lg:grid-cols-2', 'auto-rows-auto', gapScale[gap])}
      >
        <div className='w-full col-span-1 flex flex-col gap-4 md:gap-6 lg:gap-8'>
          {left?.props.children}
        </div>
        <div className='w-full col-span-1'>{right?.props.children}</div>
      </div>
    );
  }

  // Single content in Bottom
  return <div className='w-full'>{children}</div>;
}
SectionBottom.displayName = 'SectionBottom';

function SectionLeft({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
SectionLeft.displayName = 'SectionLeft';

function SectionRight({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
SectionRight.displayName = 'SectionRight';

// Export all components individually (like Card, CardHeader, etc.)
export { Section, SectionTop, SectionLeft, SectionRight, SectionBottom };
