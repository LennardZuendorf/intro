import type { SectionProps as PageSectionProps } from '@/app/(app)/page';
import RichText from '@/components/blocks/RichText';
import { SocialButtons } from '@/components/shared/social-buttons';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { IconLink } from '@/components/ui/icon-link';
import ImageCard from '@/components/ui/image-card';
import { NeoBadge } from '@/components/ui/neoBadge';
import { Section, SectionLeft, SectionRight, SectionTop } from '@/components/ui/section';
import { Code, H1, H3, H4, L, M, S } from '@/components/ui/typography';
import type { Experience, Project, SectionContent } from '@/payload-types';
import configPromise from '@payload-config';
import { getPayload } from 'payload';
import React from 'react';
import { HiMiniArrowTopRightOnSquare } from 'react-icons/hi2';
import { type HeroFallbackData, heroFallbackData } from '../../../content/HeroContent';

// Interface for the component props
interface HeroSectionProps extends PageSectionProps {
  sectionContent?: SectionContent | null;
}

// Fetch selected project data based on ID
const fetchSelectedProject = async (projectId: number | null): Promise<Project | null> => {
  if (!projectId) return null;

  try {
    const payload = await getPayload({ config: configPromise });
    const project = await payload.findByID({
      collection: 'projects',
      id: projectId,
      depth: 1
    });
    return project as Project;
  } catch (error) {
    console.error('Error fetching selected project:', error);
    return null;
  }
};

// Fetch selected experience data based on ID
const fetchSelectedExperience = async (experienceId: number | null): Promise<Experience | null> => {
  if (!experienceId) return null;

  try {
    const payload = await getPayload({ config: configPromise });
    const experience = await payload.findByID({
      collection: 'experiences',
      id: experienceId,
      depth: 1
    });
    return experience as Experience;
  } catch (error) {
    console.error('Error fetching selected experience:', error);
    return null;
  }
};

