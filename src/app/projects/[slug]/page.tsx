import { basehub } from 'basehub';
import { Pump } from 'basehub/react-pump';
import { RichText } from 'basehub/react-rich-text';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { draftMode } from 'next/headers';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { HiMiniArrowTopRightOnSquare } from 'react-icons/hi2';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { IconLink } from '@/components/ui/icon-link';
import { NeoBadge } from '@/components/ui/neoBadge';
import { Section, SectionLeft, SectionRight, SectionTop } from '@/components/ui/section';
import { H1, H3, L, M, S } from '@/components/ui/typography';

export async function generateStaticParams() {
  try {
    const data = await basehub({ cache: 'no-store' }).query({
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

export default async function ProjectPage({
  params: _params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { isEnabled: draft } = await draftMode();
  const { slug } = await _params;

  if (!slug) return notFound();

  return (
    <Pump
      draft={draft}
      queries={[
        {
          sectionsAndPages: {
            projectsSection: {
              __args: {
                filter: { _sys_slug: { eq: slug } },
                first: 1
              },
              items: {
                _id: true,
                _title: true,
                _slug: true,
                shortDescription: true,
                date: true,
                meta: {
                  title: true,
                  desc: true,
                  img: { url: true, width: true, height: true }
                },
                text: {
                  json: { content: true, toc: true },
                  readingTime: true
                },
                technology: {
                  _id: true,
                  _title: true,
                  url: true,
                  badgeUrl: true
                },
                githubLink: true,
                showcaseLink: true
              }
            }
          }
        }
      ]}
    >
      {async ([
        {
          sectionsAndPages: { projectsSection }
        }
      ]) => {
        'use server';

        const project = projectsSection.items.at(0);
        if (!project) return notFound();

        const formattedDate = project.date ? format(new Date(project.date), 'PPPP') : undefined;
        const readingMinutes = project.text?.readingTime
          ? `${project.text.readingTime} min read`
          : undefined;
        const techCount = project.technology?.length ?? 0;

        return (
          <section id='project-detail'>
            <Section background='grid'>
              <SectionTop>
                <Card className='relative w-full' interactive='medium' rotation='slight'>
                  <CardHeader className='p-5 pb-2 md:p-6 md:pb-2 2xl:p-8 2xl:pb-2'>
                    <div className='absolute -top-2 -left-2 md:-top-3 md:-left-3'>
                      <NeoBadge
                        variant='dark'
                        rotation='medium'
                        className='font-mono'
                        interactive='bounce'
                      >
                        <M className='font-mono'>🚀 Project</M>
                      </NeoBadge>
                    </div>
                    <H1 className='-rotate-1'>{project._title}</H1>
                  </CardHeader>
                  <CardContent className='p-5 pt-0 md:p-6 md:pt-0 2xl:p-8 2xl:pt-0'>
                    {project.shortDescription && (
                      <M className='font-mono leading-relaxed mb-3'>{project.shortDescription}</M>
                    )}

                    <div className='flex flex-wrap gap-2 mb-3'>
                      {formattedDate && (
                        <NeoBadge
                          variant='light'
                          rotation='slight'
                          interactive='grow'
                          className='font-mono'
                        >
                          <div className='flex items-center gap-2'>
                            <Calendar className='h-4 w-4' />
                            <S>{formattedDate}</S>
                          </div>
                        </NeoBadge>
                      )}
                      {readingMinutes && (
                        <NeoBadge
                          variant='default'
                          rotation='negative'
                          interactive='wiggle'
                          className='font-mono'
                        >
                          <div className='flex items-center gap-2'>
                            <Clock className='h-4 w-4' />
                            <S>{readingMinutes}</S>
                          </div>
                        </NeoBadge>
                      )}
                      {techCount > 0 && (
                        <NeoBadge
                          variant='dark'
                          rotation='medium'
                          interactive='bounce'
                          className='font-mono'
                        >
                          <S>{techCount} technologies</S>
                        </NeoBadge>
                      )}
                    </div>

                    <div className='flex flex-col sm:flex-row gap-3'>
                      <IconLink
                        href='/#projects'
                        icon={<ArrowLeft className='h-4 w-4' />}
                        variant='action'
                        size='lg'
                        iconPosition='left'
                      >
                        Back to Projects
                      </IconLink>
                      {project.showcaseLink && (
                        <IconLink
                          href={project.showcaseLink}
                          icon={<HiMiniArrowTopRightOnSquare className='h-4 w-4' />}
                          variant='action'
                          size='lg'
                          iconPosition='right'
                          external
                        >
                          View Project
                        </IconLink>
                      )}
                      {project.githubLink && (
                        <IconLink
                          href={project.githubLink}
                          icon={<HiMiniArrowTopRightOnSquare className='h-4 w-4' />}
                          variant='action'
                          size='lg'
                          iconPosition='right'
                          external
                        >
                          View Code
                        </IconLink>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </SectionTop>

              <SectionLeft>
                <Card className='relative w-full' interactive='none' rotation='none'>
                  <CardContent className='p-5 md:p-6 2xl:p-8'>
                    <div className='max-w-none'>
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
                        {project.text?.json?.content}
                      </RichText>
                    </div>
                  </CardContent>
                </Card>
              </SectionLeft>

              <SectionRight>
                <div className='relative'>
                  {/* Tech Stack Card */}
                  {techCount > 0 && (
                    <Card
                      className='relative w-full mb-4'
                      interactive='slight'
                      rotation='slightNegative'
                    >
                      <CardHeader className='p-5 pb-2 md:p-6 md:pb-2 2xl:p-8 2xl:pb-2'>
                        <div className='absolute -top-2 -left-2 md:-top-3 md:-left-3'>
                          <NeoBadge
                            variant='light'
                            rotation='medium'
                            className='font-mono'
                            interactive='lift'
                          >
                            <M className='font-mono'>Tech Stack</M>
                          </NeoBadge>
                        </div>
                        <H3 className='rotate-1'>Technologies</H3>
                      </CardHeader>
                      <CardContent className='p-5 pt-0 md:p-6 md:pt-0 2xl:p-8 2xl:pt-0'>
                        <div className='flex flex-wrap gap-2'>
                          {project.technology?.map(
                            (tech: { _id: string; _title: string; badgeUrl?: string | null }) => (
                              <div key={tech._id} className='flex items-center'>
                                {tech.badgeUrl ? (
                                  <Image
                                    src={tech.badgeUrl}
                                    alt={tech._title}
                                    width={28}
                                    height={28}
                                    className='mr-2 rounded-sm border-2 border-black dark:border-white bg-white dark:bg-[#242424]'
                                  />
                                ) : null}
                                <NeoBadge variant='default' rotation='slight' interactive='grow'>
                                  <L>{tech._title}</L>
                                </NeoBadge>
                              </div>
                            )
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Table of Contents Card */}
                  {project.text?.json?.toc && project.text.json.toc.length > 0 && (
                    <Card className='relative w-full mb-4' interactive='none' rotation='slight'>
                      <CardHeader className='p-5 pb-2 md:p-6 md:pb-2 2xl:p-8 2xl:pb-2'>
                        <div className='absolute -top-2 -left-2 md:-top-3 md:-left-3'>
                          <NeoBadge
                            variant='dark'
                            rotation='negative'
                            className='font-mono'
                            interactive='grow'
                          >
                            <M className='font-mono'>Contents</M>
                          </NeoBadge>
                        </div>
                        <H3 className='rotate-1'>Table of Contents</H3>
                      </CardHeader>
                      <CardContent className='p-5 pt-0 md:p-6 md:pt-0 2xl:p-8 2xl:pt-0'>
                        <ul className='list-disc list-inside space-y-1'>
                          {project.text.json.toc.map(
                            (
                              node: { title?: string; id?: string; slug?: string },
                              index: number
                            ) => (
                              <li
                                key={node.id || node.slug || `toc-${index}`}
                                className='font-mono'
                              >
                                <S>{node?.title ?? 'Section'}</S>
                              </li>
                            )
                          )}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* Project Info Card */}
                  <Card className='relative w-full' interactive='slight' rotation='slightNegative'>
                    <CardHeader className='p-5 pb-2 md:p-6 md:pb-2 2xl:p-8 2xl:pb-2'>
                      <div className='absolute -top-2 -left-2 md:-top-3 md:-left-3'>
                        <NeoBadge
                          variant='light'
                          rotation='slight'
                          className='font-mono'
                          interactive='lift'
                        >
                          <M className='font-mono'>Overview</M>
                        </NeoBadge>
                      </div>
                      <H3 className='rotate-1'>Project Info</H3>
                    </CardHeader>
                    <CardContent className='p-5 pt-0 md:p-6 md:pt-0 2xl:p-8 2xl:pt-0'>
                      <div className='space-y-2 font-mono'>
                        {formattedDate && (
                          <div className='flex items-center gap-2'>
                            <Calendar className='h-4 w-4' />
                            <S>{formattedDate}</S>
                          </div>
                        )}
                        {readingMinutes && (
                          <div className='flex items-center gap-2'>
                            <Clock className='h-4 w-4' />
                            <S>{readingMinutes}</S>
                          </div>
                        )}
                        <div className='flex items-center gap-2'>
                          <S>{techCount} technologies</S>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </SectionRight>
            </Section>
          </section>
        );
      }}
    </Pump>
  );
}
