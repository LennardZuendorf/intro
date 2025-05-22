'use client';

import type { experienceData } from '@/data/about';
import Link from 'next/link';

interface ExperienceCardProps {
  experience: (typeof experienceData)[0];
  className?: string;
}

export default function ExperienceCard({ experience: exp, className }: ExperienceCardProps) {
  return (
    <div
      className={`bg-white dark:bg-[#2A2A2A] p-5 rounded-md border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden rotate-[0.3deg] ${className || ''}`}
    >
      <div className='flex justify-between items-start mb-2'>
        <h4 className='font-bold text-lg flex items-center gap-1.5'>
          {exp.company}
          <Link
            href={exp.url}
            target='_blank'
            rel='noopener noreferrer'
            className='text-sm text-gray-500 hover:text-black dark:hover:text-white'
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
        </h4>
        <span className='font-mono text-sm'>{exp.location}</span>
      </div>

      <p className='text-base text-gray-600 dark:text-gray-400 font-mono mb-3 line-clamp-2'>
        {exp.desc}
      </p>

      <div className='border-t border-gray-200 dark:border-gray-700 pt-3'>
        <div className='flex justify-between items-start mb-2'>
          <h5 className='text-base font-medium'>{exp.roles[0].title}</h5>
          <span className='font-mono text-sm'>{exp.roles[0].range}</span>
        </div>

        <ul className='list-disc pl-4 space-y-1'>
          {exp.roles[0].text.slice(0, 2).map((item, i) => (
            <li
              key={`${exp.company}-bullet-${i}`}
              className='text-sm text-gray-600 dark:text-gray-400 font-mono'
            >
              {item}
            </li>
          ))}
        </ul>

        <div className='flex flex-wrap gap-2 mt-3'>
          {exp.roles[0].skills.slice(0, 3).map((skill, i) => (
            <span
              key={`${exp.company}-skill-${skill}`}
              className={`px-2.5 py-0.5 bg-accent-light/20 text-sm font-medium rounded-sm ${i % 2 === 0 ? 'rotate-[0.5deg]' : '-rotate-[0.5deg]'}`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
