import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getProjects, getPrevNextProjects } from "@/lib/utils";
import type { Project } from "contentlayer/generated";
import * as React from "react";

type Props = {
  currentProject: Project;
};

export const ProjectIndex: React.FC<Props> = ({ currentProject }) => {
  const allProjects = [
    ...getProjects().focusProjects,
    ...getProjects().otherProjects,
  ].filter((project) => project.active);
  const nextProject = getPrevNextProjects(currentProject).next;
  const prevProject = getPrevNextProjects(currentProject).previous;

  return (
    <Pagination>
      <PaginationContent>
        {nextProject != null && (
          <PaginationItem>
            <PaginationPrevious href={nextProject.path.substring(9)} />
          </PaginationItem>
        )}
        {nextProject != null && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink
            href={currentProject.path.substring(9)}
            isActive
            size="lg"
          >
            Current
          </PaginationLink>
        </PaginationItem>
        {prevProject != null && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {prevProject != null && (
          <PaginationItem>
            <PaginationNext href={prevProject.path.substring(9)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
