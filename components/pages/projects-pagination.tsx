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

export const ProjectsPagination: React.FC<Props> = ({ currentProject }) => {
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
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        {prevProject != null && (
          <PaginationItem>
            <PaginationNext href={prevProject.path.substring(9)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
