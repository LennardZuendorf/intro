import RichText from '@/components/blocks/RichText';
import configPromise from '@payload-config';
import { draftMode } from 'next/headers';
import { getPayload } from 'payload';
import React, { cache } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LivePreviewListener } from '@/lib/utils/payloadcms/LivePreviewListener';
import type { Project } from '@/payload-types';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config: configPromise });
    const projects = await payload.find({
      collection: 'projects',
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      select: {
        slug: true
      },
      where: {
        _status: {
          equals: 'published'
        },
        slug: {
          exists: true
        }
      }
    });

    const params = projects.docs
      .filter(({ slug }) => slug && typeof slug === 'string')
      .map(({ slug }) => ({
        slug: slug as string
      }));

    return params;
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return [];
  }
}

type Args = {
  params: Promise<{
    slug?: string;
  }>;
};

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode();
  const { slug = 'projects' } = await paramsPromise;
  const project: Project = await queryPostBySlug({ slug });

  if (!project) return notFound();

  return (
    <article className=''>
      {draft && <LivePreviewListener />}
      <div className='bg-primary'>
        <div className='relative border-b-4 border-black dark:border-white'>
          <div className='absolute inset-0 bg-black/50 z-10' />
          <Image
            src={
              typeof project.heroImage === 'object'
                ? typeof project.heroImage?.url === 'string'
                  ? project.heroImage?.url
                  : 'http://localhost:3000/api/media/file/premium_photo-1661877737561661877737564-3dfd7282efcb.jpg'
                : 'http://localhost:3000/api/media/file/premium_photo-16618777375616618777'
            }
            alt={project.title}
            width={1200}
            height={600}
            className='w-full h-[33vh] object-cover'
          />
          <div className='absolute inset-0 z-20 flex items-center justify-center'>
            <div className='container mx-auto px-4 space-y-5'>
              <Link href='/#projects'>
                <Button>
                  <ArrowLeft className='mr-2 h-4 w-4' /> Back to Projects
                </Button>
              </Link>
              <h1 className='text-4xl md:text-6xl font-extrabold text-white mb-4 max-w-4xl'>
                {project.title}
              </h1>
              <div className='flex flex-wrap gap-4 mb-6'>
                <div className='flex items-center bg-accent text-accent-foreground px-3 py-1 border-2 border-black rounded-base shadow-shadow shadow-md'>
                  <Calendar className='h-4 w-4 mr-2' />
                  <span className='font-medium'>{format(project.createdAt, 'PPPP')}</span>
                </div>
                <div className='flex items-center bg-primary px-3 py-1 border-2 border-border rounded-base shadow-shadow shadow-md'>
                  <Tag className='h-4 w-4 mr-2' />
                  <span className='font-medium'>Project Category</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Content */}
        <div className='container mx-auto px-4 py-12'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
            {/* Main Content */}
            <div className='lg:col-span-8'>
              <div className='bg-primary border-4 border-black dark:border-white shadow-shadow shadow-md p-6 md:p-8'>
                <RichText
                  className='max-w-[48rem] mx-auto'
                  data={project.content}
                  enableGutter={false}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className='lg:col-span-4'>
              <div className='sticky top-24'>
                {/* Project Info */}
                <div className='bg-accent border-2 border-border shadow-shadow text-accent-foreground p-6 mb-8'>
                  <h3 className='text-xl font-bold mb-4 border-b-4 border-black pb-2'>
                    Project Overview
                  </h3>
                  <div className='space-y-4'>
                    <div>
                      <h4 className='font-bold'>Technologies</h4>
                      <div className='flex flex-wrap gap-2 mb-6'>
                        {project.technologies?.map((tech) => (
                          <Badge
                            key={
                              typeof tech === 'object' && tech !== null
                                ? tech.id || tech.name
                                : tech
                            }
                          >
                            {typeof tech === 'object' && tech !== null ? tech.name : tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Achievements */}
                <div className='bg-white dark:bg-[#242424] border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] p-6'>
                  <h3 className='text-xl font-bold mb-4 border-b-4 border-black dark:border-white pb-2'>
                    Key Features
                  </h3>
                  <ul className='space-y-3'>
                    <li className='flex items-center'>
                      <span className='h-2 w-2 bg-black dark:bg-white rounded-full mr-2' />
                      <span>Responsive design with mobile-first approach</span>
                    </li>
                    <li className='flex items-center'>
                      <span className='h-2 w-2 bg-black dark:bg-white rounded-full mr-2' />
                      <span>Optimized performance with 95+ Lighthouse score</span>
                    </li>
                    <li className='flex items-center'>
                      <span className='h-2 w-2 bg-black dark:bg-white rounded-full mr-2' />
                      <span>Integrated CMS for content management</span>
                    </li>
                    <li className='flex items-center'>
                      <span className='h-2 w-2 bg-black dark:bg-white rounded-full mr-2' />
                      <span>Automated CI/CD pipeline for seamless deployment</span>
                    </li>
                    <li className='flex items-center'>
                      <span className='h-2 w-2 bg-black dark:bg-white rounded-full mr-2' />
                      <span>Accessibility compliance with WCAG standards</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
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
