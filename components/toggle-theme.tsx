"use client"

import * as React from "react"
import { createContext, useContext, useState } from 'react';
import { IoColorFilterSharp,IoColorFilterOutline  } from 'react-icons/io5';
import { useTheme } from "next-themes"


import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

//TODO: Implement using state like zustand
export function ToggleTheme() {
    const { theme, setTheme } = useTheme();
    const [color, setColor] = useState("monochrome");

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <IoColorFilterSharp className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <IoColorFilterOutline className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">

                <DropdownMenuItem onClick={() => {setColor("colorful")}}>
                    Colorful
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => {setColor("monochrome")}}>
                    Monochrome
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

/*
                <DropdownMenuItem onClick={() => {
                    if (theme === "dark") {
                        setTheme("chroma-dark");
                    } else if (theme === "dark"){
                        setTheme("chroma-light");
                    } else return
                }}>
                    Colorful
                </DropdownMenuItem>
 */