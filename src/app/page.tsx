import { Pump } from 'basehub/react-pump';
import type {
  AboutSection as AboutSectionType,
  HeroSection as HeroSectionType,
  Skills as SkillsType,
  Socials as SocialsType
} from 'basehub-types';
import { GithubIcon, LinkedinIcon, MailIcon } from 'lucide-react';
import type { NextPage } from 'next';
import { draftMode } from 'next/headers';
import { Banner } from '@/components/banner';
import AboutSection from '@/components/sections/about';
import { HeroSection } from '@/components/sections/hero';
import { Projects } from '@/components/sections/projects';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { IconLink } from '@/components/ui/icon-link';
import { NeoBadge } from '@/components/ui/neoBadge';
import { Section } from '@/components/ui/section';
import { Code, H1, L, M } from '@/components/ui/typography';

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
              avatarImage: {
                url: true,
                alt: true
              },
              selectedProject: {
                _id: true,
                _title: true,
                _slug: true,
                shortDescription: true,
                showcaseLink: true
              },
              selectedExperience: {
                _id: true,
                _title: true,
                companyDescription: true,
                companyLink: true
              },
              callToAction: {
                ctaText: {
                  json: {
                    content: true
                  }
                },
                ctaLink: true
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
                  companyDescription: true,
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
            <div className='min-h-screen'>
              <Section background='grid' containerClassName='justify-center items-center mx-auto'>
                <Card
                  className='w-full max-w-lg mx-auto'
                  variant='default'
                  rotation='slight'
                  interactive='slight'
                >
                  <CardHeader className='p-6'>
                    <div className='absolute -top-2 -left-2'>
                      <NeoBadge variant='light' rotation='medium' interactive='lift'>
                        <Code>👋 Hey there!</Code>
                      </NeoBadge>
                    </div>
                    <H1 className='-rotate-1'>I'm Lennard</H1>
                  </CardHeader>
                  <CardContent className='p-6 pt-0 space-y-4'>
                    <M className='font-mono leading-relaxed'>
                      Full-stack product leader crafting digital experiences. I blend technical
                      expertise with business acumen to build products that matter.
                    </M>
                    <div className='flex flex-wrap gap-2'>
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
            </div>
          );
        }

        return (
          <div className='min-h-screen'>
            <HeroSection
              content={data.sectionsAndPages.heroSection as unknown as HeroSectionType}
              socials={data.globals.socials.items as unknown as SocialsType}
              showAbout={data.globals.showAbout}
              showProjects={data.globals.showProjects}
            />
            {data.globals?.showAbout === true && (
              <AboutSection
                content={data.sectionsAndPages.aboutSection as unknown as AboutSectionType}
                skills={data.types.skills.items as unknown as SkillsType}
              />
            )}
            {data.globals?.showProjects === true && (
              <Projects className='border-t-4 border-border' />
            )}
            <Banner />
          </div>
        );
      }}
    </Pump>
  );
};

export default Page;
