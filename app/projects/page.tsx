import * as React from "react";
import { Separator } from "@/components/ui/separator";
import { ProjectCard } from "@/components/pages/project-preview";
import { H2, Lead } from "@/components/ui/typography";
import { getProjects } from "@/lib/utils";

export default async function ProjectsPage() {
  const focusProjects = getProjects().focusProjects;
  const otherProjects = getProjects().otherProjects;

  return (
    <div className="flex flex-col gap-4 lg:gap-8 py-2">
      <div className="grid gap-2 mx-auto lg:mx-0">
        <ProjectCard project={focusProjects[0]} />
        <div className="grid gap-2 grid-cols-1 md:grid-cols-2">
          {[focusProjects[1], focusProjects[2]].map((project) => (
            <div key={"focus-preview-".concat(project.title)}>
              <ProjectCard project={project} className="col-span-1" />
            </div>
          ))}
        </div>
      </div>
      <Separator className="my-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mx-auto items-start">
        <div className="grid grid-cols-1 gap-2 ">
          {otherProjects
            .filter((_, i) => i % 2 === 0)
            .map((project) => (
              <div key={"preview-".concat(project.title)}>
                <ProjectCard project={project} className="" />
              </div>
            ))}
        </div>
        <div className="grid grid-cols-1 gap-2">
          {otherProjects
            .filter((_, i) => i % 2 === 1)
            .map((project) => (
              <div key={"preview-".concat(project.title)}>
                <ProjectCard project={project} className="" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
