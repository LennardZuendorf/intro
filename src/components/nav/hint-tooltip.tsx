import type { ReactNode } from 'react';
import { Kbd } from '@/components/ui/kbd';

export const PALETTE_TOOLTIP = (
  <>
    Open Nav Menu with <Kbd className='text-accent'>shift</Kbd> +{' '}
    <Kbd className='text-accent'>/</Kbd> or <Kbd className='text-accent'>cmd</Kbd> +{' '}
    <Kbd className='text-accent'>k</Kbd>
  </>
);

export function ShortcutBadge({ children }: { children: ReactNode }) {
  return (
    <Kbd className='h-auto min-w-0 rounded-sm border-border/60 bg-muted/40 px-1 py-0.5 text-[10px] leading-none opacity-80'>
      {children}
    </Kbd>
  );
}
