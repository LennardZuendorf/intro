'use client';

import type { ExperienceComponent } from 'basehub-types';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { NeoBadge } from '@/components/ui/neoBadge';
import { H4, Link, S, XS } from '@/components/ui/typography';
import { isExternalUrl } from '@/lib/utils/ui';

function formatDateRange(startDate: string, endDate: string | null): string {
  const start = new Date(startDate);
  const formatDate = (d: Date) =>
    d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  if (!endDate) return `${formatDate(start)} — Present`;
  return `${formatDate(start)} — ${formatDate(new Date(endDate))}`;
}

export const ExperienceHoverCard = (props: ExperienceComponent) => {
  const { _title, shortDescription, companyTitle, companyLink, startDate, endDate, skills } = props;

  const isExternal = isExternalUrl(companyLink);
  const displayText = companyTitle || _title;

  return (
    <span style={{ display: 'inline' }}>
      <HoverCard>
        <HoverCardTrigger asChild>
          {companyLink ? (
            <Link
              href={companyLink}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              style={{ display: 'inline' }}
              className='underline! decoration-1 underline-offset-[3px] decoration-foreground/40 hover:decoration-foreground/70 transition-colors cursor-pointer'
            >
              {displayText}
            </Link>
          ) : (
            <button
              type='button'
              style={{ display: 'inline' }}
              className='appearance-none bg-transparent border-none p-0 m-0 font-inherit cursor-pointer underline! decoration-1 underline-offset-[3px] decoration-foreground/40 hover:decoration-foreground/70 transition-colors'
            >
              {displayText}
            </button>
          )}
        </HoverCardTrigger>
        <HoverCardContent className='w-96 p-4'>
          <div className='space-y-3'>
            <H4>{_title}</H4>
            <XS className='text-primary-foreground/70'>
              {companyTitle} · {formatDateRange(startDate, endDate)}
            </XS>
            <S>{shortDescription}</S>
            {skills && skills.length > 0 && (
              <div className='flex flex-wrap gap-1'>
                {skills.map((s) => (
                  <NeoBadge key={s._id} size='sm' variant='outline'>
                    {s._title}
                  </NeoBadge>
                ))}
              </div>
            )}
          </div>
        </HoverCardContent>
      </HoverCard>
    </span>
  );
};
