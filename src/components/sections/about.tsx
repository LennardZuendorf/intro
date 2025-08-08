import { Pump } from 'basehub/react-pump';
import { RichText } from 'basehub/react-rich-text';
import { draftMode } from 'next/headers';
import Image from 'next/image';
import type { SectionProps as PageSectionProps } from '@/app/page';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { NeoBadge } from '@/components/ui/neoBadge';
import {
  Section,
  SectionBottom,
  SectionLeft,
  SectionRight,
  SectionTop
} from '@/components/ui/section';
import { Code, M } from '@/components/ui/typography';
import ExperienceCarousel from './components/experience-carousel';
import SkillsShowcase from './components/skills-showcase';

export default async function AboutSection({ className }: PageSectionProps) {
  const { isEnabled: draft } = await draftMode();

  return (
    <Pump
      draft={draft}
      queries={[
        {
          sectionsAndPages: {
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

        const aboutData = data.sectionsAndPages.aboutSection;
        const skillsData = data.types.skills.items;

        return (
          <section id='about'>
            <Section className={className} background='grid'>
              <SectionTop>
                <SectionLeft>
                  {/* About Me Card */}
                  <div className='relative'>
                    <Card className='relative w-full' interactive='medium' rotation='none'>
                      <CardHeader className='p-5 pb-2 md:p-6 md:pb-2 2xl:p-8 2xl:pb-2'>
                        <div className='absolute -top-4 -left-2 md:-top-5 md:-left-3'>
                          <NeoBadge
                            variant='light'
                            rotation='medium'
                            className='font-mono'
                            interactive='lift'
                          >
                            <Code>About Me</Code>
                          </NeoBadge>
                        </div>
                      </CardHeader>
                      <CardContent className='p-5 pt-0 md:p-6 md:pt-0 2xl:p-8 2xl:pt-0'>
                        <div className='md:col-span-2'>
                          {aboutData.aboutMeText?.json?.content ? (
                            <div className='font-mono leading-relaxed'>
                              <RichText
                                components={{
                                  img: (props) => (
                                    <Image
                                      src={props.src || ''}
                                      alt={props.alt || ''}
                                      width={800}
                                      height={400}
                                      className='rounded-lg border-2 border-black dark:border-white'
                                    />
                                  )
                                }}
                              >
                                {aboutData.aboutMeText.json.content}
                              </RichText>
                            </div>
                          ) : (
                            <M className='font-mono leading-relaxed'>Welcome to my about section</M>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Quick Stats Card */}
                  <div className='hidden md:block relative'>
                    <Card
                      className='relative w-full'
                      interactive='slight'
                      rotation='slightNegative'
                    >
                      <CardHeader className='p-5 pb-2 md:p-6 md:pb-2 2xl:p-8 2xl:pb-2'>
                        <div className='absolute -top-4 -left-2 md:-top-5 md:-left-3'>
                          <NeoBadge
                            variant='dark'
                            rotation='slight'
                            className='font-mono'
                            interactive='lift'
                          >
                            <Code>Quick Stats</Code>
                          </NeoBadge>
                        </div>
                      </CardHeader>
                      <CardContent className='p-4 pt-0 md:p-5 md:pt-0 2xl:p-6 2xl:pt-0'>
                        <div className='grid grid-cols-4 gap-2'>
                          {aboutData.quickSkillsShowcase.items.map((quickStat, index) => (
                            <div key={quickStat._id || index} className='text-center'>
                              <M className='font-mono font-bold'>{quickStat._title}</M>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </SectionLeft>

                <SectionRight>
                  {/* Experience Section - Carousel */}
                  <div className='relative'>
                    <Card
                      className='relative w-full'
                      interactive='none'
                      rotation='slight'
                      shadow='none'
                      variant='invisible'
                    >
                      <CardHeader className='p-2 md:p-3 2xl:p-8 2xl:pb-2'>
                        <div className='absolute top-3 left-3 md:top-9 md:left-3 z-[100]'>
                          <NeoBadge
                            variant='dark'
                            rotation='negative'
                            className='font-mono'
                            interactive='grow'
                          >
                            <Code>Experiences</Code>
                          </NeoBadge>
                        </div>
                      </CardHeader>
                      <CardContent className='py-5 px-0'>
                        <ExperienceCarousel
                          experiences={aboutData.experiences.items}
                          visibleCount={1}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </SectionRight>
              </SectionTop>

              <SectionBottom className='hidden md:block'>
                <SkillsShowcase skills={skillsData} />
              </SectionBottom>
            </Section>
          </section>
        );
      }}
    </Pump>
  );
}
