'use client';

import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { H4, M, Muted, S } from '@/components/ui/typography';
import { cn } from '@/lib/utils/ui';
import type { Experience, Tag } from '@/payload-types';

interface ExperienceCardProps {
  experience: Experience;
  className?: string;
}

export default function ExperienceCard({ experience: exp, className }: ExperienceCardProps) {
  const skills = (exp.skills as Tag[] | undefined)?.map((skill) => skill.name) || [];

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
            {exp.company}
            {exp.url && (
              <Link
                href={exp.url}
                target='_blank'
                rel='noopener noreferrer'
                className='text-sm text-gray-500 hover:text-accent-foreground transition-colors'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='14'
                  height='14'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  aria-hidden='true'
                  className='hover:rotate-[10deg] transition-transform'
                >
                  <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' />
                  <polyline points='15 3 21 3 21 9' />
                  <line x1='10' y1='14' x2='21' y2='3' />
                </svg>
              </Link>
            )}
          </H4>
          <Muted className='text-right'>
            {new Date(exp.startDate).getFullYear()} -{' '}
            {exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present'}
          </Muted>
        </div>

        <M className='text-gray-600 dark:text-gray-400 line-clamp-2 !mt-2'>{exp.description}</M>
      </CardHeader>

      <CardContent className='border-t border-gray-200 dark:border-gray-700 pt-3'>
        <div className='flex justify-between items-start mb-2'>
          <M className='font-medium'>{exp.position}</M>
        </div>

        <ul className='list-disc pl-4 space-y-1 mb-3'>
          {exp.responsibilityOne && (
            <li className='text-sm text-gray-600 dark:text-gray-400'>
              <S>{exp.responsibilityOne}</S>
            </li>
          )}
          {exp.responsibilityTwo && (
            <li className='text-sm text-gray-600 dark:text-gray-400'>
              <S>{exp.responsibilityTwo}</S>
            </li>
          )}
        </ul>
      </CardContent>

      <CardFooter className='pt-0'>
        <div className='flex flex-wrap gap-2 w-full'>
          {skills.slice(0, 3).map((skill, i) => (
            <span
              key={`${exp.company}-skill-${skill}`}
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
