import type { AboutSection, HeroSection } from 'basehub-types';
import React from 'react';
import { HiMiniArrowTopRightOnSquare } from 'react-icons/hi2';
import { RichTextBlock as RichText } from '@/components/shared/richtext-block';
import { SocialButtons } from '@/components/shared/social-buttons';
import { BentoCell, BentoGrid } from '@/components/ui/bento-grid';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { IconLink } from '@/components/ui/icon-link';
import { NeoBadge } from '@/components/ui/neoBadge';
import { Separator } from '@/components/ui/separator';
import { H1, H3, M } from '@/components/ui/typography';
import ExperienceCard from './components/experience-card';
import ProjectCard from './components/project-card';

export const IndexSection = async ({
  heroContent,
  aboutContent
}: {
  heroContent: HeroSection;
  aboutContent: AboutSection;
}) => {
  return (
    <section
      id='index'
      className='w-full max-w-[1536px] mx-auto my-6 px-3 md:px-6 py-6 overflow-visible'
    >
      <BentoGrid>
        {/* ── Hero Card (1×2) ── */}
        <BentoCell area='hero'>
          <Card id='hero-card' className='relative w-full h-full'>
            <CardHeader>
              <H1>I'm Lennard</H1>
            </CardHeader>
            <CardContent className='space-y-3'>
              {heroContent.mainHeroText?.json?.content ? (
                <div className='font-mono leading-relaxed'>
                  <RichText>{heroContent.mainHeroText.json.content as React.ReactNode}</RichText>
                </div>
              ) : (
                <M className='font-mono leading-relaxed'>
                  Full-stack product leader crafting digital experiences.
                </M>
              )}

              {/* Mission badges */}
              <div className='flex flex-wrap items-center gap-2'>
                <NeoBadge variant='light' size='sm' interactive='lift'>
                  Building products
                </NeoBadge>
                <NeoBadge variant='default' size='sm' interactive='lift'>
                  Strategic vision
                </NeoBadge>
                <NeoBadge variant='dark' size='sm' interactive='lift'>
                  Technical excellence
                </NeoBadge>
              </div>
            </CardContent>
          </Card>
        </BentoCell>

        {/* ── Stride Card (2×2) ── */}
        <BentoCell area='stride'>
          {heroContent.specialCards?.[0] && (
            <ProjectCard project={heroContent.specialCards[0]} className='w-full h-full' />
          )}
        </BentoCell>

        {/* ── Current Role Card (1×1) ── */}
        <BentoCell area='role'>
          {heroContent.selectedExperience && (
            <Card id='current-role-card' className='relative w-full h-full'>
              <CardHeader>
                <div className='absolute -top-2 -right-2 md:-top-3 md:-right-3'>
                  <NeoBadge variant='dark'>Current Role</NeoBadge>
                </div>
                <H3>{heroContent.selectedExperience._title}</H3>
              </CardHeader>
              <CardContent className='space-y-2'>
                <M className='font-mono leading-relaxed'>
                  {heroContent.selectedExperience.shortDescription}
                </M>
                <div className='flex justify-start'>
                  <IconLink
                    href={heroContent.selectedExperience.companyLink || '#'}
                    icon={<HiMiniArrowTopRightOnSquare className='h-4 w-4' />}
                    variant='default'
                    size='default'
                    iconPosition='right'
                  >
                    Learn More
                  </IconLink>
                </div>
              </CardContent>
            </Card>
          )}
        </BentoCell>

        {/* ── Indexed Card (1×1) ── */}
        <BentoCell area='indexed'>
          {heroContent.specialCards?.[1] && (
            <ProjectCard project={heroContent.specialCards[1]} className='w-full h-full' />
          )}
        </BentoCell>

        {/* ── Shards Card (1×1) ── */}
        <BentoCell area='shards'>
          {heroContent.specialCards?.[2] && (
            <ProjectCard project={heroContent.specialCards[2]} className='w-full h-full' />
          )}
        </BentoCell>

        {/* ── Career Card (1×1) ── */}
        <BentoCell area='career'>
          <Card className='relative w-full h-full' shadow='lg'>
            <CardHeader>
              <div className='absolute -top-2 -left-2 md:-top-3 md:-left-3 z-10'>
                <NeoBadge variant='dark'>Experience</NeoBadge>
              </div>
              <H3>Career</H3>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col'>
                {aboutContent.experiences.items.map((exp, index) => (
                  <React.Fragment key={`experience-${exp._id}`}>
                    <ExperienceCard experience={exp} isLatest={index === 0} className='w-full' />
                    {index < aboutContent.experiences.items.length - 1 && (
                      <Separator className='my-1' />
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className='flex justify-start pt-2'>
                <IconLink href='/about' variant='default' size='sm'>
                  Full Details
                </IconLink>
              </div>
            </CardContent>
          </Card>
        </BentoCell>

        {/* ── Connect Card (2×1) ── */}
        <BentoCell area='connect'>
          <Card className='relative w-full h-full' variant='accent'>
            <CardHeader>
              <H3>Let's Build Something Together</H3>
            </CardHeader>
            <CardContent className='space-y-3'>
              <M>
                I'm always interested in new projects, collaborations, and conversations about
                product and technology.
              </M>
              <SocialButtons buttonVariant='default' />
            </CardContent>
          </Card>
        </BentoCell>
      </BentoGrid>
    </section>
  );
};
