import { Pump } from 'basehub/react-pump';
import { RichText } from 'basehub/react-rich-text';
import type {
  AboutSection as AboutSectionType,
  HeroSection as HeroSectionType
} from 'basehub-types';
import { GithubIcon, LinkedinIcon, MailIcon } from 'lucide-react';
import type { NextPage } from 'next';
import { draftMode } from 'next/headers';
import { Banner } from '@/components/banner';
import { Nav } from '@/components/navbar';
import { IndexSection } from '@/components/sections/index-section';
import { BackgroundGrid } from '@/components/ui/background-grid';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { IconLink } from '@/components/ui/icon-link';
import { NeoBadge } from '@/components/ui/neoBadge';
import { Section } from '@/components/ui/section';
import { H1, L, M } from '@/components/ui/typography';
import { env } from '@/env';

export interface SectionProps {
  className?: string;
}

const Page: NextPage = async () => {
  const { isEnabled: draft } = await draftMode();

  return (
    <Pump
      draft={draft}
      queries={[
        {
          sectionsAndPages: {
            heroSection: {
              mainHeroText: {
                json: {
                  content: true
                }
              },
              specialCards: {
                _id: true,
                _title: true,
                _slug: true,
                shortDescription: true,
                showcaseLink: true,
                technology: {
                  _id: true,
                  _title: true,
                  url: true,
                  badgeUrl: true
                }
              },
              selectedExperience: {
                _id: true,
                _title: true,
                shortDescription: true,
                companyLink: true
              }
            },
            aboutSection: {
              aboutMeText: {
                json: {
                  content: true
                }
              },
              quickSkillsShowcase: {
                items: {
                  _id: true,
                  _title: true
                }
              },
              experiences: {
                items: {
                  _id: true,
                  _title: true,
                  shortDescription: true,
                  companyLink: true,
                  startDate: true,
                  endDate: true,
                  jobActivities: {
                    json: {
                      content: true
                    }
                  },
                  skills: {
                    _id: true,
                    _title: true
                  }
                }
              }
            }
          },
          globals: {
            socials: {
              items: {
                _id: true,
                _title: true,
                url: true,
                icon: true
              }
            },
            showAbout: true,
            showProjects: true
          },
          types: {
            skills: {
              items: {
                _id: true,
                _title: true
              }
            }
          }
        }
      ]}
    >
      {async ([data]) => {
        'use server';

        if (!data) {
          return (
            <div className='min-h-screen flex flex-col items-center justify-center'>
              <Section background='grid' containerClassName='justify-center items-center mx-auto'>
                <Card className='w-full max-w-lg mx-auto' variant='default'>
                  <CardHeader className='p-6'>
                    <div className='absolute -top-2 -left-2'>
                      <NeoBadge variant='light' interactive='lift'>
                        <M className='font-mono'>👋 Hey there!</M>
                      </NeoBadge>
                    </div>
                    <H1>I'm Lennard!</H1>
                  </CardHeader>
                  <CardContent className='p-6 pt-0 space-y-4'>
                    <L className='font-mono leading-relaxed'>
                      Full-stack product leader crafting digital experiences. I blend technical
                      expertise with business acumen to build products that matter.
                    </L>
                    <div className='flex flex-wrap gap-2'>
                      <NeoBadge variant='default'>
                        <L>Product</L>
                      </NeoBadge>
                      <NeoBadge variant='dark'>
                        <L>Technology</L>
                      </NeoBadge>
                      <NeoBadge variant='light' interactive='lift'>
                        <L>Business</L>
                      </NeoBadge>
                    </div>
                    <div className='flex gap-3 pt-2'>
                      <IconLink
                        href='/github'
                        icon={<GithubIcon className='h-4 w-4' />}
                        external
                        variant='neutral'
                        size='sm'
                        iconPosition='left'
                      >
                        GitHub
                      </IconLink>
                      <IconLink
                        href='/linkedin'
                        icon={<LinkedinIcon className='h-4 w-4' />}
                        external
                        variant='neutral'
                        size='sm'
                        iconPosition='left'
                      >
                        LinkedIn
                      </IconLink>
                      <IconLink
                        href='/mail'
                        icon={<MailIcon className='h-4 w-4' />}
                        external
                        variant='neutral'
                        size='sm'
                        iconPosition='left'
                      >
                        Mail
                      </IconLink>
                    </div>
                  </CardContent>
                </Card>
              </Section>
              <Banner />
            </div>
          );
        }

        const heroContent = data.sectionsAndPages.heroSection;

        if (env.NEXT_V2_RELEASE === false) {
          return (
            <div className='min-h-screen flex flex-col items-center justify-center'>
              <Section background='grid' containerClassName='justify-center items-center mx-auto'>
                <Card className='w-full max-w-lg mx-auto' variant='default'>
                  <CardHeader>
                    <div className='absolute -top-2 -left-2'>
                      <NeoBadge variant='light' interactive='lift'>
                        <M className='font-mono'>👋 Hey there!</M>
                      </NeoBadge>
                    </div>
                    <H1>I'm Lennard!</H1>
                  </CardHeader>
                  <CardContent className=''>
                    {heroContent.mainHeroText?.json?.content ? (
                      <div className='font-mono leading-relaxed pb-4'>
                        <RichText>{heroContent.mainHeroText.json.content}</RichText>
                      </div>
                    ) : (
                      <M className='font-mono leading-relaxed'>
                        A full-stack product leader crafting digital experiences. I blend technical
                        expertise with business acumen to build products that matter.
                      </M>
                    )}
                    <div className='flex flex-wrap gap-2'>
                      <NeoBadge variant='default'>
                        <L>Product</L>
                      </NeoBadge>
                      <NeoBadge variant='dark'>
                        <L>Technology</L>
                      </NeoBadge>
                      <NeoBadge variant='light' interactive='lift'>
                        <L>Business</L>
                      </NeoBadge>
                    </div>
                    <div className='flex gap-3 pt-2'>
                      <IconLink
                        href='/github'
                        icon={<GithubIcon className='h-4 w-4' />}
                        external
                        variant='neutral'
                        size='sm'
                        iconPosition='left'
                      >
                        GitHub
                      </IconLink>
                      <IconLink
                        href='/linkedin'
                        icon={<LinkedinIcon className='h-4 w-4' />}
                        external
                        variant='neutral'
                        size='sm'
                        iconPosition='left'
                      >
                        LinkedIn
                      </IconLink>
                      <IconLink
                        href='/mail'
                        icon={<MailIcon className='h-4 w-4' />}
                        external
                        variant='neutral'
                        size='sm'
                        iconPosition='left'
                      >
                        Mail
                      </IconLink>
                    </div>
                  </CardContent>
                </Card>
              </Section>
              <Banner />
            </div>
          );
        }

        // Center IndexSection horizontally & vertically, with navbar above it (centered within the top padding area)
        return (
          <BackgroundGrid
            maskType='radial'
            className='flex w-full min-h-screen flex-col relative justify-center items-center'
          >
            <div className='w-full flex justify-center fixed top-0 left-0 z-[9999] pointer-events-none'>
              <div className='pointer-events-auto w-full max-w-[1536px] px-2 md:px-8 pt-3'>
                <Nav
                  socials={data.globals.socials.items}
                  showAbout={data.globals.showAbout}
                  showProjects={data.globals.showProjects}
                />
              </div>
            </div>

            <div className='flex items-center justify-center w-full mt-10 lg:mt-0'>
              <IndexSection
                heroContent={data.sectionsAndPages.heroSection as HeroSectionType}
                aboutContent={data.sectionsAndPages.aboutSection as AboutSectionType}
              />
            </div>
            <Banner />
          </BackgroundGrid>
        );
      }}
    </Pump>
  );
};

export default Page;
