'use client'

import {callout, header, subtitle} from "@/components/primitives";
import {Card, CardBody, Image, Button, Slider, CardHeader, CardFooter, Chip} from "@nextui-org/react";
import {Link} from "@nextui-org/link";
import {color} from "framer-motion";
import {TitleGrid} from "@/components/title-grid";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-8 sm:gap-16" >
			<div className="block text-center justify-center pt-16 pb-16 sm:pt-24 sm:pb-24 md:pt-48 md:pb-48">
				<div  id="title-hero">
					<Link href="https://www.targetfund.de">
						<Chip
							variant="shadow"
							size="md"
							classNames={{
								base: "bg-gradient-to-br from-default-200 to-default-700 shadow-default-500/30",
								content: "drop-shadow shadow-black text-white",
							}}>
							Check out targetfund.de!
						</Chip>
					</Link>
				</div>
				<br/>
				<h1 className={callout()}>Welcome to My Profile & Portfolio Website!</h1>
				<h4 className={subtitle()}>
					Here you can find all the information about me and my projects.
				</h4>
			</div>
			<div id="title-grid" className="block text-center justify-center">
				<div id="grid-header" className="pb-8">
					<h2 className={header()}>
						My Projects & Activities
					</h2>
				</div>
				<TitleGrid />
			</div>
		</section>
	);
}
