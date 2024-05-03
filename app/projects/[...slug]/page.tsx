import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RxArrowLeft, RxGithubLogo } from "react-icons/rx";
import { HiLink } from "react-icons/hi";
// @ts-nocheck
import type { Project } from "contentlayer/generated";
// @ts-nocheck
import { allProjects } from "contentlayer/generated";
import { Mdx } from "@/components/custom/mdx-components";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { H3, H4, Lead } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { ProjectsPagination } from "@/components/pages/projects-pagination";
import { ImgCarousel } from "@/components/custom/img-carousel";

export const generateStaticParams = async () => {
  return allProjects.map((p) => ({ slug: p.slug.split("/") }));
};

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join("/"));
  const project = allProjects.find((p) => p.slug === slug) as Project;

  if (!project) {
    notFound();
  }

  return (
    <article className="mx-auto justify-items-center justify-center relative w-full max-w-3xl py-6 lg:py-10 space-y-4">
      <div className="flex flex-col text-start space-y-1">
        <H3>{project.title} </H3>
        <div className="flex flex-wrap gap-1 justify-start">
          {project.tags &&
            project.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
        </div>
      </div>
      <Separator />
      <div className="flex flex-wrap justify-start gap-2">
        <Link href="/projects">
          <Button variant="outline">
            <RxArrowLeft className="mr-2 h-4 w-4" />
            Back to All Projects
          </Button>
        </Link>
        {project.github && (
          <Link href={project.github}>
            <Button variant="outline">
              <RxGithubLogo className="mr-2 h-4 w-4" />
              Github
            </Button>
          </Link>
        )}
        {project.link && (
          <Link href={project.link} rel="noopener noreferrer" target="_blank">
            <Button variant="outline">
              <HiLink className="mr-2 h-4 w-4" />
              Link
            </Button>
          </Link>
        )}
      </div>
      <div className="text-start">
        <Mdx code={project.body.code} />
      </div>
      {project.images.length > 1 && (
        <div className="text-start">
          <H3>Images</H3>
          <ImgCarousel images={project.images.slice(1)} alt={project.title} />
        </div>
      )}
      <Separator />
      <ProjectsPagination currentProject={project} />
    </article>
  );
}
