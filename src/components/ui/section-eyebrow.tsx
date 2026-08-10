import type { ReactNode } from 'react';
import { Muted, S } from '@/components/ui/typography';
import { cn } from '@/lib/utils/ui';

interface SectionEyebrowProps {
  children: ReactNode;
  /** Use `s` for work-style uppercase eyebrows; `muted` for notes/contact style */
  tone?: 'muted' | 's';
  className?: string;
}

export function SectionEyebrow({ children, tone = 'muted', className }: SectionEyebrowProps) {
  if (tone === 's') {
    return (
      <S as='p' className={cn('font-mono tracking-widest uppercase text-muted-foreground', className)}>
        {children}
      </S>
    );
  }

  return (
    <Muted className={cn('font-mono uppercase tracking-widest', className)}>{children}</Muted>
  );
}
