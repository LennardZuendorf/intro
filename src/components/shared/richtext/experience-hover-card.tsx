'use client';

import { HoverCard, HoverCardContent } from '@/components/ui/hover-card';
import { NeoBadge } from '@/components/ui/neoBadge';
import { Button } from '@/components/ui/retroui/Button';
import { H4, Link, S, XS } from '@/components/ui/typography';
import { isExternalUrl } from '@/lib/utils/ui';
import { HoverCardInlineTrigger } from './hover-card-inline-trigger';

function formatDateRange(startDate: string, endDate: string | null): string {
  const start = new Date(startDate);
  const formatDate = (d: Date) =>
    d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  if (!endDate) return `${formatDate(start)} — Present`;
  return `${formatDate(start)} — ${formatDate(new Date(endDate))}`;
}

export interface ExperienceHoverCardProps {
  _id?: string;
  _title: string;
  _slug?: string;
  companyTitle: string | null;
  companyLink: string;
  shortDescription: string;
  startDate: string;
  endDate?: string | null;
  skills: { _id?: string; _title: string }[];
}

export const ExperienceHoverCard = (props: ExperienceHoverCardProps) => {
  const { _title, shortDescription, companyTitle, companyLink, startDate, endDate, skills } = props;

  const isExternal = isExternalUrl(companyLink);
  const displayText = companyTitle || _title;

  return (
    <span style={{ display: 'inline' }}>
      <HoverCard>
        {companyLink ? (
          <HoverCardInlineTrigger
            render={
              <Link
                href={companyLink}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
              >
                {displayText}
              </Link>
            }
          />
        ) : (
          <HoverCardInlineTrigger
            render={
              <Button
                type='button'
                variant='link'
                className='h-auto min-h-0 !border-0 !p-0 !shadow-none hover:!translate-y-0 active:!translate-y-0 active:!translate-x-0 font-inherit hover:!shadow-none'
              >
                {displayText}
              </Button>
            }
          />
        )}
        <HoverCardContent className='w-96 p-4'>
          <div className='space-y-3'>
            <H4>{_title}</H4>
            <XS className='text-primary-foreground/70'>
              {companyTitle} · {formatDateRange(startDate, endDate ?? null)}
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
