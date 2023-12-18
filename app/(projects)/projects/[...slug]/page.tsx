// @ts-nocheck

import type {Project} from 'contentlayer/generated'
import {allProjects} from 'contentlayer/generated'

import { Mdx } from "@/components/projects/mdx-components"
import Link from "next/link";

export const generateStaticParams = async () => {
    return allProjects.map((p) => ({slug: p.slug.split('/')}))
}

export default async function Page({ params }: { params: { slug: string[] } }) {
    const slug = decodeURI(params.slug.join('/'))
    const project = allProjects.find((p) => p.slug === slug) as Project
    const basePath = project.path.split('/').slice(0, -1)

    return (
        <section className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
            <article>
                <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
                    <header className="pt-6 xl:pb-6">
                        <div className="space-y-1 text-center">
                            <div>
                                <h1>{project.title}</h1>
                            </div>
                        </div>
                    </header>
                    <div
                        className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0">
                        <div
                            className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
                            <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">
                                <Mdx code={project.body.code}/>
                            </div>
                        </div>
                        <footer>
                            <div className="pt-4 xl:pt-8">
                                <Link
                                    href={`/${basePath}`}
                                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                                    aria-label="Back to all Projects"
                                >
                                    &larr; Back to All Projects
                                </Link>
                            </div>
                        </footer>
                    </div>
                </div>
            </article>
        </section>

    )
}