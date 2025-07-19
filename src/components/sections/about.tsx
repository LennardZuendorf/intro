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
import { Code, M, S } from '@/components/ui/typography';
import type { Experience, SectionContent, Tag } from '@/payload-types';
import { aboutFallbackData } from '../../../content/AboutContent';
import CarouselVertical from './components/experience-carousel';
import SkillsShowcase from './components/skills-showcase';

interface AboutSectionProps extends PageSectionProps {
  sectionContent?: SectionContent | null;
  allExperiences?: Experience[] | null;
}

type RichTextNode = {
  type: string;
  children?: RichTextNode[];
  text?: string;
};

const extractTextFromRichText = (richText: { root: { children: RichTextNode[] } }): string => {
  if (!richText?.root?.children) return '';

  return richText.root.children
    .map((child: RichTextNode) => {
      if (child.type === 'paragraph' && child.children) {
        return child.children
          .filter((textNode: RichTextNode) => textNode.type === 'text')
          .map((textNode: RichTextNode) => textNode.text)
          .join('');
      }
      return '';
    })
    .filter(Boolean)
    .join(' ');
};

export default function AboutSection({
  className,
  sectionContent,
  allExperiences
}: AboutSectionProps) {
  const aboutMeText = sectionContent?.MainAboutMeSection
    ? extractTextFromRichText(sectionContent.MainAboutMeSection)
    : aboutFallbackData.aboutMeText;

  const allSkills =
    sectionContent?.selectedSkills?.map((skill) => (skill as Tag).name) || aboutFallbackData.skills;

  return (
    <section id='about'>
      <Section
        className={className}
        background='grid'
        centerContent={true}
        containerClassName='justify-center items-center mx-auto relative z-[2]'
      >
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
                  <div className='prose dark:prose-invert max-w-none'>
                    <M className='font-mono leading-relaxed'>{aboutMeText}</M>
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
                    <div className='text-center'>
                      <M className='font-mono font-bold'>5+</M>
                      <S className='font-mono text-muted-foreground text-xs'>Years</S>
                    </div>
                    <div className='text-center'>
                      <M className='font-mono font-bold'>15+</M>
                      <S className='font-mono text-muted-foreground text-xs'>Projects Built</S>
                    </div>
                    <div className='text-center'>
                      <M className='font-mono font-bold'>3</M>
                      <S className='font-mono text-muted-foreground text-xs'>Languages</S>
                    </div>
                    <div className='text-center'>
                      <M className='font-mono font-bold'>Berlin</M>
                      <S className='font-mono text-muted-foreground text-xs'>Based In</S>
                    </div>
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
                  <CarouselVertical experiences={allExperiences} visibleCount={1} />
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
