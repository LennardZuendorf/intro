"use client";

import {Link} from "@nextui-org/link";
import { siteConfig } from "@/config/site";
import React from "react";
import NextLink from "next/link";
import {Chip} from "@nextui-org/react";
import {HiAtSymbol} from 'react-icons/hi2';
import {AiFillLinkedin, AiOutlineGithub} from 'react-icons/ai';

export const Footer = () => {
    {
        return (
            <footer>
                <div className="mt-16 flex flex-col items-center">
                    <div className="mb-3 flex space-x-4">
                        <div className="flex gap-4">
                            <Link href={siteConfig.links.mail}>
                                <Chip
                                    startContent={<HiAtSymbol size={20}/>}
                                    variant="faded"
                                    color="default"
                                >
                                    Mail
                                </Chip>
                            </Link>

                            <Link href={siteConfig.links.linkedin}>
                                <Chip
                                    startContent={<AiFillLinkedin size={18} />}
                                    variant="faded"
                                    color="default"
                                >
                                    LinkedIn
                                </Chip>
                            </Link>

                            <Link href={siteConfig.links.github}>
                                <Chip
                                    startContent={<AiOutlineGithub size={20}/>}
                                    variant="faded"
                                    color="default"
                                >
                                    Github
                                </Chip>
                            </Link>
                        </div>
                    </div>
                    <div className="mb-2 flex space-x-2 text-sm">
                        <div>{siteConfig.name}</div>
                        <div>{`© ${new Date().getFullYear()}`}</div>
                        <div>{` | `}</div>
                        <Link href="/legal" color="foreground" underline="hover" size={"sm"}>legal</Link>
                    </div>
                </div>
            </footer>
        )
    }
}

