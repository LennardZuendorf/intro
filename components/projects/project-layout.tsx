import { ReactNode } from 'react'

//@ts-ignore
import { coreContent, allCoreContent } from 'pliny/utils/contentlayer'
import type { Project } from 'contentlayer/generated'
import Link from "next/link";

interface LayoutProps {
    content: coreContent<Project>
    next?: { path: string; title: string }
    prev?: { path: string; title: string }
    children: ReactNode
}

export default function PostLayout({ content, next, prev, children }: LayoutProps) {
    const { filePath, path, slug, date, title, tags } = content
    const basePath = path.split('/')[0]

    return (
        <section className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
            <article>
                <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
                    <header className="pt-6 xl:pb-6">
                        <div className="space-y-1 text-center">
                            <div>
                                <h1>{title}</h1>
                            </div>
                        </div>
                    </header>
                    <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0">
                        <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
                            <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">{children}</div>
                        </div>
                        <footer>
                            <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                                {(next || prev) && (
                                    <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                                        {prev && prev.path && (
                                            <div>
                                                <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                                    Previous Article
                                                </h2>
                                                <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                                                    <Link href={`/${prev.path}`}>{prev.title}</Link>
                                                </div>
                                            </div>
                                        )}
                                        {next && next.path && (
                                            <div>
                                                <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                                    Next Article
                                                </h2>
                                                <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                                                    <Link href={`/${next.path}`}>{next.title}</Link>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="pt-4 xl:pt-8">
                                <Link
                                    href={`/${basePath}`}
                                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                                    aria-label="Back to all Projects"
                                >
                                    &larr; Back to all Projects
                                </Link>
                            </div>
                        </footer>
                    </div>
                </div>
            </article>
        </section>
    )
}