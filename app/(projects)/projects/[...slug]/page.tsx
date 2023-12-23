import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RxArrowUp } from "react-icons/rx";
// @ts-nocheck
import type { Project } from "contentlayer/generated";
// @ts-nocheck
import { allProjects } from "contentlayer/generated";
import { Mdx } from "@/components/custom/mdx-components";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { H3, Lead } from "@/components/ui/typography";

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
    <article className="container relative max-w-3xl py-6 lg:py-10 space-y-4">
      <div className="text-start space-y-1">
        <H3>{project.title} </H3>
        <Lead className="text-lg">{project.description}</Lead>
      </div>
      <Separator />
      {project.images && (
        <Image
          src={project.images[0]}
          alt={project.title}
          width={720}
          height={405}
          className="my-8 rounded-md border bg-muted transition-colors"
          priority
        />
      )}
      <div className="text-start f">
        <Mdx code={project.body.code} />
      </div>
      <Separator />
      <div className="flex justify-between">
        <Link href="/projects">
          <Button variant="outline">
            <RxArrowUp className="mr-2 h-4 w-4" />
            Back to All Projects
          </Button>
        </Link>
      </div>
    </article>
  );
}
