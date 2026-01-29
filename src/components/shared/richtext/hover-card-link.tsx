'use client';

import { ExternalLink } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Link } from '@/components/ui/typography';

export interface HoverCardLinkComponentProps {
  url?: string | null;
  _title?: string | null;
  description?: string | null;
  text?: string | null;
  _id?: string;
  __typename?: string;
}

export const HoverCardLinkComponent = ({
  url,
  _title,
  description,
  text
}: HoverCardLinkComponentProps) => {
  const isExternal = url?.startsWith('http') || url?.startsWith('//');
  const displayText = text || _title || url || 'this link';
  const href = url || '#';

  // Extract domain from URL for display
  const domain = url ? new URL(url.startsWith('http') ? url : `https://${url}`).hostname : '';

  return (
    <span style={{ display: 'inline' }}>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Link
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            style={{ display: 'inline' }}
            className='!underline underline-offset-4 hover:!text-primary-foreground hover:opacity-80 transition-all cursor-pointer'
          >
            {displayText}
          </Link>
        </HoverCardTrigger>
        <HoverCardContent className='w-80 p-4'>
          <div className='space-y-3'>
            {_title && (
              <h4 className='font-semibold font-heading text-base leading-tight text-primary-foreground'>
                {_title}
              </h4>
            )}
            {description && (
              <p className='text-sm leading-relaxed text-primary-foreground/90'>{description}</p>
            )}
            {domain && (
              <div className='flex items-center gap-2 text-xs text-primary-foreground/70 pt-1'>
                <ExternalLink className='h-3 w-3' />
                {domain}
              </div>
            )}
          </div>
        </HoverCardContent>
      </HoverCard>
    </span>
  );
};
