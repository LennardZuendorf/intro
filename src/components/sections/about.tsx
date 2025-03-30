'use client';

import { SectionProps } from '@/app/(app)/page';
import { cn } from '@/lib/utils/ui';

const skills = [
  'TypeScript',
  'React',
  'Node.js',
  'Product Strategy',
  'UX Design',
  'Team Leadership',
  'System Architecture',
  'Cloud Infrastructure',
  'Agile Methods'
];

const experiences = [
  {
    title: 'Senior Product Manager',
    company: 'Company Name',
    period: '2022 - Present',
    description:
      'Leading product strategy and development for enterprise SaaS solutions. Driving innovation and team success.'
  },
  {
    title: 'Product Manager',
    company: 'Previous Company',
    period: '2020 - 2022',
    description:
      'Managed product lifecycle and development of key features. Led cross-functional teams and improved user satisfaction.'
  }
];

export default function AboutSection({ className }: SectionProps) {
  return (
    <section
      className={cn(
        'min-h-[100svh] w-full relative overflow-hidden',
        'flex items-center justify-center',
        'bg-[#F8F5F1] dark:bg-[#1A1A1A] z-0',
        className
      )}
      id='about'
    >
      {/* Grid background with mask */}
      <div
        className='absolute inset-0 w-full h-full z-[1] pointer-events-none'
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--grid) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
        }}
      />

      <div className='relative w-full max-w-6xl mx-auto px-6 py-16 z-[2]'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          {/* Left Column - About Text */}
          <div className='space-y-8'>
            <div className='relative'>
              <div className='absolute -top-3 -left-3 px-4 py-1 bg-accent-light text-atext font-mono text-sm border-2 border-black rotate-2 rounded-md'>
                About Me
              </div>
              <div className='bg-white dark:bg-[#2A2A2A] p-8 rounded-md border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'>
                <div className='prose prose-lg dark:prose-invert'>
                  <p className='font-mono leading-relaxed'>
                    I&apos;m a Product Manager and Tech Explorer passionate about building digital
                    products that combine strategic vision with technical excellence. With
                    experience in both product strategy and hands-on development, I bridge the gap
                    between business goals and technical implementation.
                  </p>
                  <p className='font-mono leading-relaxed mt-4'>
                    Currently focused on enterprise SaaS solutions, I lead cross-functional teams in
                    developing innovative products that solve real user problems while maintaining
                    technical excellence.
                  </p>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className='space-y-4'>
              <h3 className='text-2xl font-bold relative'>
                <span className='bg-accent text-atext px-3 py-1.5 font-medium rotate-1 inline-block rounded-md border-2 border-black'>
                  Skills & Expertise
                </span>
              </h3>
              <div className='flex flex-wrap gap-2'>
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className='px-3 py-1.5 bg-accent-light text-atext font-medium border-2 border-black rounded-md rotate-1 hover:-rotate-1 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-accent'
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Experience */}
          <div className='space-y-8'>
            <h3 className='text-2xl font-bold relative'>
              <span className='bg-accent-dark text-atext px-3 py-1.5 font-medium -rotate-1 inline-block rounded-md border-2 border-black'>
                Experience
              </span>
            </h3>
            <div className='space-y-6'>
              {experiences.map((exp, index) => (
                <div
                  key={exp.title}
                  className={cn(
                    'bg-white dark:bg-[#2A2A2A] p-6 rounded-md border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all',
                    index % 2 === 0 ? 'hover:-rotate-1' : 'rotate-1 hover:rotate-0'
                  )}
                >
                  <div className='flex justify-between items-start mb-2'>
                    <h4 className='font-bold text-lg'>{exp.title}</h4>
                    <span className='font-mono text-sm'>{exp.period}</span>
                  </div>
                  <h5 className='font-mono text-sm mb-2'>{exp.company}</h5>
                  <p className='font-mono text-sm text-gray-600 dark:text-gray-400'>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
