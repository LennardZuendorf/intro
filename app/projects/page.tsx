'use client'

import {callout, header, subtitle, title} from "@/components/primitives";
import {Card, CardHeader, CardBody, CardFooter, Image, Button, Divider, Chip, Spacer} from "@nextui-org/react";
import {Link} from "@nextui-org/link";
import {commonColors} from "@nextui-org/theme";
import {useTheme} from "next-themes";
import {useRouter} from "next/navigation";

export default function ProjectsPage() {
	const router = useRouter();

	return (
		<section className="flex flex-col items-center justify-center gap-2 sm:gap-4">
			<div id="title" className="block text-center justify-center pb-2 md:pb-4">
				<h1 className={title()}>My Projects</h1>
				<h4 className={subtitle()}>
					These are the projects I actively work on in my free time and some archived ones.
				</h4>
			</div>
		</section>
	);
}
