import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { aboutFallbackData, experienceData, techStackData } from '../../../../content/AboutContent';
import { siteConfig } from '../../../../content/ContentSettings';

export const metadata: Metadata = {
  title: 'About Me | Lennard Zündorf',
  description:
    'Product Manager and Tech Explorer based in Berlin, Germany. Learn more about my professional journey, skills, and projects.'
};

export default function AboutPage() {
  return (
    <main className='container mx-auto px-4 py-16 max-w-6xl'>
      <div className='space-y-16'>
        {/* Hero Section */}
        <section className='text-center space-y-6'>
          <div className='relative inline-block'>
            <div className='absolute -inset-2 bg-accent-light rotate-3 rounded-xl' />
            <Image
              src='/img/avatar.png'
              alt='Lennard Zündorf'
              width={200}
              height={200}
              className='relative rounded-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'
            />
          </div>
          <div className='space-y-4'>
            <h1 className='text-5xl md:text-6xl font-bold relative'>
              <span className='bg-accent text-accent-foreground px-6 py-3 font-medium -rotate-2 inline-block rounded-xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'>
                About Lennard
              </span>
            </h1>
            <p className='text-xl font-mono max-w-3xl mx-auto leading-relaxed'>
              {aboutFallbackData.aboutMeText}
            </p>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className='grid lg:grid-cols-2 gap-12 lg:gap-16'>
          {/* Left Column - Skills & Tech */}
          <div className='space-y-8'>
            {/* Professional Skills */}
            <div>
              <h3 className='text-2xl font-medium font-mono mb-4'>Professional Skills</h3>
              <div className='flex flex-wrap gap-2'>
                {aboutFallbackData.skills.map((skill) => (
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

          {/* Right Column - Experience */}
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

                  <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>{exp.desc}</p>

                  <div className='space-y-6'>
                    {exp.roles.map((role, roleIndex) => (
                      <div
                        key={`${exp.company}-role-${roleIndex}`}
                        className='bg-white dark:bg-[#2A2A2A] p-6 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all rotate-1 hover:-rotate-1'
                      >
                        <div className='flex flex-col sm:flex-row justify-between items-start mb-4'>
                          <h4 className='text-lg font-semibold'>{role.title}</h4>
                          <span className='font-mono text-sm text-gray-500'>{role.range}</span>
                        </div>

                        <ul className='space-y-2 mb-4'>
                          {role.text.map((item, itemIndex) => (
                            <li
                              key={`${exp.company}-role-${roleIndex}-item-${itemIndex}`}
                              className='flex items-start gap-3'
                            >
                              <span className='text-accent font-bold mt-1.5 text-xs'>▶</span>
                              <span className='text-sm leading-relaxed'>{item}</span>
                            </li>
                          ))}
                        </ul>

                        <div className='flex flex-wrap gap-2'>
                          {role.skills.map((skill) => (
                            <span
                              key={skill}
                              className='px-2 py-1 bg-accent-light text-accent-foreground text-xs font-medium border border-black rounded'
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
        </div>

        {/* Contact Section */}
        <section className='text-center'>
          <div className='bg-white dark:bg-[#2A2A2A] p-6 rounded-md border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-1 hover:rotate-0 transition-all'>
            <h3 className='text-xl font-bold mb-4'>Get In Touch</h3>
            <p className='font-mono text-sm mb-4'>
              Feel free to reach out if you'd like to collaborate on a project or just want to
              connect!
            </p>
            <div className='flex gap-3 justify-center'>
              <Link
                href={siteConfig.links.github}
                target='_blank'
                rel='noopener noreferrer'
                className='p-2 bg-accent-light text-accent-foreground border-2 border-black rounded-md hover:bg-accent transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
              >
                GitHub
              </Link>
              <Link
                href={siteConfig.links.linkedin}
                target='_blank'
                rel='noopener noreferrer'
                className='p-2 bg-accent-light text-accent-foreground border-2 border-black rounded-md hover:bg-accent transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
              >
                LinkedIn
              </Link>
              <Link
                href={siteConfig.links.mail}
                className='p-2 bg-accent-light text-accent-foreground border-2 border-black rounded-md hover:bg-accent transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
              >
                Email
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
