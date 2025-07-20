import { RichText } from '@payloadcms/richtext-lexical/react';
import type { SectionProps as PageSectionProps } from '@/app/(app)/page';
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
import { fetchAllExperiences } from '@/lib/content/fetchExperiences';
import { fetchSectionContent } from '@/lib/content/fetchSectionContent';
import { fetchSkillTags } from '@/lib/content/fetchTags';
import ExperienceCarousel from './components/experience-carousel';
import SkillsShowcase from './components/skills-showcase';

export default async function AboutSection({ className }: PageSectionProps) {
  const sectionContent = await fetchSectionContent();
  const allExperiences = await fetchAllExperiences();
  const allSkills = await fetchSkillTags();

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
                    {sectionContent?.MainAboutMeSection &&
                    typeof sectionContent.MainAboutMeSection === 'object' &&
                    'root' in sectionContent.MainAboutMeSection ? (
                      <RichText
                        className='font-mono leading-relaxed'
                        data={sectionContent.MainAboutMeSection}
                      />
                    ) : (
                      <M className='font-mono leading-relaxed'>
                        {typeof sectionContent?.MainIntroSection === 'string'
                          ? sectionContent.MainIntroSection
                          : 'Welcome to my portfolio'}
                      </M>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats Card */}
            <div className='hidden md:block relative'>
              <Card className='relative w-full' interactive='slight' rotation='slightNegative'>
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
                    {sectionContent?.quickSkills?.map((quickStat, index) => (
                      <div key={quickStat.id || index} className='text-center'>
                        <M className='font-mono font-bold'>{quickStat.skill}</M>
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
                  <ExperienceCarousel experiences={allExperiences} visibleCount={1} />
                </CardContent>
              </Card>
            </div>
          </SectionRight>
        </SectionTop>

        <SectionBottom className='hidden md:block'>
          <SkillsShowcase skills={allSkills} />
        </SectionBottom>
      </Section>
    </section>
  );
}
