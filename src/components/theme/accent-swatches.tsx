'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils/ui';
import { type Accent, useAccent } from './accent-provider';

const SWATCH_LABELS: Record<Accent, string> = {
  '#C6FF2E': 'Lime',
  '#FF2E9A': 'Pink',
  '#21E6E0': 'Cyan',
  '#FF6A1A': 'Orange'
};

interface AccentSwatchesProps {
  className?: string;
}

export function AccentSwatches({ className }: AccentSwatchesProps) {
  const { accent, setAccent, options } = useAccent();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={cn('flex items-center gap-1.5', className)}
      role='radiogroup'
      aria-label='Accent color'
    >
      {options.map((swatch) => {
        const isActive = mounted && accent === swatch;
        return (
          <button
            key={swatch}
            type='button'
            role='radio'
            aria-checked={mounted ? isActive : undefined}
            aria-label={`${SWATCH_LABELS[swatch]} accent`}
            onClick={() => setAccent(swatch)}
            className={cn(
              'relative h-4 w-4 rounded-full border-2 border-border transition-all duration-150',
              'hover:scale-110 active:scale-95',
              isActive && 'ring-2 ring-border ring-offset-2 ring-offset-background'
            )}
            style={{ backgroundColor: swatch }}
          />
        );
      })}
    </div>
  );
}
