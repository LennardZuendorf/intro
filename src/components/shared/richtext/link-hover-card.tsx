'use client';

import { ExternalLink } from 'lucide-react';
import { HoverCard, HoverCardContent } from '@/components/ui/hover-card';
import { NeoBadge } from '@/components/ui/neoBadge';
import { H4, Link, S, XS } from '@/components/ui/typography';
import { isExternalUrl } from '@/lib/utils/ui';
import { HoverCardInlineTrigger } from './hover-card-inline-trigger';

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

  const domain = (() => {
    if (!url) return '';
    try {
      return new URL(url.startsWith('http') ? url : `https://${url}`).hostname;
    } catch {
      return url;
    }
  })();

  return (
    <span style={{ display: 'inline' }}>
      <HoverCard>
        <HoverCardInlineTrigger
          render={
            <Link
              href={href}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
            >
              {displayText}
            </Link>
          }
        />
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
