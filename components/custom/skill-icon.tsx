import * as React from "react";
import {cn} from "@/lib/utils"

import { HiOutlineAcademicCap } from "react-icons/hi2";
import { LuBoxes, LuLaptop2, LuBrainCircuit } from "react-icons/lu";
import {RxGear} from "react-icons/rx";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type Props = {
    category: String;
    className?: string;
};

export const SkillIcon: React.FC<Props> = ({ category, className}) => {

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost">
                        {category === "Academic" ? < HiOutlineAcademicCap className={cn(className)}/> :
                            category === "Fullstack Product" ? <LuBoxes className={cn(className,)}/> :
                                category === "Software Engineering" ? <LuLaptop2 className={cn(className)}/> :
                                    category === "Machine Learning" ? <LuBrainCircuit className={cn(className)}/> : <RxGear className={cn(className)} />
                        }
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>This is a {category} project.</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}