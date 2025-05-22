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
  /** Background type */
  background?: 'grid' | 'mask' | 'none';
  /** Background color class */
  bgColor?: string;
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
  /** Mask intensity (0-100) */
  maskIntensity?: number;
  /** Number of columns */
  columns?: 1 | 2;
  /** Render as a different HTML element */
  as?: ElementType;
  /** Center content (adds justify-center) */
  centerContent?: boolean;
}

const defaultGap = 'gap-4 md:gap-8 lg:gap-12 2xl:gap-16';
const defaultColumnGap = 'gap-4 md:gap-8 lg:gap-12 2xl:gap-16';

function Section({
  children,
  className,
  fullHeight = true,
  background = 'none',
  bgColor = 'bg-main',
  maxWidth = 'min(92%, 1280px)',
  containerWidth = 'clamp(100%, 80vw, 1600px)',
  padding = 'px-6 py-8 md:py-12 2xl:py-16',
  containerClassName,
  gridSize = '80px',
  maskIntensity = 40,
  columns = 1,
  centerContent = true,
  as: Element = 'section',
  ...props
}: SectionProps) {
  // Base section classes
  const sectionClasses = cn(
    'w-full relative',
    fullHeight && 'min-h-[100svh]',
    'flex items-center justify-center',
    bgColor,
    className
  );

  // Container for content
  const containerClasses = cn(
    'w-full flex',
    columns === 2 ? 'flex-col lg:flex-row' : 'flex-col',
    centerContent && 'items-center justify-center',
    padding,
    defaultGap,
    containerClassName
  );

  // If columns=2, expect Section.Left, Section.Right, and Section.Bottom as children
  let content: ReactNode = children;
  if (columns === 2) {
    // Filter out Section.Left, Section.Right, and Section.Bottom children
    const left = React.Children.toArray(children).find(
      (child: React.ReactNode) =>
        React.isValidElement(child) &&
        typeof child.type !== 'string' &&
        (child.type as { displayName?: string })?.displayName === 'SectionLeft'
    ) as React.ReactElement<{ children?: React.ReactNode }> | undefined;
    const right = React.Children.toArray(children).find(
      (child: React.ReactNode) =>
        React.isValidElement(child) &&
        typeof child.type !== 'string' &&
        (child.type as { displayName?: string })?.displayName === 'SectionRight'
    ) as React.ReactElement<{ children?: React.ReactNode }> | undefined;
    const bottom = React.Children.toArray(children).find(
      (child: React.ReactNode) =>
        React.isValidElement(child) &&
        typeof child.type !== 'string' &&
        (child.type as { displayName?: string })?.displayName === 'SectionBottom'
    ) as React.ReactElement<{ children?: React.ReactNode }> | undefined;
    content = (
      <div
        className={cn(
          'grid w-full',
          'grid-cols-1 lg:grid-cols-2',
          'auto-rows-auto',
          defaultColumnGap,
          'gap-y-6 2xl:gap-y-8'
        )}
      >
        <div className='w-full col-span-1 flex flex-col gap-4 md:gap-6 lg:gap-8'>
          {left?.props.children}
        </div>
        <div className='w-full col-span-1'>{right?.props.children}</div>
        {bottom && (
          <div className='w-full col-span-1 lg:col-span-2 mt-2 lg:mt-4 2xl:mt-6'>
            {bottom?.props.children}
          </div>
        )}
      </div>
    );
  }

  // Common content container
  const contentContainer = (
    <div
      className={containerClasses}
      style={{
        maxWidth,
        width: containerWidth
      }}
    >
      {content}
    </div>
  );

  // Masked grid background (for footer-style)
  if (background === 'mask') {
    return (
      <Element className={cn(sectionClasses, 'z-0')} {...props}>
        <div
          className='absolute inset-0 w-full h-full pointer-events-none z-[1]'
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--grid) 1px, transparent 1px),
              linear-gradient(to bottom, var(--grid) 1px, transparent 1px)
            `,
            backgroundSize: `${gridSize} ${gridSize}`,
            maskImage: `radial-gradient(circle at center, black ${maskIntensity}%, transparent 100%)`
          }}
        />
        <div className='relative z-[2] w-full flex items-center justify-center'>
          {contentContainer}
        </div>
      </Element>
    );
  }

  // Background grid (for hero-style)
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

function Left({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
Left.displayName = 'SectionLeft';

function Right({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
Right.displayName = 'SectionRight';

function Bottom({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
Bottom.displayName = 'SectionBottom';

Section.Left = Left;
Section.Right = Right;
Section.Bottom = Bottom;

export { Section };
