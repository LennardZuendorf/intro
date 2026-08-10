'use client';

import type { VariantProps } from 'class-variance-authority';
import { Palette } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { buttonVariants } from '@/components/ui/retroui/Button';
import { useAccent } from './accent-provider';
import { ACCENT_LABELS, type Accent } from './accents';
import { IconMenuSelect } from './icon-menu-select';

interface AccentSelectProps {
  className?: string;
  buttonVariant?: VariantProps<typeof buttonVariants>['variant'];
  popoverClassName?: string;
}

export function AccentSelect({
  className,
  buttonVariant = 'default',
  popoverClassName
}: AccentSelectProps) {
  const [mounted, setMounted] = useState(false);
  const { accent, setAccent, options } = useAccent();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <IconMenuSelect
      value={accent}
      onValueChange={(value) => setAccent(value as Accent)}
      options={options.map((swatch) => ({
        value: swatch,
        label: ACCENT_LABELS[swatch as Accent],
        leading: (
          <span
            className='size-4 shrink-0 rounded-base border border-border/50'
            style={{ backgroundColor: swatch }}
            aria-hidden='true'
          />
        )
      }))}
      triggerIcon={<Palette className='h-4 w-4' />}
      ariaLabel='Select accent color'
      buttonVariant={buttonVariant}
      className={className}
      popoverClassName={popoverClassName}
    />
  );
}
