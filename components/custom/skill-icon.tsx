import * as React from "react";
import { cn } from "@/lib/utils";
import { S } from "@/components/ui/typography";

import { HiOutlineAcademicCap, HiLightBulb } from "react-icons/hi2";
import { LuBrainCircuit, LuLaptop2 } from "react-icons/lu";
import { RxGear } from "react-icons/rx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  category: String;
  variant: "tooltip" | "default";
  className?: string;
};

export const SkillIcon: React.FC<Props> = ({
  category,
  className,
  variant,
}) => {
  if (variant === "tooltip") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Icon category={category} className={className} variant={variant} />
          </TooltipTrigger>
          <TooltipContent>
            <S>This is a {category} project.</S>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  } else {
    return <Icon category={category} className={className} variant={variant} />;
  }
};

export const Icon: React.FC<Props> = ({ category, className, variant }) => {
  return (
    <div className="flex flex-row flex-wrap items-center">
      {category === "Academic" ? (
        <HiOutlineAcademicCap className={cn(className)} />
      ) : category === "Fullstack Product" ? (
        <HiLightBulb className={cn(className)} />
      ) : category === "Software Engineering" ? (
        <LuLaptop2 className={cn(className)} />
      ) : category === "Machine Learning" ? (
        <LuBrainCircuit className={cn(className)} />
      ) : (
        <RxGear className={cn(className)} />
      )}
    </div>
  );
};
