import * as React from "react";
import Link from "next/link";
import type { Project } from "contentlayer/generated";
import { format, parseISO } from "date-fns";

import { SkillIcon } from "@/components/custom/skill-icon";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { H4, M, Code, S } from "@/components/ui/typography";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  project: Project;
  className?: string;
  focus?: boolean;
  clickable?: boolean;
};

export const ProjectCard: React.FC<Props> = ({
  project,
  className,
  focus = false,
}) => {
  const card = (
    <Card className="text-start" variant="interactive">
      <CardHeader className="grid grid-flow-col justify-between gap-4">
        <H4>{project.title}</H4>
        <div>
          <SkillIcon
            category={project.category}
            variant="tooltip"
            className={cn("h-5 w-5", {
              "text-background": focus,
              "text-foreground": !focus,
            })}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="pr-8">
          <S
            className={cn(
              "leading-3",
              focus ? "text-background" : "text-foreground",
            )}
          >
            {project.description}
          </S>
        </div>
        <div
          className={cn("flex gap-2 items-center justify-between", {
            "text-muted-background": focus,
            "text-muted-foreground": !focus,
          })}
        >
          <div className="flex gap-1 justify-start">
            {project.tags &&
              (project.tags.slice(0, 2) || []).map((tag) => (
                <Badge
                  key={tag}
                  className={focus ? "text-foreground" : "text-background"}
                >
                  {tag}
                </Badge>
              ))}
          </div>
          <Code
            className={cn({
              "text-background": focus,
              "text-foreground": !focus,
            })}
          >
            {project.active ? format(parseISO(project.date), "LLL/yy") : "SOON"}
          </Code>
        </div>
      </CardContent>
    </Card>
  );

  return project.active ? (
    <Link href={project.path}>{card}</Link>
  ) : (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{card}</TooltipTrigger>
        <TooltipContent>
          <S>This project has not been released yet.</S>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
