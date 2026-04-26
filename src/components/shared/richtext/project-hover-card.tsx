'use client';

import { ExternalLink } from 'lucide-react';

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='currentColor'
      role='img'
      aria-label='GitHub'
    >
      <path d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z' />
    </svg>
  );
}

import { type ComponentType, useMemo } from 'react';
import {
  IndexedHoverVisual,
  ObsidianTaskHoverVisual,
  ShardsAgentsHoverVisual,
  type VisualProps
} from '@/components/sections/components/projects/hover-visuals';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { NeoBadge } from '@/components/ui/neoBadge';
import { H4, Link, S, XS } from '@/components/ui/typography';
import { isExternalUrl } from '@/lib/utils/ui';

const visualMap: Record<string, ComponentType<VisualProps>> = {
  indexed: IndexedHoverVisual,
  'shards-agent': ShardsAgentsHoverVisual,
  'obsidian-task-ui': ObsidianTaskHoverVisual
};

export interface ProjectHoverCardProps {
  _id?: string;
  _title: string;
  _slug?: string;
  shortDescription: string;
  color: { hex: string };
  technology: { _id?: string; _title: string }[];
  links: { items: { _id?: string; _title: string; url: string }[] };
  extendedPreview: boolean;
}

export const ProjectHoverCard = (props: ProjectHoverCardProps) => {
  const { _title, _slug, shortDescription, technology, links, color } = props;

  const showcaseUrl = links?.items?.[0]?.url || '#';
  const isExternal = isExternalUrl(showcaseUrl);
  const allLinks = useMemo(() => links?.items?.filter((l) => l.url) ?? [], [links]);

  const Visual = _slug ? visualMap[_slug] : undefined;
  const colorHex = color?.hex || '#3b82f6';

  return (
    <span style={{ display: 'inline' }}>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Link
            href={showcaseUrl}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            style={{ display: 'inline' }}
            className='underline! decoration-1 underline-offset-[3px] decoration-foreground/40 hover:decoration-foreground/70 transition-colors cursor-pointer'
          >
            {_title}
          </Link>
        </HoverCardTrigger>
        <HoverCardContent className={Visual ? 'w-96 overflow-hidden p-0' : 'w-80 p-4'}>
          {Visual && (
            <div className='group/animated-card h-[120px] w-full overflow-hidden bg-primary'>
              <Visual colorHex={colorHex} />
            </div>
          )}
          <div className={Visual ? 'space-y-3 p-4' : 'space-y-3'}>
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
            {allLinks.length > 0 && (
              <div className='flex items-center gap-3 pt-1'>
                {allLinks.map((link) => {
                  const isGh = link.url?.includes('github.com');
                  const Icon = isGh ? GithubIcon : ExternalLink;
                  return (
                    <a
                      key={link._id}
                      href={link.url || '#'}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center gap-1.5 text-primary-foreground/60 no-underline transition-colors hover:underline'
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = colorHex;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '';
                      }}
                    >
                      <Icon className='h-3.5 w-3.5' />
                      <XS>{link._title}</XS>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </HoverCardContent>
      </HoverCard>
    </span>
  );
};
