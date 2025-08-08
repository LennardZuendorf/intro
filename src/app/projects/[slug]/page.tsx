import { basehub } from 'basehub';
import { Pump } from 'basehub/react-pump';
import { RichText } from 'basehub/react-rich-text';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { draftMode } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export async function generateStaticParams() {
  try {
    const data = await basehub().query({
      sectionsAndPages: {
        projectsSection: {
          items: {
            _slug: true
          }
        }
      }
    });

    return data.sectionsAndPages.projectsSection.items.map((project: { _slug: string }) => ({
      slug: project._slug
    }));
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
  const slug = await paramsPromise;

  if (!slug?.slug) return notFound();

  return (
    <Pump
      draft={draft}
      queries={[
        {
          sectionsAndPages: {
            projectsSection: {
              items: {
                __args: {
                  filter: {
                    _slug: { eq: slug.slug }
                  },
                  first: 1
                },
                _id: true,
                _title: true,
                _slug: true,
                shortDescription: true,
                date: true,
                meta: {
                  title: true,
                  desc: true
                },
                text: {
                  json: {
                    content: true,
                    blocks: {
                      __typename: true
                    }
                  }
                },
                technology: {
                  _id: true,
                  _title: true,
                  url: true,
                  badgeUrl: true
                }
              }
            }
          }
        }
      ]}
    >
      {async ([data]) => {
        'use server';

        const project = data.sectionsAndPages.projectsSection.items[0];

        if (!project) return notFound();

        return (
          <article className=''>
            <div className='bg-primary'>
              <div className='relative border-b-4 border-black dark:border-white'>
                <div className='absolute inset-0 bg-black/50 z-10' />
                {/* TODO: Add hero image from BaseHub when available */}
                <div className='w-full h-[33vh] bg-gradient-to-r from-blue-500 to-purple-600' />
                <div className='absolute inset-0 z-20 flex items-center justify-center'>
                  <div className='container mx-auto px-4 space-y-5'>
                    <Link href='/#projects'>
                      <Button>
                        <ArrowLeft className='mr-2 h-4 w-4' /> Back to Projects
                      </Button>
                    </Link>
                    <h1 className='text-4xl md:text-6xl font-extrabold text-white mb-4 max-w-4xl'>
                      {project._title}
                    </h1>
                    <div className='flex flex-wrap gap-4 mb-6'>
                      <div className='flex items-center bg-accent text-accent-foreground px-3 py-1 border-2 border-black rounded-base shadow-shadow shadow-md'>
                        <Calendar className='h-4 w-4 mr-2' />
                        <span className='font-medium'>
                          {format(new Date(project.date), 'PPPP')}
                        </span>
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
                      <div className='prose prose-lg max-w-none'>
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
                          {project.text.json.content}
                        </RichText>
                      </div>
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
                              {project.technology?.map((tech: { _id: string; _title: string }) => (
                                <Badge key={tech._id}>{tech._title}</Badge>
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
      }}
    </Pump>
  );
}
