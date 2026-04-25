'use client';

import { ExternalLink, Github } from 'lucide-react';
import { type ComponentType, useMemo } from 'react';
import {
  IndexedHoverVisual,
  ObsidianTaskHoverVisual,
  ShardsAgentsHoverVisual,
  StrideHoverVisual,
  type VisualProps
} from '@/components/sections/components/projects/hover-visuals';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { NeoBadge } from '@/components/ui/neoBadge';
import { H4, Link, S, XS } from '@/components/ui/typography';
import { isExternalUrl } from '@/lib/utils/ui';

const visualMap: Record<string, ComponentType<VisualProps>> = {
  indexed: IndexedHoverVisual,
  'shards-agent': ShardsAgentsHoverVisual,
  'obsidian-task-ui': ObsidianTaskHoverVisual,
  stride: StrideHoverVisual
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
                  const Icon = isGh ? Github : ExternalLink;
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
