'use client'

import {header, title} from "@/components/primitives";
import {Card, CardBody} from "@nextui-org/react";

export default function AboutPage() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10" >
			<div className="inline-block text-center justify-center">
				<h1 className={title()}>About Me</h1>
			</div>
			<Card className="w-full">
				<CardBody>
					<div>
						<p>Make beautiful websites regardless of your design experience.</p>
					</div>
				</CardBody>
			</Card>
		</section>
	);
}
