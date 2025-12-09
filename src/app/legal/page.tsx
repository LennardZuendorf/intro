import { Pump } from 'basehub/react-pump';
import type { LegalInfoComponent } from 'basehub-types';
import type { NextPage } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { RichTextBlock } from '@/components/shared/richtext-block';
import { Card, CardContent } from '@/components/ui/card';
import { NeoBadge } from '@/components/ui/neoBadge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Section, SectionBottom, SectionTop } from '@/components/ui/section';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { H3, M } from '@/components/ui/typography';

const LegalPage: NextPage = async () => {
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
          }
        }
      ]}
    >
      {async ([data]) => {
        'use server';

        if (!data) {
          console.log('No data privacy regulations found');
          return null;
        }

        const legalTexts = data.sectionsAndPages.legalPage.legalTexts as LegalInfoComponent[];

        if (!legalTexts) {
          return notFound();
        }

        const de = legalTexts.find(
          (item: LegalInfoComponent) => item._title.toLowerCase() === 'german'
        );
        const en = legalTexts.find(
          (item: LegalInfoComponent) => item._title.toLowerCase() === 'english'
        );

        if (!de || !en) {
          return notFound();
        }

        return (
          <article>
            <Section className='container mx-auto' id='data-protection'>
              <Tabs defaultValue='de' className='w-full'>
                <SectionTop>
                  <div className='relative w-full'>
                    <div className='absolute -top-6 -left-4 md:-top-6 md:-left-6 z-10'>
                      <NeoBadge variant='light' interactive='lift' className='font-mono'>
                        <M className='font-mono'>⚖️ Legal</M>
                      </NeoBadge>
                    </div>

                    {/* Card-styled Tabs Selector */}
                    <TabsList className='grid w-full grid-cols-2'>
                      <TabsTrigger value='de'>Deutsch</TabsTrigger>
                      <TabsTrigger value='en'>English</TabsTrigger>
                    </TabsList>
                  </div>
                </SectionTop>

                <SectionBottom>
                  <TabsContent value='de' className='w-full'>
                    <Card className='relative w-full mb-3 md:mb-0'>
                      <CardContent>
                        <ScrollArea>
                          {de.dataProtectionRules?.json && (
                            <div className='font-mono leading-relaxed pb-4'>
                              <H3>Datenschutz</H3>
                              <RichTextBlock>{de.dataProtectionRules.json.content}</RichTextBlock>
                            </div>
                          )}
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value='en' className='w-full'>
                    <Card className='relative w-full mb-3 md:mb-0'>
                      <CardContent>
                        <ScrollArea>
                          {en.dataProtectionRules?.json && (
                            <div className='font-mono leading-relaxed pb-4'>
                              <H3>Data Protection</H3>
                              <RichTextBlock>{en.dataProtectionRules.json.content}</RichTextBlock>
                            </div>
                          )}
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </SectionBottom>
              </Tabs>
            </Section>
          </article>
        );
      }}
    </Pump>
  );
};

export default LegalPage;
