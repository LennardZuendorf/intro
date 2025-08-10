import { RichText } from 'basehub/react-rich-text';
import type { HeroSection as HeroSectionType, Socials as SocialsType } from 'basehub-types';
import { CheckCircle2Icon } from 'lucide-react';
import { HiMiniArrowTopRightOnSquare } from 'react-icons/hi2';
import { SocialButtons } from '@/components/shared/social-buttons';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { IconLink } from '@/components/ui/icon-link';
import ImageCard from '@/components/ui/image-card';
import { NeoBadge } from '@/components/ui/neoBadge';
import {
  Section,
  SectionBottom,
  SectionLeft,
  SectionRight,
  SectionTop
} from '@/components/ui/section';
import { Code, H1, H3, L, M } from '@/components/ui/typography';

export const HeroSection = async ({
  content,
  socials,
  showAbout,
  showProjects
}: {
  content: HeroSectionType;
  socials: SocialsType;
  showAbout: boolean;
  showProjects: boolean;
}) => {
  return (
    <section id='hero'>
      <Section background='grid' containerClassName='justify-center items-center mx-auto'>
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
                    {content.mainHeroText?.json?.content ? (
                      <div className='font-mono leading-relaxed'>
                        <RichText>{content.mainHeroText.json.content}</RichText>
                      </div>
                    ) : (
                      <M className='font-mono leading-relaxed'>Welcome to my portfolio</M>
                    )}
                  </div>

                  {content.avatarImage?.url && (
                    <ImageCard
                      imageUrl={content.avatarImage.url}
                      alt={content.avatarImage.alt || 'Profile picture'}
                      className='hidden md:block relative min-w-[30px] md:w-[10vw] shadow-sm'
                      aspectRatio='aspect-square'
                      hideCaption={true}
                      rotation='medium'
                      interactive='slight'
                      variant='outline'
                    />
                  )}
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
                  <SocialButtons buttonVariant='default' />
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
            {content.selectedProject && (
              <Card
                id='project-card'
                className='relative w-full'
                interactive='medium'
                rotation='medium'
              >
                <CardHeader className='p-5 pb-2 md:p-6 md:pb-2 2xl:p-8 2xl:pb-2'>
                  <div className='absolute -top-2 -left-2 md:-top-3 md:-left-3'>
                    <NeoBadge
                      variant='dark'
                      rotation='slight'
                      className='font-mono'
                      interactive='bounce'
                    >
                      <Code>🚀 My Latest Project</Code>
                    </NeoBadge>
                  </div>
                  <H3 className='rotate-1'>{content.selectedProject._title}</H3>
                </CardHeader>
                <CardContent className='p-5 pt-0 md:p-6 md:pt-0 2xl:p-8 2xl:pt-0'>
                  <div id='project-content' className='max-w-none mb-3'>
                    <M className='font-mono leading-relaxed'>
                      {content.selectedProject.shortDescription?.length > 100
                        ? `${content.selectedProject.shortDescription.slice(0, 100)}...`
                        : content.selectedProject.shortDescription}
                    </M>
                  </div>
                  <div id='project-cta' className='flex justify-start gap-2'>
                    {showProjects && (
                      <IconLink
                        href={`/projects/${content.selectedProject._slug}`}
                        icon={<HiMiniArrowTopRightOnSquare className='h-4 w-4' />}
                        variant='default'
                        size='default'
                        iconPosition='right'
                      >
                        Learn More
                      </IconLink>
                    )}
                    {content.selectedProject.showcaseLink && (
                      <IconLink
                        href={content.selectedProject.showcaseLink || '#'}
                        icon={<HiMiniArrowTopRightOnSquare className='h-4 w-4' />}
                        variant='default'
                        size='default'
                        iconPosition='right'
                      >
                        View Project
                      </IconLink>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {content.selectedExperience && (
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
                      <Code>💼 Current Role</Code>
                    </NeoBadge>
                  </div>
                  <H3 className='rotate-1'>{content.selectedExperience._title}</H3>
                </CardHeader>
                <CardContent className='p-5 pt-0 md:p-6 md:pt-0 2xl:p-8 2xl:pt-0'>
                  <div id='current-role-content' className='max-w-none mb-3'>
                    <M className='font-mono leading-relaxed'>
                      {content.selectedExperience.companyDescription}
                    </M>
                  </div>
                  <div id='current-role-cta' className='flex justify-start'>
                    <IconLink
                      href={content.selectedExperience.companyLink || '#'}
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

            {/* Action Buttons */}
            <div
              id='hero-navigation-buttons'
              className='flex flex-col sm:flex-row gap-3 md:gap-4 2xl:gap-6 items-stretch sm:items-center justify-center mt-3 md:mt-4 2xl:mt-6'
            >
              {showAbout && (
                <IconLink
                  href='/#about'
                  icon={<HiMiniArrowTopRightOnSquare className='h-4 w-4 lg:h-5 lg:w-5' />}
                  variant='action'
                  className='flex items-center justify-center'
                  size='lg'
                  iconPosition='right'
                >
                  Learn More About Me
                </IconLink>
              )}
              {showProjects && (
                <IconLink
                  href='/#projects'
                  icon={<HiMiniArrowTopRightOnSquare className='h-4 w-4 lg:h-5 lg:w-5' />}
                  variant='action'
                  className='hidden sm:flex items-center justify-center shadow-md'
                  size='lg'
                  iconPosition='right'
                >
                  View My Projects
                </IconLink>
              )}
            </div>
          </SectionRight>
        </SectionTop>

        {content.callToAction && (
          <SectionBottom>
            <Alert>
              <CheckCircle2Icon />
              <AlertTitle>Success! Your changes have been saved</AlertTitle>
              <AlertDescription>
                This is an alert with icon, title and description.
              </AlertDescription>
            </Alert>
          </SectionBottom>
        )}
      </Section>
    </section>
  );
};
