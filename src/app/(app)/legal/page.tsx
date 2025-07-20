import configPromise from '@payload-config';
import type { NextPage } from 'next';
import { getPayload } from 'payload';
import RichText from '@/components/blocks/RichText';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LivePreviewListener } from '@/lib/utils/payloadcms/LivePreviewListener';

const LegalPage: NextPage = async () => {
  const legalContent = await queryLegalContent();

  if (!legalContent) {
    return <div>No legal content found.</div>;
  }

  return (
    <article className='lg:pt-5 lg:pb-5 pt-2.5 pb-2.5 space-y-2.5 lg:space-y-5'>
      <LivePreviewListener />

      <section className='container mx-auto' id='data-protection'>
        {!legalContent || (!legalContent.germanText && !legalContent.englishText) ? (
          <div>No legal content available.</div>
        ) : (
          <Tabs defaultValue='de' className='w-full'>
            <TabsList className='grid w-full grid-cols-2 mb-6'>
              <TabsTrigger value='de' disabled={!legalContent.germanText}>
                Deutsch
              </TabsTrigger>
              <TabsTrigger value='en' disabled={!legalContent.englishText}>
                English
              </TabsTrigger>
            </TabsList>
            {legalContent.germanText && (
              <TabsContent value='de'>
                <Card>
                  <CardContent>
                    <RichText data={legalContent.germanText} enableGutter={false} />
                  </CardContent>
                </Card>
              </TabsContent>
            )}
            {legalContent.englishText && (
              <TabsContent value='en'>
                <Card>
                  <CardContent>
                    <RichText data={legalContent.englishText} enableGutter={false} />
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        )}
      </section>
      <section className='container mx-auto' id='privacy'>
        {legalContent.privacy && (
          <Card>
            <CardContent>
              <RichText data={legalContent.privacy} enableGutter={false} />
            </CardContent>
          </Card>
        )}
      </section>
    </article>
  );
};

async function queryLegalContent() {
  const payload = await getPayload({ config: configPromise });

  const result = await payload.findGlobal({
    slug: 'legalContent', // required
    depth: 2,
    showHiddenFields: true
  });

  if (!result) {
    return null;
  }
  return result;
}

export default LegalPage;
