import { experienceData, techStackData } from '@/data/about';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: 'About Me | Lennard Zündorf',
  description:
    'Product Manager and Tech Explorer based in Berlin, Germany. Learn more about my professional journey, skills, and projects.'
};

export default function AboutPage() {
  return (
    <main className='min-h-screen py-16 px-4 sm:px-6'>
      <div className='max-w-4xl mx-auto space-y-12'>
        {/* Header */}
        <div className='space-y-4'>
          <Link
            href='/#about'
            className='inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-accent transition-colors'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='mr-1'
              aria-hidden='true'
            >
              <line x1='19' y1='12' x2='5' y2='12' />
              <polyline points='12 19 5 12 12 5' />
            </svg>
            Back to Homepage
          </Link>

          <h1 className='text-4xl font-bold'>About Me</h1>
          <div className='h-1 w-24 bg-accent' />
        </div>

        {/* Bio Section with Image */}
        <div className='relative bg-white dark:bg-[#2A2A2A] p-8 rounded-md border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'>
          <div className='absolute -top-3 -left-3 px-4 py-1 bg-accent-light text-accent-foreground font-mono text-sm border-2 border-black rotate-2 rounded-md'>
            My Journey
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='col-span-2 prose prose-lg dark:prose-invert'>
              <h2 className='text-2xl font-bold mb-4'>My Background</h2>
              <p className='font-mono leading-relaxed'>
                My tech journey began with exploring the intersection of business and technology.
                Studying
                <strong> Business Computing</strong> provided me with a solid foundation in both
                worlds, enabling me to speak the language of developers while understanding business
                objectives.
              </p>
              <p className='font-mono leading-relaxed mt-4'>
                My early career at <strong>Hypoport's Innovation Hub</strong> allowed me to dive
                into innovation processes, new venture development, and business modeling. This
                experience shaped my product thinking and gave me insight into how successful
                products are conceptualized and brought to market.
              </p>
              <p className='font-mono leading-relaxed mt-4'>
                Moving to <strong>Product Strategy at Hypoport Insurance Segment</strong> let me
                apply these principles at scale, working across subsidiaries to optimize product
                development and implementation, leading to my current role at{' '}
                <strong>CHECK24 Flug</strong> where I continue to grow as a Product Manager.
              </p>
            </div>
            <div className='relative hidden md:block'>
              <div className='aspect-square rounded-md border-4 border-black overflow-hidden rotate-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'>
                {/* Replace with your actual image */}
                <div className='w-full h-full bg-accent/20 flex items-center justify-center'>
                  <span className='text-lg font-mono'>Profile Image</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className='space-y-6'>
          <h2 className='text-3xl font-bold relative'>
            <span className='bg-accent text-accent-foreground px-3 py-1.5 font-medium rotate-1 inline-block rounded-md border-2 border-black'>
              Skills & Technologies
            </span>
          </h2>

          <div className='space-y-8'>
            {/* Professional Skills */}
            <div>
              <h3 className='text-2xl font-medium font-mono mb-4'>Professional Skills</h3>
              <div className='flex flex-wrap gap-2'>
                {[
                  'Product Management',
                  'Software Engineering',
                  'Digital Innovation',
                  'Scrum & Kanban',
                  'Software Architecture',
                  'Product Strategy',
                  'Data Science',
                  'Machine Learning',
                  'UX Design'
                ].map((skill) => (
                  <span
                    key={skill}
                    className='px-3 py-1.5 bg-accent-light text-accent-foreground font-medium border-2 border-black rounded-md rotate-1 hover:-rotate-1 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-accent'
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className='text-2xl font-medium font-mono mb-4'>Tech Stack</h3>
              <div className='flex flex-wrap gap-3'>
                {techStackData.map((tech) => (
                  <Link
                    href={tech.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    key={tech.name}
                    className='flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#2A2A2A] border-2 border-black rounded-md hover:rotate-1 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                  >
                    <span className='text-sm font-medium'>{tech.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className='space-y-6'>
          <h2 className='text-3xl font-bold relative' id='work-experiences'>
            <span className='bg-accent-dark text-accent-foreground px-3 py-1.5 font-medium -rotate-1 inline-block rounded-md border-2 border-black'>
              Work Experience
            </span>
          </h2>

          <div className='space-y-12'>
            {experienceData.map((exp) => (
              <div key={exp.company} className='space-y-4'>
                <div className='flex flex-col md:flex-row justify-between items-start'>
                  <h3 className='text-2xl font-bold flex items-center gap-2'>
                    <span>{exp.company}</span>
                    <Link
                      href={exp.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-sm text-gray-500 hover:text-black dark:hover:text-white'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        aria-labelledby='externalLinkTitle'
                      >
                        <title id='externalLinkTitle'>External link</title>
                        <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' />
                        <polyline points='15 3 21 3 21 9' />
                        <line x1='10' y1='14' x2='21' y2='3' />
                      </svg>
                    </Link>
                  </h3>
                  <span className='font-mono text-sm'>{exp.location}</span>
                </div>

                <p className='text-sm text-gray-600 dark:text-gray-400 font-mono'>{exp.desc}</p>

                <div className='space-y-6'>
                  {exp.roles.map((role, roleIndex) => (
                    <div
                      key={role.title}
                      className={`bg-white dark:bg-[#2A2A2A] p-6 rounded-md border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all ${
                        roleIndex % 2 === 0 ? 'hover:-rotate-1' : 'rotate-1 hover:rotate-0'
                      }`}
                    >
                      <div className='flex flex-col md:flex-row justify-between items-start mb-4'>
                        <h4 className='font-bold text-xl'>{role.title}</h4>
                        <span className='font-mono text-sm'>{role.range}</span>
                      </div>

                      <ul className='list-disc pl-5 mb-6 space-y-2 text-sm'>
                        {role.text.map((item, textIndex) => (
                          <li
                            key={`${role.title}-text-${textIndex}`}
                            className='font-mono text-gray-600 dark:text-gray-400'
                          >
                            {item}
                          </li>
                        ))}
                      </ul>

                      <div className='flex flex-wrap gap-2 mt-3'>
                        {role.skills.map((skill) => (
                          <span
                            key={skill}
                            className='px-2 py-1 bg-accent-light/20 text-xs font-medium rounded-md'
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Content - Projects & Contact */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-8'>
          <div className='bg-white dark:bg-[#2A2A2A] p-6 rounded-md border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-1 hover:rotate-0 transition-all'>
            <h3 className='text-xl font-bold mb-4'>Current Projects</h3>
            <p className='font-mono text-sm mb-4'>
              I'm currently focusing on <strong>tempus productivity</strong>, a time-based ToDo App
              inspired by GTD and Pomodoro techniques.
            </p>
            <Link
              href='/projects'
              className='px-4 py-2 bg-accent text-accent-foreground font-medium border-2 border-black rounded-md inline-block hover:-rotate-1 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
            >
              View All Projects
            </Link>
          </div>

          <div className='bg-white dark:bg-[#2A2A2A] p-6 rounded-md border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-1 hover:rotate-0 transition-all'>
            <h3 className='text-xl font-bold mb-4'>Get In Touch</h3>
            <p className='font-mono text-sm mb-4'>
              Feel free to reach out if you'd like to collaborate on a project or just want to
              connect!
            </p>
            <div className='flex gap-3'>
              <Link
                href='https://github.com/lennardz'
                target='_blank'
                rel='noopener noreferrer'
                className='p-2 bg-accent-light text-accent-foreground border-2 border-black rounded-md hover:bg-accent transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
              >
                GitHub
              </Link>
              <Link
                href='https://linkedin.com/in/lennardz'
                target='_blank'
                rel='noopener noreferrer'
                className='p-2 bg-accent-light text-accent-foreground border-2 border-black rounded-md hover:bg-accent transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
              >
                LinkedIn
              </Link>
              <Link
                href='mailto:mail@zuendorf.me'
                className='p-2 bg-accent-light text-accent-foreground border-2 border-black rounded-md hover:bg-accent transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
              >
                Email
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
