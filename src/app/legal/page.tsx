import { Pump } from 'basehub/react-pump';
import type { NextPage } from 'next';
import { draftMode } from 'next/headers';
import { RichTextBlock } from '@/components/sections/components/richtext-block';
import { Card, CardContent } from '@/components/ui/card';
import { NeoBadge } from '@/components/ui/neoBadge';
import { Section, SectionTop } from '@/components/ui/section';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code } from '@/components/ui/typography';

const LegalPage: NextPage = async () => {
  const { isEnabled: draft } = await draftMode();

  return (
    <Pump
      draft={draft}
      queries={[
        {
          sectionsAndPages: {
            legalPage: {
              dataPrivacyRegulations: {
                _id: true,
                _title: true,
                impressum: {
                  json: {
                    content: true
                  }
                },
                dataProtectionRules: {
                  json: {
                    content: true
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

        const dataPrivacyRegulations = data.sectionsAndPages.legalPage.dataPrivacyRegulations;

        if (!dataPrivacyRegulations) {
          console.log('No data privacy regulations found');
          return null;
        }

        const de = dataPrivacyRegulations.find((item) => item._title === 'German');
        const en = dataPrivacyRegulations.find((item) => item._title === 'English');

        if (!de || !en) {
          console.log('No data privacy regulations found for german or english');
          return null;
        }

        return (
          <article>
            <Section className='container mx-auto' id='data-protection'>
              <SectionTop>
                <div className='relative'>
                  <div className='absolute -top-6 -left-4 md:-top-6 md:-left-6'>
                    <NeoBadge
                      variant='light'
                      rotation='medium'
                      className='font-mono'
                      interactive='lift'
                    >
                      <Code>⚖️ Legal</Code>
                    </NeoBadge>
                  </div>
                  <Tabs defaultValue='de' className='w-full'>
                    <TabsList className='grid w-full grid-cols-2 mb-6'>
                      <TabsTrigger value='de'>Deutsch</TabsTrigger>
                      <TabsTrigger value='en'>English</TabsTrigger>
                    </TabsList>

                    <TabsContent value='de'>
                      <Card>
                        <CardContent className='flex flex-col gap-4 pt-2 m-1'>
                          {de.impressum && (
                            <RichTextBlock>{de.impressum.json.content}</RichTextBlock>
                          )}
                          <Separator />
                          {de.dataProtectionRules && (
                            <RichTextBlock>{de.dataProtectionRules.json.content}</RichTextBlock>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value='en'>
                      <Card>
                        <CardContent className='flex flex-col gap-4 pt-2 m-1'>
                          {en.impressum && (
                            <RichTextBlock>{en.impressum.json.content}</RichTextBlock>
                          )}
                          <Separator />
                          {en.dataProtectionRules && (
                            <RichTextBlock>{en.dataProtectionRules.json.content}</RichTextBlock>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </SectionTop>
            </Section>
          </article>
        );
      }}
    </Pump>
  );
};

export default LegalPage;
