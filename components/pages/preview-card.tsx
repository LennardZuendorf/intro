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
import { H4, M, Code, H3 } from "@/components/ui/typography";

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
  return (
    <Card
      className={cn("text-start", {
        "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground":
          !focus,
        "bg-foreground text-background hover:bg-accent-foreground hover:text-accent-background focus:bg-accent-foreground focus:text-accent-background":
          focus,
      })}
    >
      <Link href={project.path}>
        <CardHeader className="grid grid-flow-col justify-between gap-4">
          <div className="space-y-1">
            <CardTitle>
              <H4>{project.title}</H4>
            </CardTitle>
            <CardDescription
              className={focus ? "text-background" : "text-foreground"}
            >
              <M>{project.description}</M>
            </CardDescription>
          </div>
          <div>
            <SkillIcon
              category={project.category}
              className={cn("h-5 w-5", {
                "text-background": focus,
                "text-foreground": !focus,
              })}
            />
          </div>
        </CardHeader>
        <CardContent>
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
                    variant="outline"
                    key={tag}
                    className={focus ? "text-background" : "text-foreground"}
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
              {format(parseISO(project.date), "LLL/yy")}
            </Code>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};
