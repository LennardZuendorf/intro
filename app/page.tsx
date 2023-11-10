'use client'

import { title, subtitle } from "@/components/primitives";
import {Card, CardBody, Image, Button, Slider, CardHeader} from "@nextui-org/react";

export default function Home() {

	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10" >
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>Hello and Welcome!</h1>
				
			</div>
			<div>
				<Card
				isBlurred
				className="border-none bg-background/60 dark:bg-default-100/50"
				shadow="sm"
				>
				<CardHeader>
					<h2 className={subtitle()}>I&apos;m a Technical Product Manager and Business Computing Student.</h2>
				</CardHeader>
				<CardBody>
					<div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
					</div>
				</CardBody>
				</Card>
			</div>
		</section>
	);
}
