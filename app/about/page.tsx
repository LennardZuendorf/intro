import * as React from 'react';
import type { Metadata } from 'next';
import { H2, H4, L, Muted } from '@/components/ui/typography';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { experienceData, techStackData } from '@/data/about';
import { siteConfig, siteMetadata } from '@/data/site';
import { cn } from '@/lib/utils';
import { BrandIcon } from '@/components/custom/brand-icons';
import { ExperienceAccordion } from '@/components/pages/experience-accordion';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn more about Lennard Zündorf - Product Manager and Software Engineer with expertise in full-stack development, innovation management, and building digital products.',
  alternates: {
    canonical: `${siteMetadata.siteUrl}/about`
  },
  openGraph: {
    title: 'About | Lennard Zündorf',
    description:
      'Learn more about Lennard Zündorf - Product Manager and Software Engineer with expertise in full-stack development, innovation management, and building digital products.',
    url: `${siteMetadata.siteUrl}/about`,
    type: 'profile'
  }
};

export default function AboutPage() {
  return (
    <div className='flex flex-col justify-center items-center gap-4 lg:gap-8 py-8'>
      <Card key='intro' className='w-full text-start' id='about-me'>
        <CardHeader className='flex flex-col space-y-2 p-4'>
          <H2 className='font-black font-title'>About Me</H2>
        </CardHeader>
        <CardContent className='flex flex-col justify-start gap-4 p-4'>
          <p className='text-muted-foreground'>
            I&apos;m a <strong>Product Manager</strong> passionate about building great digital
            products. With a background in software engineering and innovation management, I bridge
            the gap between technology and business to create meaningful user experiences.
          </p>
          <p className='text-muted-foreground'>
            Currently working at CHECK24 Flug in Berlin, focusing on payment systems and backend
            product development. I enjoy tackling complex problems and turning ideas into impactful
            solutions.
          </p>

          <H4>I Work On</H4>
          <Muted>
            Check out my
            <Link
              className='pl-1 text-primary underline-offset-4 hover:underline font-semibold'
              href={siteConfig.links.github}
            >
              GitHub
            </Link>
          </Muted>
          <p className='text-muted-foreground'>
            I work on various projects spanning full-stack development, machine learning, and
            product tools. My focus areas include building productivity applications, exploring
            AI/ML applications, and contributing to open-source projects.
          </p>

          <div className='space-y-2 pt-4'>
            <Card className={cn('border-0')}>
              <CardHeader className='p-2'>
                <L className='font-semibold'>Technologies I Commonly Use</L>
              </CardHeader>
              <CardContent className='flex flex-wrap lg:grid lg:grid-cols-12 gap-2 p-2 pb-2'>
                {techStackData.map((tech) => (
                  <BrandIcon
                    brand={tech.icon}
                    title={tech.name}
                    className='h-6 w-6'
                    key={tech.name}
                    link={tech.link}
                  />
                ))}
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      <Card key='experiences' className='w-full' id='work-experiences'>
        <CardHeader className='text-start'>
          <H4 className='font-title'>Work Experiences</H4>
          <Muted>
            Check out my
            <Link
              className='pl-1 text-primary underline-offset-4 hover:underline font-semibold'
              href={siteConfig.links.linkedin}
            >
              LinkedIn Profile
            </Link>
          </Muted>
        </CardHeader>
        <CardContent className=''>
          <ExperienceAccordion experienceData={experienceData} />
        </CardContent>
      </Card>
    </div>
  );
}
