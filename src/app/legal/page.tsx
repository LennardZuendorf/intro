import { Pump } from 'basehub/react-pump';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { Banner } from '@/components/banner';
import { Nav } from '@/components/navbar';
import { RichTextBlock } from '@/components/shared/richtext-block';
import { Section, SectionHeader } from '@/components/ui/section';

export default async function Page() {
  const { isEnabled: draft } = await draftMode();

  return (
    <Pump
      draft={draft}
      queries={[
        {
          sectionsAndPages: {
            legalPage: {
              _id: true,
              _title: true,
              legalTexts: {
                _id: true,
                _title: true,
                dataProtectionRules: {
                  json: {
                    content: true,
                    blocks: {
                      on_BlockDocument: {
                        __typename: true,
                        _id: true
                      },
                      on_CalloutComponentComponent: {
                        __typename: true,
                        _id: true,
                        type: true,
                        title: true,
                        content: {
                          json: {
                            content: true
                          }
                        }
                      }
                    }
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
            }
          }
        }
      ]}
    >
      {async ([data]) => {
        'use server';

        if (!data || !data.sectionsAndPages?.legalPage) {
          return notFound();
        }

        const legalTexts = data.sectionsAndPages.legalPage.legalTexts;
        const en = legalTexts?.find(
          (item) => item._title === 'English'
        );

        if (!en || !en.dataProtectionRules) {
          return notFound();
        }

        const socials = data.globals?.socials?.items ?? [];

        return (
          <div className='flex w-full min-h-screen flex-col relative justify-center items-center'>
            <div className='w-full flex justify-center fixed bottom-0 md:bottom-auto md:top-0 left-0 z-[9999] pointer-events-none'>
              <div className='pointer-events-auto w-full max-w-[1536px] px-2 md:px-8 pb-3 md:pb-0 md:pt-3'>
                <Nav socials={socials} backHref='/' />
              </div>
            </div>

            <Section
              id='data-protection'
              centerContent={false}
              fullHeight={false}
              className='pt-20 md:pt-24'
            >
              <SectionHeader badge='Legal'>
                {en.dataProtectionRules?.json && (
                  <RichTextBlock blocks={en.dataProtectionRules.json.blocks}>
                    {en.dataProtectionRules.json.content}
                  </RichTextBlock>
                )}
              </SectionHeader>
            </Section>

            <Banner />
          </div>
        );
      }}
    </Pump>
  );
}
