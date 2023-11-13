'use client'

import {callout, header, subtitle} from "@/components/primitives";
import {Card, CardBody, Image, Button, Slider, CardHeader, CardFooter, Chip} from "@nextui-org/react";
import {Link} from "@nextui-org/link";
import {color} from "framer-motion";
import {TitleGrid} from "@/components/title-grid";

export default function Home() {

	return (
		<section className="flex flex-col items-center justify-center gap-6 py-8 md:py-10" >
			<div className="inline-block text-center justify-center p-8 sm:p-16 md:p-32">
				<div className="gap-2">
					<Link href="https://www.targetfund.de">
						<Chip variant="shadow" color="primary" size="md">
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
			<div className="inline-block text-center justify-center flex flex-wrap w-full">
				<TitleGrid />
			</div>
		</section>
	);
}
