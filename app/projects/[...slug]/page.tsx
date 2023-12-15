// @ts-nocheck
//TODO: Fix Paths

import {notFound} from "next/navigation";

import { allProjects } from 'contentlayer/generated'
import type { Project } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { coreContent, allCoreContent } from 'pliny/utils/contentlayer'

import Layout from '@/components/projects/project-layout'

export const generateStaticParams = async () => {
    const paths = allProjects.map((p) => ({ slug: p.slug.split('/') }))
    return paths
}
export const generateMetadata = ({ params }: { params: { slug: string } }) => {
    const project = allProjects.find((post) => post._raw.flattenedPath === params.slug)
    return { title: project?.title }
}

export default async function Page({ params }: { params: { slug: string[] } }) {
    const slug = decodeURI(params.slug.join('/'))
    const content = allCoreContent(allProjects)

    const postIndex = allProjects.findIndex((p) => p.slug === slug)
    if (postIndex === -1) {
        return notFound()
    }

    const prev = content[postIndex + 1]
    const next = content[postIndex - 1]
    const project = allProjects.find((p) => p.slug === slug) as Project

    const mainContent = coreContent(project)

    return (
        <>
            <Layout content={mainContent} next={next} prev={prev}>
                <MDXLayoutRenderer code={project.body.code}/>
            </Layout>
        </>
    )
}