'use client';

import { cn } from '@/lib/utils/ui';
import type React from 'react';

interface BackgroundGridProps {
  className?: string;
  children: React.ReactNode;
  maskType?: 'radial' | 'linear' | 'none';
  gridSize?: number;
  gridColor?: string;
}

export const BackgroundGrid = ({
  className,
  children,
  maskType = 'radial',
  gridSize = 80,
  gridColor = 'var(--grid)'
}: BackgroundGridProps) => {
  // Generate mask based on type
  const getMaskImage = () => {
    switch (maskType) {
      case 'radial':
        return 'radial-gradient(circle at center, black 40%, transparent 100%)';
      case 'linear':
        return 'linear-gradient(to bottom, black 0%, transparent 100%)';
      case 'none':
        return 'none';
      default:
        return 'radial-gradient(circle at center, black 40%, transparent 100%)';
    }
  };

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Grid background with mask */}
      <div
        className='absolute inset-0 w-full h-full z-[1] pointer-events-none'
        style={{
          backgroundImage: `
            linear-gradient(to right, ${gridColor} 1px, transparent 1px),
            linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
          maskImage: getMaskImage()
        }}
      />

      {/* Content with higher z-index */}
      <div className='relative z-[2]'>{children}</div>
    </div>
  );
};
