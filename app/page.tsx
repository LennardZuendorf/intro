'use client'

import {callout, header, subtitle} from "@/components/primitives";
import {Card, CardBody, Image, Button, Slider, CardHeader, CardFooter, Chip, Spacer} from "@nextui-org/react";
import {Link} from "@nextui-org/link";
import {color} from "framer-motion";
import {TitleGrid} from "@/components/titleGrid";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-2 sm:gap-4" >
			<div id="title-hero" className="block text-center justify-center p-8 sm:p-16 md:p-36">
				<Link href="/linkd">
					<Chip
						variant="shadow"
						size="md"
						classNames={{
							base: "bg-gradient-to-br from-default-200 to-default-700 shadow-default-500/30",
							content: "drop-shadow shadow-black text-white",
						}}>
						Connect to me on LinkedIn!
					</Chip>
				</Link>
				<Spacer x={24} />
				<h1 className={callout()}>Welcome to My Portfolio Site!</h1>
				<h4 className={subtitle()}>Here you can find all the information about me and my projects.</h4>
			</div>
			<div className="w-full text-start block">
				<TitleGrid />
			</div>
		</section>
	);
}