import type { ReactNode } from 'react';
import { DotField } from '@/components/effects/dot-field';
import { Parallax } from '@/components/effects/parallax';
import { NeoBadge } from '@/components/ui/neoBadge';
import { H1, S } from '@/components/ui/typography';
import { siteMeta } from '@/lib/site-meta';
import { cn } from '@/lib/utils/ui';

interface HeroProps {
  /** Optional backdrop slot — neon-effects dot-field will be mounted here. */
  backdrop?: ReactNode;
  /**
   * Short role/tagline rendered in the accent badge.
   * Defaults to the canonical description from siteMeta.
   * page.tsx can pass a CMS-sourced value when available.
   */
  tagline?: string;
  className?: string;
}

/**
 * Hero section: oversized "LENNARD ZÜNDORF" display name, accent role badge,
 * corner labels, and a scroll hint.  Server component — no interactivity owned here;
 * neon-effects parallax is deferred to the backdrop slot.
 */
export function Hero({
  backdrop,
  tagline = siteMeta.description.split('—')[1]?.trim() ?? 'engineer, builder, and writer',
  className
}: HeroProps) {
  return (
    <section
      id='hero'
      className={cn(
        'relative min-h-svh flex flex-col items-center justify-center overflow-hidden',
        className
      )}
    >
      {/*
       * Neon-effects backdrop — below all content, pointer-events-none.
       * Defaults to the accent-aware dot-field, which self-gates to nothing on
       * touch / reduced-motion (no canvas, no layout shift). Callers may override
       * with their own backdrop node.
       */}
      <div className='absolute inset-0 -z-10 pointer-events-none' aria-hidden='true'>
        {backdrop ?? <DotField />}
      </div>

      {/* Corner labels — Space Mono, muted, wide tracking */}
      <S
        as='span'
        color='muted'
        className='absolute top-6 left-6 font-mono uppercase tracking-[0.14em]'
      >
        EST. STOCKHOLM
      </S>
      <S
        as='span'
        color='muted'
        className='absolute top-6 right-6 font-mono uppercase tracking-[0.14em]'
      >
        № 001
      </S>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className='flex flex-col items-center gap-8 px-6 text-center'>
        {/*
         * Display name — Archivo Black, fluid via clamp(), line-height 0.84.
         * mix-blend-difference ensures legibility over the future dot-field canvas
         * in both light and dark modes.
         */}
        <Parallax>
          <H1
            as='h1'
            format={false}
            className={cn(
              'mt-0 font-head font-normal uppercase',
              'leading-[0.84] tracking-[-0.02em]',
              'mix-blend-difference',
              'text-[clamp(2.75rem,11vw,9rem)]'
            )}
          >
            LENNARD ZÜNDORF
          </H1>
        </Parallax>

        {/*
         * Role badge — accent fill, −2° rotation (rotation="medium"), hard shadow.
         * Content is the tagline; replace via props or CMS if copy changes.
         */}
        <NeoBadge rotation='medium' shadow='md' size='md'>
          {tagline}
        </NeoBadge>
      </div>

      {/* Scroll hint */}
      <div className='absolute bottom-8 flex flex-col items-center gap-1'>
        <S as='span' color='muted' className='font-mono uppercase tracking-[0.1em]'>
          ↓ scroll
        </S>
      </div>
    </section>
  );
}
