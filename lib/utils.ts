import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { allProjects, type Project } from "contentlayer/generated";
import { compareDesc, parseISO } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getProjects() {
  const focusProjects = allProjects
    .filter((project) => project.focus)
    .sort((a, b) => {
      return compareDesc(parseISO(String(a.date)), parseISO(String(b.date)));
    });

  let otherFocusProjects: Project[] = [];

  if (focusProjects.length < 3) {
    otherFocusProjects = focusProjects.slice(3);
    focusProjects.slice(0, 3);
  }

  const otherProjects = [
    ...allProjects
      .filter((project) => !project.focus)
      .sort((a, b) => {
        return compareDesc(parseISO(String(a.date)), parseISO(String(b.date)));
      }),
    ...otherFocusProjects,
  ];

  return { focusProjects, otherProjects };
}

export function getPrevNextProjects(project: Project) {
  let previous = null;
  let next = null;
  const index = allProjects.indexOf(project);

  if (index != 0 && allProjects[index - 1].active) {
    previous = allProjects[index - 1];
  }

  if (index != allProjects.length - 1 && allProjects[index + 1].active) {
    next = allProjects[index + 1];
  }

  return { previous, next };
}
