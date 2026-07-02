import type { ComponentType } from 'react';
import { Card } from '@/components/ui/retroui/Card';
import { Section } from '@/components/ui/section';
import { M, Muted, S } from '@/components/ui/typography';
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
   * Forward a `data-floaty` attribute on each card so the neon-effects layer
   * can attach idle-bob animations later. Does NOT build any motion itself.
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
 * field. The optional `floaty` flag adds a `data-floaty` hook for the
 * neon-effects enhancement layer without building any motion here.
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
      <Muted className='uppercase tracking-[0.12em]'>{'// scratchpad'}</Muted>

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
                'hover:-translate-x-px hover:-translate-y-px hover:shadow-2xl'
              )}
              // Hook for neon-effects floaty idle-bob enhancement
              {...(floaty ? { 'data-floaty': 'true' } : {})}
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
