import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";

// @ts-nocheck
import type {Project} from 'contentlayer/generated'
// @ts-nocheck
import {allProjects} from 'contentlayer/generated'

import { Mdx } from "@/components/pages/mdx-components"
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import { RxArrowLeft } from "react-icons/rx";
import {format, parseISO} from "date-fns"
import { Separator } from "@/components/ui/separator"
import {Badge} from "@/components/ui/badge";

export const generateStaticParams = async () => {
    return allProjects.map((p) => ({slug: p.slug.split('/')}))
}

export default async function Page({ params }: { params: { slug: string[] } }) {
    const slug = decodeURI(params.slug.join('/'))
    const project = allProjects.find((p) => p.slug === slug) as Project
    const basePath = "/projects"

    if (!project) {
        notFound()
    }

    return (
        <article className="container relative max-w-3xl py-6 lg:py-10">
            <div className="text-start">
                <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    {project.title}
                </h1>
                <Separator className="my-4"/>
                <div className="flex flex-row gap-2">
                    {project.tags &&
                        (project.tags || []).map((tag) => (
                            <Badge variant="outline" key={tag}>
                                {tag}
                            </Badge>
                        ))
                    }
                </div>
            </div>
            {project.image && (
                <Image
                    src={project.image}
                    alt={project.title}
                    width={720}
                    height={405}
                    className="my-8 rounded-md border bg-muted transition-colors"
                    priority
                />
            )}
            <div className="text-start f">
                <Mdx code={project.body.code}/>
            </div>
        </article>
    )
}