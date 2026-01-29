import { Pump } from 'basehub/react-pump';
import { ArrowLeftIcon } from 'lucide-react';
import type { NextPage } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { RichTextBlock } from '@/components/shared/richtext-block';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { NeoBadge } from '@/components/ui/neoBadge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Section, SectionBottom, SectionTop } from '@/components/ui/section';
import { H3, Link, M } from '@/components/ui/typography';

const LegalPage: NextPage = async () => {
  const { isEnabled: draft } = await draftMode();

  return (
    <Pump
      draft={draft}
      queries={[
        {
          sectionsAndPages: {
            legalPage: {
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

        const en = data.sectionsAndPages.legalPage.legalTexts?.find(
          (item) => item._title === 'English'
        );

        if (!en || !en.dataProtectionRules) {
          return notFound();
        }

        return (
          <article>
            <Section className='container mx-auto' id='data-protection' padding='px-6 py-4 md:py-6'>
              <SectionTop>
                {/* Back Button */}
                <div className='flex justify-end mb-2'>
                  <Button asChild variant='noShadow' size='sm'>
                    <Link href='/' className='font-bold'>
                      <ArrowLeftIcon className='w-4 h-4' />
                      Back to Home
                    </Link>
                  </Button>
                </div>
              </SectionTop>

              <SectionBottom>
                <Card className='relative w-full mb-3 md:mb-0'>
                  <div className='absolute -top-6 -left-4 md:-top-6 md:-left-6 z-10'>
                    <NeoBadge variant='light' interactive='lift' className='font-mono'>
                      <M className='font-mono'>⚖️ Legal</M>
                    </NeoBadge>
                  </div>
                  <CardContent>
                    <ScrollArea>
                      {en.dataProtectionRules?.json && (
                        <div className='font-mono leading-relaxed pb-4'>
                          <H3>Data Protection</H3>
                          {/* biome-ignore lint/suspicious/noExplicitAny: basehub RichText blocks typing is external */}
                          <RichTextBlock blocks={(en.dataProtectionRules.json as any).blocks}>
                            {en.dataProtectionRules.json.content}
                          </RichTextBlock>
                        </div>
                      )}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </SectionBottom>
            </Section>
          </article>
        );
      }}
    </Pump>
  );
};

export default LegalPage;
