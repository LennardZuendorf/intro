import configPromise from '@payload-config';
import { getPayload } from 'payload';
import { draftMode } from 'next/headers';
import React from 'react';
import { LivePreviewListener } from '@/lib/utils/payloadcms/LivePreviewListener';
import { NextPage } from 'next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import RichText from '@/components/blocks/RichText';

const LegalPage: NextPage = async () => {
  const { isEnabled: draft } = await draftMode();
  const legalContent = await queryLegalContent();

  if (!legalContent) {
    return <div>No legal content found.</div>;
  }

  return (
    <article className='pt-16 pb-16'>
      {draft && <LivePreviewListener />}

      <div className='container mx-auto'>
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
                    <RichText data={legalContent.germanText} />
                  </CardContent>
                </Card>
              </TabsContent>
            )}
            {legalContent.englishText && (
              <TabsContent value='en'>
                <Card>
                  <CardContent>
                    <RichText data={legalContent.englishText} />
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        )}
      </div>
    </article>
  );
};

async function queryLegalContent() {
  const payload = await getPayload({ config: configPromise });

  const result = await payload.findGlobal({
    slug: 'legalTexts', // required
    depth: 2,
    showHiddenFields: true
  });

  if (!result) {
    return null;
  } else {
    return result;
  }
}

export default LegalPage;
