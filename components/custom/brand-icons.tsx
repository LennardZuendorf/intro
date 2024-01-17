import * as React from "react";
import { FaPython, FaJava, FaAws } from "react-icons/fa";
import {
  SiTypescript,
  SiReact,
  SiSpring,
  SiPostgresql,
  SiDocker,
  SiIntellijidea,
  SiJira,
  SiFigma,
} from "react-icons/si";
import { cn } from "@/lib/utils";
import { BiLogoPostgresql } from "react-icons/bi";
import { HGFIcon } from "@/components/custom/hgf-icon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { S } from "@/components/ui/typography";

const brands = [
  "java",
  "typescript",
  "python",
  "reactjs",
  "springboot",
  "huggingface",
  "postgresql",
  "aws",
  "docker",
  "intellij",
  "jira",
  "figma",
];

type Props = {
  className?: string;
  title: string;
  brand: string;
};

export const BrandIcon: React.FC<Props> = ({
  className = "",
  title,
  brand,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="outline" key={title}>
            <div className={cn("flex flex-row flex-wrap items-center")}>
              {brand === "java" ? (
                <FaJava className={cn(className)} />
              ) : brand === "typescript" ? (
                <SiTypescript className={cn(className)} />
              ) : brand === "python" ? (
                <FaPython className={cn(className)} />
              ) : brand === "springboot" ? (
                <SiSpring className={cn(className)} />
              ) : brand === "reactjs" ? (
                <SiReact className={cn(className)} />
              ) : brand === "postgresql" ? (
                <BiLogoPostgresql className={cn(className)} />
              ) : brand === "docker" ? (
                <SiDocker className={cn(className)} />
              ) : brand === "figma" ? (
                <SiFigma className={cn(className)} />
              ) : brand === "intellij" ? (
                <SiIntellijidea className={cn(className)} />
              ) : brand === "jira" ? (
                <SiJira className={cn(className)} />
              ) : brand === "aws" ? (
                <FaAws className={cn(className)} />
              ) : (
                <HGFIcon className={cn(className)} />
              )}
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <S>{title}</S>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
