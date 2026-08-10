import type { ComponentType } from 'react';
import { Card } from '@/components/ui/retroui/Card';
import { Section } from '@/components/ui/section';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import { M, S } from '@/components/ui/typography';
import { cn } from '@/lib/utils/ui';
import type { MDXComponents } from '@/mdx-components';
import { getMDXComponents } from '@/mdx-components';

/**
 * Minimal shape of a notes page as returned by `notesSource.getPages()`.
 * Structural type — avoids coupling to Fumadocs internals while remaining
 * assignable from the real loader output.
 */
export interface NoteItem {
  data: {
    _title: string;
    tag: string;
    text?: string;
    /** MDX body component injected by Fumadocs at build time. */
    body: ComponentType<{ components: MDXComponents }>;
  };
}

export interface NotesSectionProps {
  notes: NoteItem[];
  /**
   * When set, add the `floaty` class (+ a staggered `animation-delay`) to each
   * card so the neon-effects layer's idle-bob keyframe runs. The animation is
   * gated in CSS (fine pointer + no reduced-motion), so this stays inert on
   * touch / reduced-motion devices — pure enhancement, no layout shift.
   */
  floaty?: boolean;
}

/** Slight alternating rotations for the editorial zine feel (design §Notes). */
const CARD_ROTATIONS = ['-rotate-1', 'rotate-1'] as const;

/**
 * Notes section — `id="notes"`.
 *
 * Renders note cards in a 3-column grid (1-col on mobile, 3-col at lg).
 * Each card is slightly rotated and lifts on hover. MDX body is rendered via
 * `getMDXComponents()` when present; falls back to the `text` frontmatter
 * field. The optional `floaty` flag adds the neon-effects idle-bob (`floaty`
 * class + staggered delay), which is CSS-gated to desktop pointers.
 */
export function NotesSection({ notes, floaty = false }: NotesSectionProps) {
  const components = getMDXComponents();

  return (
    <Section
      id='notes'
      as='section'
      fullHeight={false}
      centerContent={false}
      padding='px-6 py-12 md:py-16'
    >
      {/* Eyebrow: // scratchpad — Space Mono, muted, uppercase, wide tracking */}
      <SectionEyebrow className='tracking-[0.12em]'>{'// scratchpad'}</SectionEyebrow>

      {/* 3-col grid: 1-col on mobile, 3-col at lg (design §Notes mobile open-question) */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 w-full'>
        {notes.map((note, i) => {
          const Body = note.data.body;
          const rotation = CARD_ROTATIONS[i % CARD_ROTATIONS.length];

          return (
            <Card
              key={note.data._title}
              className={cn(
                rotation,
                'transition-all duration-200 cursor-default',
                // Hover lift: translate toward shadow + deepen shadow (design §Elevation)
                'hover:-translate-x-px hover:-translate-y-px hover:shadow-2xl',
                // Idle-bob enhancement (CSS-gated to desktop pointers in globals.css)
                floaty && 'floaty'
              )}
              // Stagger each card's bob so they don't move in lockstep. Negative
              // delay starts each mid-cycle (no initial pause); inert unless the
              // gated `.floaty` animation is active.
              style={floaty ? { animationDelay: `${-i * 1.5}s` } : undefined}
            >
              <Card.Header>
                {/* Accent tag — mono, uppercase, small (design §Note card) */}
                <S as='span' color='accent' className='font-mono uppercase tracking-widest'>
                  {note.data.tag}
                </S>
                <Card.Title>{note.data._title}</Card.Title>
              </Card.Header>
              <Card.Content>
                {/*
                 * Prefer MDX body (rich content); fall back to plain `text`
                 * frontmatter when body is absent. Both are valid per the
                 * notes schema (tech.md §Open Questions #2).
                 */}
                {Body ? (
                  <div className='[&>*]:mt-0'>
                    <Body components={components} />
                  </div>
                ) : note.data.text ? (
                  <M color='muted'>{note.data.text}</M>
                ) : null}
              </Card.Content>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
