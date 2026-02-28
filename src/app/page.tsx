import { Pump } from 'basehub/react-pump';
import type { HeroSection } from 'basehub-types';
import type { NextPage } from 'next';
import { draftMode } from 'next/headers';
import { Banner } from '@/components/banner';
import { Nav } from '@/components/navbar';
import { HeroCard } from '@/components/sections/components/hero-card';
import { RichTextBlock } from '@/components/shared/richtext-block';
import { BackgroundGrid } from '@/components/ui/background-grid';
import { Section, SectionBody, SectionHeader } from '@/components/ui/section';
import { env } from '@/env';

const blocksQuery = {
  on_HoverCardLinkComponent: {
    _id: true,
    _title: true,
    url: true,
    description: true,
    text: true,
    __typename: true
  },
  on_ProjectComponent: {
    _id: true,
    _title: true,
    shortDescription: true,
    technology: { _id: true, _title: true },
    links: { items: { _title: true, url: true } },
    color: { hex: true },
    __typename: true
  },
  on_ExperienceComponent: {
    _id: true,
    _title: true,
    shortDescription: true,
    companyLink: true,
    companyTitle: true,
    startDate: true,
    endDate: true,
    skills: { _id: true, _title: true },
    __typename: true
  }
} as const;

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
                  content: true,
                  blocks: blocksQuery
                }
              },
              secondaryHeroText: {
                json: {
                  content: true,
                  blocks: blocksQuery
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
          }
        }
      ]}
    >
      {async ([data]) => {
        'use server';

        if (!data || env.NEXT_V2_RELEASE === false) {
          return (
            <Section className='max-w-3xl mx-auto'>
              <HeroCard className='border-0 shadow-none' />
              <Banner />
            </Section>
          );
        }

        const heroText = (data.sectionsAndPages.heroSection as HeroSection).mainHeroText;
        const secondaryText = (data.sectionsAndPages.heroSection as HeroSection).secondaryHeroText;

        return (
          <BackgroundGrid
            maskType='radial'
            className='flex w-full min-h-screen flex-col relative justify-center items-center'
          >
            <div className='w-full flex justify-center fixed bottom-0 md:bottom-auto md:top-0 left-0 z-[9999] pointer-events-none'>
              <div className='pointer-events-auto w-full max-w-[1536px] px-2 md:px-8 pb-3 md:pb-0 md:pt-3'>
                <Nav socials={data.globals.socials.items} />
              </div>
            </div>

            <Section id='hero'>
              <SectionHeader badge='Hey there!' badgeRotation='slight' badgeVariant='default'>
                {heroText?.json?.content && (
                  <RichTextBlock
                    blocks={heroText.json.blocks}
                    anchors={false}
                    className='[&>div]:inline [&>div+div]:block [&>div+div]:mt-4'
                  >
                    {heroText.json.content}
                  </RichTextBlock>
                )}
              </SectionHeader>

              {secondaryText?.json?.content && (
                <SectionBody>
                  <RichTextBlock
                    blocks={secondaryText.json.blocks}
                    anchors={false}
                    className='[&>div]:inline [&>div+div]:block [&>div+div]:mt-4'
                  >
                    {secondaryText.json.content}
                  </RichTextBlock>
                </SectionBody>
              )}
            </Section>

            <Banner />
          </BackgroundGrid>
        );
      }}
    </Pump>
  );
};

export default Page;
