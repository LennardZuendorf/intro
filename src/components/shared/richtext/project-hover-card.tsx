'use client';

import type { ProjectComponent } from 'basehub-types';
import { ExternalLink } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { NeoBadge } from '@/components/ui/neoBadge';
import { H4, Link, S, XS } from '@/components/ui/typography';
import { isExternalUrl } from '@/lib/utils/ui';

export const ProjectHoverCard = (props: ProjectComponent) => {
  const { _title, shortDescription, technology, links } = props;

  const showcaseUrl = links?.items?.[0]?.url || '#';
  const isExternal = isExternalUrl(showcaseUrl);
  let domain = '';
  if (showcaseUrl !== '#') {
    try {
      domain = new URL(showcaseUrl.startsWith('http') ? showcaseUrl : `https://${showcaseUrl}`)
        .hostname;
    } catch {
      domain = showcaseUrl;
    }
  }

  return (
    <span style={{ display: 'inline' }}>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Link
            href={showcaseUrl}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            style={{ display: 'inline' }}
            className='!underline decoration-1 underline-offset-[3px] decoration-foreground/40 hover:decoration-foreground/70 transition-colors cursor-pointer'
          >
            {_title}
          </Link>
        </HoverCardTrigger>
        <HoverCardContent className='w-96 p-4'>
          <div className='space-y-3'>
            <H4>{_title}</H4>
            <S>{shortDescription}</S>
            {technology && technology.length > 0 && (
              <div className='flex flex-wrap gap-1'>
                {technology.map((t) => (
                  <NeoBadge key={t._id} size='sm' variant='outline'>
                    {t._title}
                  </NeoBadge>
                ))}
              </div>
            )}
            {domain && (
              <div className='flex items-center gap-2 text-primary-foreground/70 pt-1'>
                <ExternalLink className='h-3 w-3' />
                <XS>{domain}</XS>
              </div>
            )}
          </div>
        </HoverCardContent>
      </HoverCard>
    </span>
  );
};
