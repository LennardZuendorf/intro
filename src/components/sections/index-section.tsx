import type { AboutSection, HeroSection } from 'basehub-types';
import React from 'react';
import { HiMiniArrowTopRightOnSquare } from 'react-icons/hi2';
import { RichTextBlock as RichText } from '@/components/shared/richtext-block';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { IconLink } from '@/components/ui/icon-link';
import { MasonryColumn, MasonryGrid, MasonryRow } from '@/components/ui/masonry-grid';
import { NeoBadge } from '@/components/ui/neoBadge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { H1, H3, L, M, S } from '@/components/ui/typography';
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
    <section id='index' className='w-full max-w-[1536px] mx-auto my-6 px-6 py-6 overflow-visible'>
      {/* Mobile Layout - Order: Intro → Current Role → Indexed → Work Experience → LaunchCanvas */}
      <div className='block md:hidden space-y-3 pb-4'>
        {/* 1. Intro Card */}
        <Card id='hero-card-mobile' className='relative w-full mb-3'>
          <CardHeader className='p-2 pb-1.5'>
            <H1>I'm Lennard</H1>
          </CardHeader>
          <CardContent className='p-2 pt-0'>
            {heroContent.mainHeroText?.json?.content ? (
              <div className='font-mono leading-relaxed'>
                <RichText>{heroContent.mainHeroText.json.content as React.ReactNode}</RichText>
              </div>
            ) : (
              <L className='font-mono leading-relaxed'>
                Full-stack product leader crafting digital experiences. I blend technical expertise
                with business acumen to build products that matter.
              </L>
            )}
          </CardContent>
        </Card>

        {/* 2. Current Role Card */}
        {heroContent.selectedExperience && (
          <Card id='current-role-card-mobile' className='relative w-full mb-3'>
            <CardHeader className='p-2 pb-1.5'>
              <div className='absolute -top-2 -right-2'>
                <NeoBadge variant='dark' className='font-mono'>
                  <M className='font-mono'>💼 Current Role</M>
                </NeoBadge>
              </div>
              <H3>{heroContent.selectedExperience._title}</H3>
            </CardHeader>
            <CardContent className='p-2 pt-0 space-y-2'>
              <div id='current-role-content' className='max-w-none'>
                <M className='font-mono leading-relaxed text-sm'>
                  {heroContent.selectedExperience.shortDescription}
                </M>
              </div>
              <div id='current-role-cta' className='flex justify-start'>
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

        {/* 3. Special Cards - First one is the big one (Indexed) */}
        {heroContent.specialCards && heroContent.specialCards.length > 0 && (
          <div className='w-full mb-3'>
            <ProjectCard project={heroContent.specialCards[0]} className='h-[450px] w-full' />
          </div>
        )}

        {/* 4. Work Experience Card */}
        <Card className='relative flex w-full flex-col mb-3' shadow='lg'>
          <CardHeader className='p-2 pb-1.5'>
            <div className='absolute -top-2 -left-2 z-[100]'>
              <NeoBadge variant='dark' className='font-mono'>
                <M className='font-mono'>Experiences</M>
              </NeoBadge>
            </div>
            <H3>Work Experience</H3>
          </CardHeader>
          <CardContent className='p-2 pt-0'>
            <ScrollArea className='h-[180px] w-full'>
              <div className='flex flex-col gap-2 pr-3'>
                {aboutContent.experiences.items.map((exp, index) => (
                  <React.Fragment key={`experience-mobile-${exp._id}`}>
                    <ExperienceCard experience={exp} className='w-full' />
                    {index < aboutContent.experiences.items.length - 1 && (
                      <Separator className='my-2' />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* 5. Other Special Cards (2nd and 3rd) */}
        {heroContent.specialCards &&
          heroContent.specialCards.length > 1 &&
          heroContent.specialCards.slice(1).map((project) => (
            <div key={project._id} className='w-full mb-3'>
              <ProjectCard project={project} className='h-[300px] w-full' />
            </div>
          ))}
      </div>

      {/* Desktop Layout - Original structure */}
      <div className='hidden md:block pb-4'>
        <MasonryGrid className='max-w-full'>
          {/* Left Column (35%) - Flows independently, fills height for visual balance */}
          <MasonryColumn fillHeight={true} rowSpan={3}>
            {/* Intro Card */}
            <Card id='hero-card' className='relative w-full mb-3'>
              <CardHeader className='p-2 pb-1.5 md:p-3 md:pb-2'>
                <H1>I'm Lennard</H1>
              </CardHeader>
              <CardContent className='p-2 pt-0 md:p-3 md:pt-0'>
                {heroContent.mainHeroText?.json?.content ? (
                  <div className='font-mono leading-relaxed'>
                    <RichText>{heroContent.mainHeroText.json.content as React.ReactNode}</RichText>
                  </div>
                ) : (
                  <M className='font-mono leading-relaxed'>Welcome to my portfolio</M>
                )}
              </CardContent>
            </Card>

            {/* Mission Statement - Hidden on mobile/tablet, visible on desktop */}
            <Card variant='invisible' className='relative w-full mb-3'>
              <CardContent className='p-2 md:p-3'>
                <div className='font-mono leading-relaxed text-center space-y-1.5'>
                  <div className='flex flex-wrap items-center justify-center gap-2'>
                    <NeoBadge variant='light' className='font-mono' size='sm' interactive='lift'>
                      Building products
                    </NeoBadge>
                    <S>that combine</S>
                    <NeoBadge variant='default' className='font-mono' size='sm' interactive='lift'>
                      strategic vision
                    </NeoBadge>
                  </div>
                  <div className='flex flex-wrap items-center justify-center gap-2'>
                    <S>with</S>
                    <NeoBadge variant='dark' className='font-mono' size='sm' interactive='lift'>
                      technical excellence.
                    </NeoBadge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Role Card */}
            {heroContent.selectedExperience && (
              <Card id='current-role-card' className='relative w-full mb-3'>
                <CardHeader className='p-2 pb-1.5 md:p-3 md:pb-2'>
                  <div className='absolute -top-2 -right-2 md:-top-3 md:-right-3'>
                    <NeoBadge variant='dark' className='font-mono'>
                      <M className='font-mono'>💼 Current Role</M>
                    </NeoBadge>
                  </div>
                  <H3>{heroContent.selectedExperience._title}</H3>
                </CardHeader>
                <CardContent className='p-2 pt-0 md:p-3 md:pt-0 space-y-2'>
                  <div id='current-role-content' className='max-w-none'>
                    <M className='font-mono leading-relaxed text-sm'>
                      {heroContent.selectedExperience.shortDescription}
                    </M>
                  </div>
                  <div id='current-role-cta' className='flex justify-start'>
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

            {/* Random Topic Placeholder */}
            <Card className='relative w-full mb-3'>
              <CardHeader className='p-2 pb-1.5 md:p-3 md:pb-2'>
                <div className='absolute -top-2 -left-2 md:-top-3 md:-left-3'>
                  <NeoBadge variant='default' className='font-mono'>
                    <M className='font-mono'>📌 Topic</M>
                  </NeoBadge>
                </div>
                <H3>Coming Soon</H3>
              </CardHeader>
              <CardContent className='p-2 pt-0 md:p-3 md:pt-0 space-y-3'>
                <div className='w-full h-32 md:h-40 flex items-center justify-center rounded-md border border-border bg-muted/30'>
                  <div className='space-y-1.5 w-full px-6'>
                    <div className='h-2 bg-border rounded w-3/4' />
                    <div className='h-2 bg-border rounded w-full' />
                    <div className='h-2 bg-border rounded w-5/6' />
                    <div className='flex gap-2 mt-3'>
                      <div className='h-6 w-16 bg-border rounded' />
                      <div className='h-6 w-20 bg-border rounded' />
                    </div>
                  </div>
                </div>
                <M>This space is reserved for something interesting. Stay tuned!</M>
              </CardContent>
            </Card>
          </MasonryColumn>

          {/* Right Column (65%) - Natural content flow, no forced height */}
          <MasonryColumn fillHeight={true} rowSpan={3}>
            {/* Two Project Cards Side by Side */}
            <MasonryRow fillHeight={true}>
              {/* Work Experience Card - now in row, LaunchCanvas size */}
              <Card className='relative flex w-full h-full flex-1 flex-col' shadow='lg'>
                <CardHeader className='p-2 pb-1.5 md:p-3 md:pb-2'>
                  <div className='absolute -top-2 -left-2 md:-top-3 md:-left-3 z-[100]'>
                    <NeoBadge variant='dark' className='font-mono'>
                      <M className='font-mono'>Experiences</M>
                    </NeoBadge>
                  </div>
                  <H3>Work Experience</H3>
                </CardHeader>
                <CardContent className='p-2 pt-0 md:p-3 md:pt-0'>
                  <ScrollArea className='h-[180px] md:h-[200px] w-full'>
                    <div className='flex flex-col gap-2 pr-3'>
                      {aboutContent.experiences.items.map((exp, index) => (
                        <React.Fragment key={`experience-${exp._id}`}>
                          <ExperienceCard experience={exp} className='w-full' />
                          {index < aboutContent.experiences.items.length - 1 && (
                            <Separator className='my-2' />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Other Special Cards (2nd and 3rd) - smaller cards */}
              {heroContent.specialCards &&
                heroContent.specialCards.length > 1 &&
                heroContent.specialCards.slice(1).map((project) => (
                  <div key={project._id} className='flex w-full h-full flex-1'>
                    <ProjectCard project={project} className='h-full w-full' />
                  </div>
                ))}
            </MasonryRow>

            {/* First Special Card (Indexed) - big card */}
            {heroContent.specialCards && heroContent.specialCards.length > 0 && (
              <div className='w-full flex flex-col mt-3'>
                <ProjectCard project={heroContent.specialCards[0]} className='h-[450px] w-full' />
              </div>
            )}
          </MasonryColumn>
        </MasonryGrid>
      </div>
    </section>
  );
};
