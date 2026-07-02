import Link from 'next/link';
import { Section } from '@/components/ui/section';
import { M, Muted, S } from '@/components/ui/typography';
import type { Social } from '@/lib/socials';
import { cn } from '@/lib/utils/ui';

interface ContactSectionProps {
  socials: readonly Social[];
}

/** Derive a short display handle from a social URL. */
function getHandle(social: Social): string {
  const { url, _id } = social;
  if (url.startsWith('mailto:')) return url.replace('mailto:', '');
  try {
    const segments = new URL(url).pathname.split('/').filter(Boolean);
    const last = segments[segments.length - 1] ?? '';
    return _id === 'linkedin' ? last : `@${last}`;
  } catch {
    return url;
  }
}

/**
 * Contact section — id="contact".
 * Stacked full-width link rows: label … handle ↗
 * Row hover fills accent + grows shadow.
 */
export function ContactSection({ socials }: ContactSectionProps) {
  return (
    <Section
      as='section'
      id='contact'
      fullHeight={false}
      centerContent={false}
      padding='px-6 py-12 md:py-20 2xl:py-24'
    >
      <div data-reveal>
        <Muted className='uppercase tracking-widest'>{'// elsewhere'}</Muted>
      </div>

      <div className='w-full flex flex-col border-t-2 border-border' data-reveal>
        {socials.map((social) => {
          const handle = getHandle(social);
          const isMailto = social.url.startsWith('mailto:');

          return (
            <Link
              key={social._id}
              href={social.url}
              target={isMailto ? undefined : '_blank'}
              rel={isMailto ? undefined : 'noopener noreferrer'}
              className={cn(
                'group flex items-center justify-between w-full',
                'border-b-2 border-border py-4 md:py-5',
                'transition-all duration-200',
                'hover:bg-accent hover:shadow-md hover:shadow-shadow'
              )}
            >
              <M as='span' className='group-hover:text-accent-foreground transition-colors'>
                {social._title}
              </M>

              <div className='flex items-center gap-3'>
                <S
                  as='span'
                  color='muted'
                  className={cn(
                    'font-mono tracking-tight',
                    'group-hover:text-accent-foreground transition-colors'
                  )}
                >
                  {handle}
                </S>
                <S
                  as='span'
                  className='group-hover:text-accent-foreground transition-colors'
                  aria-hidden='true'
                >
                  ↗
                </S>
              </div>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
