import * as React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { H4, S, SMuted } from "@/components/ui/typography";
import Link from "next/link";
import { SkillIcon } from "../custom/skill-icon";

type Props = {
  className?: string;
  currentDesc: string;
  currentText: string;
  currentLink: string;
  currentCategory: string;
  cardHeader: string;
};

export const CurrentCard: React.FC<Props> = ({
  className,
  currentDesc,
  currentCategory,
  currentLink,
  currentText,
  cardHeader,
}) => {
  return (
    <Card
      className={cn(
        "col-span-12 lg:col-span-4 lg:row-span-2 space-y-2",
        className,
      )}
      variant="interactive"
    >
      <CardHeader className="p-1 pr-4 justify-end">
        <SMuted className="font-mono text-end">{cardHeader}</SMuted>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row">
          <SkillIcon
            variant="default"
            className="w-8 h-8 mr-2"
            category={currentCategory}
          />
          <Link
            href={
              cardHeader === "focus project"
                ? "projects".concat(currentLink.toString())
                : "about"
            }
          >
            <H4 className="text-wrap underline-offset-4 hover:underline">
              {currentDesc}
            </H4>
          </Link>
        </div>
        <div className="flex flex-row flex-wrap">
          <S className="leading-relaxed inline text-wrap">
            {cardHeader === "focus project"
              ? "I'm currently working on "
              : "I'm currently working as "}
            {currentText}
          </S>
        </div>
      </CardContent>
    </Card>
  );
};
