'use client';

import { ExternalLink } from 'lucide-react';
import { useMemo } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { H4, Link, S, XS } from '@/components/ui/typography';
import { isExternalUrl } from '@/lib/utils/ui';

export interface LinkHoverCardProps {
  url?: string | null;
  _title?: string | null;
  description?: string | null;
  text?: string | null;
  _id?: string;
  __typename?: string;
}

export const LinkHoverCard = ({ url, _title, description, text }: LinkHoverCardProps) => {
  const isExternal = isExternalUrl(url);
  const displayText = text || _title || url || 'this link';
  const href = url || '#';

  const domain = useMemo(() => {
    if (!url) return '';
    try {
      return new URL(url.startsWith('http') ? url : `https://${url}`).hostname;
    } catch {
      return url;
    }
  }, [url]);

  return (
    <span style={{ display: 'inline' }}>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Link
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            style={{ display: 'inline' }}
            className='!underline decoration-1 underline-offset-[3px] decoration-foreground/40 hover:decoration-foreground/70 transition-colors cursor-pointer'
          >
            {displayText}
          </Link>
        </HoverCardTrigger>
        <HoverCardContent className='w-80 p-4'>
          <div className='space-y-3'>
            {_title && <H4>{_title}</H4>}
            {description && <S className='text-primary-foreground/90'>{description}</S>}
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
