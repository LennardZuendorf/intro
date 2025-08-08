import { Pump } from 'basehub/react-pump';
import { RichText } from 'basehub/react-rich-text';
import type { NextPage } from 'next';
import { draftMode } from 'next/headers';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const LegalPage: NextPage = async () => {
  const { isEnabled: draft } = await draftMode();

  return (
    <Pump
      draft={draft}
      queries={[
        {
          sectionsAndPages: {
            legalPage: {
              germanLegalText: {
                html: true,
                json: {
                  content: true
                }
              },
              englishLegalText: {
                html: true,
                json: {
                  content: true
                }
              }
            }
          }
        }
      ]}
    >
      {async ([data]) => {
        'use server';

        const legalContent = data.sectionsAndPages.legalPage;

        return (
          <article className='lg:pt-5 lg:pb-5 pt-2.5 pb-2.5 space-y-2.5 lg:space-y-5'>
            <section className='container mx-auto' id='data-protection'>
              <Tabs defaultValue='de' className='w-full'>
                <TabsList className='grid w-full grid-cols-2 mb-6'>
                  <TabsTrigger value='de'>Deutsch</TabsTrigger>
                  <TabsTrigger value='en'>English</TabsTrigger>
                </TabsList>

                <TabsContent value='de'>
                  <Card>
                    <CardContent className='prose prose-lg max-w-none p-6'>
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
                        {legalContent.germanLegalText?.json.content}
                      </RichText>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value='en'>
                  <Card>
                    <CardContent className='prose prose-lg max-w-none p-6'>
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
                        {legalContent.englishLegalText?.json.content}
                      </RichText>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </section>
          </article>
        );
      }}
    </Pump>
  );
};

export default LegalPage;
