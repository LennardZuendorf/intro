'use client';

import type { ExperienceComponent as ExperienceData } from 'basehub-types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { H4, S, SMuted } from '@/components/ui/typography';
import { cn } from '@/lib/utils/ui';

interface ExperienceCardProps {
  experience: ExperienceData;
  className?: string;
}

export default function ExperienceCard({ experience: exp, className }: ExperienceCardProps) {
  const skills = exp.skills?.map((skill) => skill._title) || [];

  return (
    <Card
      className={cn('w-full h-[300px] overflow-hidden', className)}
      rotation='none'
      shadow='none'
      interactive='slight'
    >
      <CardHeader className='pb-3'>
        <div className='flex justify-between items-start'>
          <H4 className='flex items-center gap-1.5'>
            {exp._title} @ {exp.companyTitle}
          </H4>
          <SMuted className='text-right'>
            {exp.startDate ? new Date(exp.startDate).getFullYear() : ''} -{' '}
            {exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present'}
          </SMuted>
        </div>
        <S className='text-gray-600 dark:text-gray-400 line-clamp-2 !mt-2'>
          {exp.shortDescription}
        </S>{' '}
      </CardHeader>

      <CardContent className='border-t border-gray-200 dark:border-gray-700 pt-3'>
        {/* Job activities/responsibilities content */}
        <div className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
          {exp.jobActivities?.json?.content ? (
            <div className='prose prose-sm'>
              {/* Rich text content would be rendered here - simplified for now */}
              <S>Job responsibilities and activities</S>
            </div>
          ) : (
            <S>Experience details</S>
          )}
        </div>
      </CardContent>

      <CardFooter className='pt-0'>
        <div className='flex flex-wrap gap-2 w-full'>
          {skills.slice(0, 3).map((skill, i) => (
            <span
              key={`${exp._id}-skill-${skill}`}
              className={`px-2.5 py-0.5 bg-accent-light/20 text-sm font-medium rounded-sm ${i % 2 === 0 ? 'rotate-[0.5deg]' : '-rotate-[0.5deg]'}`}
            >
              {skill}
            </span>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
