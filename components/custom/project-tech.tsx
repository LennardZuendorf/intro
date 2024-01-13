import { cn } from "@/lib/utils";

interface ProjectTechProps {
  children?: React.ReactNode;
}

export function ProjectTech({ children }: ProjectTechProps) {
  return <div className="flex flex-row flex-wrap gap-2">{children}</div>;
}
