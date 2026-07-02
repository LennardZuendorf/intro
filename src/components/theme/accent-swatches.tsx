'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils/ui';
import { useAccent } from './accent-provider';
import { ACCENT_LABELS } from './accents';

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
      role='group'
      aria-label='Accent color'
    >
      {options.map((swatch) => {
        const isActive = mounted && accent === swatch;
        return (
          <button
            key={swatch}
            type='button'
            aria-pressed={isActive}
            aria-label={`${ACCENT_LABELS[swatch]} accent`}
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
