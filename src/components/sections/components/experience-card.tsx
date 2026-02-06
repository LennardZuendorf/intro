'use client';

import { NeoBadge } from '@/components/ui/neoBadge';
import { S, SMuted } from '@/components/ui/typography';
import { cn } from '@/lib/utils/ui';

type ExperienceData = {
  _id: string;
  _title: string;
  shortDescription?: string | null;
  companyLink?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  jobActivities?: {
    json?: {
      content?: unknown;
    } | null;
  } | null;
  skills?: Array<{
    _id: string;
    _title: string;
  }> | null;
};

interface ExperienceCardProps {
  experience: ExperienceData;
  className?: string;
  isLatest?: boolean;
}

export default function ExperienceCard({
  experience: exp,
  className,
  isLatest = false
}: ExperienceCardProps) {
  const skills = exp.skills?.map((skill) => skill._title) || [];
  const startYear = exp.startDate ? new Date(exp.startDate).getFullYear() : '';
  const endYear = exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present';

  return (
    <div className={cn('flex items-start gap-3 py-1.5', className)}>
      {/* Year column */}
      <div className='shrink-0 w-[80px] pt-0.5'>
        <SMuted
          className={cn('font-mono whitespace-nowrap', isLatest && 'font-bold text-foreground')}
        >
          {startYear} – {endYear}
        </SMuted>
      </div>

      {/* Content */}
      <div className='flex flex-col gap-1 min-w-0 flex-1'>
        <S className={cn('font-mono', isLatest && 'font-bold')}>{exp._title}</S>

        {skills.length > 0 && (
          <div className='flex flex-wrap gap-1'>
            {skills.slice(0, 3).map((skill) => (
              <NeoBadge
                key={`${exp._id}-skill-${skill}`}
                variant='outline'
                size='sm'
                rotation='none'
                interactive='none'
              >
                {skill}
              </NeoBadge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
