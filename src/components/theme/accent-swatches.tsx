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
      className={cn(
        'flex items-center gap-1.5 rounded-base border border-border/50 bg-secondary/50 px-1.5 py-1',
        className
      )}
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
              'relative size-5 rounded-base border border-border/50 transition-all duration-150',
              'hover:scale-105 active:scale-95',
              isActive && 'ring-1 ring-foreground/30 ring-offset-1 ring-offset-background'
            )}
            style={{ backgroundColor: swatch }}
          />
        );
      })}
    </div>
  );
}
