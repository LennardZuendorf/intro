import configPromise from '@payload-config';
import { getPayload } from 'payload';
import { draftMode } from 'next/headers';
import React, { cache } from 'react';
import RichText from '@/components/blocks/RichText';

import { LivePreviewListener } from '@/lib/utils/payloadcms/LivePreviewListener';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const projects = await payload.find({
    collection: 'projects',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true
    }
  });

  const params = projects.docs.map(({ slug }) => {
    return { slug };
  });

  return params;
}

type Args = {
  params: Promise<{
    slug?: string;
  }>;
};

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode();
  const { slug = 'projects' } = await paramsPromise;
  const project = await queryPostBySlug({ slug });

  if (!project) return notFound();

  return (
    <article className='pt-16 pb-16'>
      {draft && <LivePreviewListener />}

      <div className='flex flex-col items-center gap-4 pt-8'>
        <div className='container'>
          <RichText className='max-w-[48rem] mx-auto' data={project.content} enableGutter={false} />
        </div>
      </div>
    </article>
  );
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode();

  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: 'projects',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug
      }
    }
  });

  return result.docs?.[0] || null;
});