export const HeroSection = async ({ className, sectionContent }: HeroSectionProps) => {
  // Fetch full project and experience data based on IDs from sectionContent
  const selectedProjectId =
    typeof sectionContent?.selectedProjects === 'number' ? sectionContent?.selectedProjects : null;
  const selectedExperienceId =
    typeof sectionContent?.selectedExperiences === 'number'
      ? sectionContent?.selectedExperiences
      : null;

  const [selectedProject, selectedExperience] = await Promise.all([
    fetchSelectedProject(selectedProjectId),
    fetchSelectedExperience(selectedExperienceId)
  ]);

  // Extract data from fetched PayloadCMS data or use fallback
  const heroData: HeroFallbackData = {
    introText: heroFallbackData.introText,
    projectTitle: selectedProject?.title || heroFallbackData.projectTitle,
    projectDescription: selectedProject?.shortDescription || heroFallbackData.projectDescription,
    projectLink: selectedProject?.slug
      ? `/projects/${selectedProject.slug}`
      : heroFallbackData.projectLink,
    currentRoleTitle: selectedExperience?.position || heroFallbackData.currentRoleTitle,
    currentRoleDescription:
      selectedExperience?.description || heroFallbackData.currentRoleDescription,
    currentRoleLink: selectedExperience?.url || heroFallbackData.currentRoleLink
  };

  const avatarImageUrl =
    typeof sectionContent?.avatar === 'object' && sectionContent?.avatar?.url
      ? sectionContent?.avatar.url
      : null;

  return (
    <section id='hero'>
      <Section
        background='grid'
        className={className}
        centerContent={true}
        containerClassName='justify-center items-center mx-auto'
      >
        <SectionTop>
          <SectionLeft>
            {/* Hero Card */}
            <Card id='hero-card' className='relative w-full' interactive='slight' rotation='slight'>
              <CardHeader className='p-5 pb-2 md:p-6 md:pb-2 2xl:p-8 2xl:pb-2'>
                <div className='absolute -top-2 -left-2 md:-top-3 md:-left-3'>
                  <NeoBadge
                    variant='light'
                    rotation='medium'
                    className='font-mono'
                    interactive='lift'
                  >
                    <Code>👋 Hey there!</Code>
                  </NeoBadge>
                </div>
                <H1 className='-rotate-1'>I'm Lennard</H1>
              </CardHeader>
              <CardContent className='gap-4 p-5 pt-0 md:p-6 md:pt-0 2xl:p-8 2xl:pt-0'>
                <div className='grid grid-cols-1 items-center justify-center gap-2 mb-3 md:grid-cols-3'>
                  <div className='md:col-span-2'>
                    {sectionContent?.MainIntroSection ? (
                      <RichText
                        className='font-mono leading-relaxed'
                        data={sectionContent.MainIntroSection}
                      />
                    ) : (
                      <M className='font-mono leading-relaxed'>{heroData.introText}</M>
                    )}
                  </div>

                  <ImageCard
                    imageUrl={avatarImageUrl || '/img/avatar.png'}
                    alt='Profile picture'
                    className='hidden md:block relative min-w-[30px] md:w-[10vw] shadow-sm'
                    aspectRatio='aspect-square'
                    hideCaption={true}
                    rotation='medium'
                    interactive='slight'
                    variant='outline'
                  />
                </div>

                <div className='flex flex-wrap gap-2 md:gap-3'>
                  <NeoBadge variant='default' rotation='slight' interactive='bounce'>
                    <L>Product</L>
                  </NeoBadge>
                  <NeoBadge variant='dark' rotation='negative' interactive='wiggle'>
                    <L>Technology</L>
                  </NeoBadge>
                  <NeoBadge variant='light' rotation='medium' interactive='lift'>
                    <L>Business</L>
                  </NeoBadge>
                </div>
              </CardContent>

              <CardFooter className='pl-5'>
                {/* Social Buttons */}
                <div id='hero-social-buttons' className='mt-1'>
                  <SocialButtons iconSize='1.25rem' buttonVariant='default' />
                </div>
              </CardFooter>
            </Card>

            {/* Description */}
            <div
              id='hero-mission-statement'
              className='hidden md:block relative font-mono leading-relaxed text-center lg:text-left'
            >
              <NeoBadge
                variant='light'
                rotation='slight'
                className='font-mono'
                size='lg'
                interactive='grow'
              >
                Building digital products
              </NeoBadge>{' '}
              that combine{' '}
              <NeoBadge
                variant='default'
                rotation='negative'
                className='font-mono'
                size='lg'
                interactive='wiggle'
              >
                strategic vision
              </NeoBadge>{' '}
              with{' '}
              <NeoBadge
                variant='dark'
                rotation='negative'
                className='font-mono'
                size='lg'
                interactive='bounce'
              >
                technical excellence.
              </NeoBadge>
            </div>
          </SectionLeft>

          <SectionRight>
            {/*Project Card*/}
            <Card
              id='project-card'
              className='relative w-full'
              interactive='medium'
              rotation='medium'
            >
              <CardHeader className='p-5 pb-2 md:p-6 md:pb-2 2xl:p-8 2xl:pb-2'>
                <div className='absolute -top-2 -right-2 md:-top-3 md:-right-3'>
                  <NeoBadge
                    variant='dark'
                    rotation='slight'
                    className='font-mono'
                    interactive='bounce'
                  >
                    <Code>Latest Project:</Code>
                  </NeoBadge>
                </div>
                <H3 className='rotate-1'>{heroData.projectTitle}</H3>
              </CardHeader>
              <CardContent className='p-5 pt-0 md:p-6 md:pt-0 2xl:p-8 2xl:pt-0'>
                <div id='project-content' className='max-w-none mb-3'>
                  <M className='font-mono leading-relaxed'>{heroData.projectDescription}</M>
                </div>
                <div id='project-cta' className='flex justify-start'>
                  <IconLink
                    href={heroData.projectLink}
                    icon={<HiMiniArrowTopRightOnSquare className='h-4 w-4' />}
                    variant='default'
                    size='default'
                    iconPosition='right'
                  >
                    Learn more
                  </IconLink>
                </div>
              </CardContent>
            </Card>

            <Card
              id='current-role-card'
              className='relative w-full'
              interactive='slight'
              rotation='slightNegative'
            >
              <CardHeader className='p-5 pb-2 md:p-6 md:pb-2 2xl:p-8 2xl:pb-2'>
                <div className='absolute -top-2 -right-2 md:-top-3 md:-right-3'>
                  <NeoBadge
                    variant='dark'
                    rotation='medium'
                    className='font-mono'
                    interactive='bounce'
                  >
                    <Code>Current Role</Code>
                  </NeoBadge>
                </div>
                <H3 className='rotate-1'>{heroData.currentRoleTitle}</H3>
              </CardHeader>
              <CardContent className='p-5 pt-0 md:p-6 md:pt-0 2xl:p-8 2xl:pt-0'>
                <div id='current-role-content' className='max-w-none mb-3'>
                  <M className='font-mono leading-relaxed'>{heroData.currentRoleDescription}</M>
                </div>
                <div id='current-role-cta' className='flex justify-start'>
                  <IconLink
                    href={heroData.currentRoleLink}
                    icon={<HiMiniArrowTopRightOnSquare className='h-4 w-4' />}
                    variant='default'
                    size='default'
                    iconPosition='right'
                  >
                    Learn more
                  </IconLink>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div
              id='hero-navigation-buttons'
              className='flex flex-col sm:flex-row gap-3 md:gap-4 2xl:gap-6 items-stretch sm:items-center justify-center mt-3 md:mt-4 2xl:mt-6'
            >
              <IconLink
                href='/#about'
                icon={<HiMiniArrowTopRightOnSquare className='h-4 w-4 lg:h-5 lg:w-5' />}
                variant='action'
                className='lg:py-2 2xl:py-3'
                size='lg'
                iconPosition='right'
              >
                Learn More About Me
              </IconLink>
              <IconLink
                href='/#projects'
                icon={<HiMiniArrowTopRightOnSquare className='h-4 w-4 lg:h-5 lg:w-5' />}
                variant='action'
                className='hidden sm:block lg:py-2 2xl:py-3'
                size='lg'
                iconPosition='right'
              >
                View My Projects
              </IconLink>
            </div>
          </SectionRight>
        </SectionTop>
      </Section>
    </section>
  );
};
