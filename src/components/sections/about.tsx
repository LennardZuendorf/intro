import type { ComponentType } from 'react';
import { NeoBadge } from '@/components/ui/neoBadge';
import { Section } from '@/components/ui/section';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import type { MDXComponents } from '@/mdx-components';
import { getMDXComponents } from '@/mdx-components';

interface AboutSectionProps {
  /** MDX body component from homeSource.getPage([]).data.body */
  body: ComponentType<{ components: MDXComponents }>;
  /** Fact chip strings from home/index.mdx frontmatter */
  facts: string[];
}

/**
 * About section — id="about".
 *
 * Renders the home/index.mdx bio body via getMDXComponents(), stripping the
 * leading `# I'm Lennard` h1 so it doesn't compete with the hero. Fact chips
 * are driven by the `facts` prop (content-defined, never hardcoded).
 *
 * Server component — no client boundary needed.
 */
export function AboutSection({ body: Body, facts }: AboutSectionProps) {
  // Strip the leading "# I'm Lennard" h1 — it competes with the hero name.
  // All other MDX elements (HoverLink, inline links, paragraphs) remain intact.
  const components = getMDXComponents({
    h1: () => null
  });

  return (
    <Section id='about' as='section' fullHeight={false} centerContent={false} data-reveal>
      {/* Eyebrow: "// about" — Space Mono, muted, lowercase after slashes (design.md) */}
      <SectionEyebrow className='tracking-widest normal-case'>{'// about'}</SectionEyebrow>

      {/* Accent vertical bar + rich bio MDX */}
      <div className='flex gap-4 md:gap-6'>
        <div className='w-1 shrink-0 self-stretch rounded-full bg-accent' aria-hidden='true' />
        <div className='flex-1 [&>*:first-child]:mt-0'>
          <Body components={components} />
        </div>
      </div>

      {/* Fact chips: pill, card fill, accent dot, mono text (design.md) */}
      {facts.length > 0 && (
        <div className='flex flex-wrap gap-2'>
          {facts.map((fact) => (
            <NeoBadge
              key={fact}
              size='sm'
              shadow='sm'
              className='bg-card text-card-foreground font-mono'
            >
              <span
                className='mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle'
                aria-hidden='true'
              />
              {fact}
            </NeoBadge>
          ))}
        </div>
      )}
    </Section>
  );
}
