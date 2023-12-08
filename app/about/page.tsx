'use client'

import {header, subtitle, title} from "@/components/primitives";
import {Card, CardBody, CardHeader, Divider, Image} from "@nextui-org/react";

export default function AboutPage() {
	return (
		<section className="flex flex-col justify-center text-center gap-4 py-8 md:py-10">
			<div className="inline-block">
				<h1 className={title()}>About Me</h1>
			</div>
			<Divider/>
			<div className="grid grid-cols-12 gap-4 place-content-around place-items-center">
				<div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2">
					<Image
						alt="lennard zuendorf profile picture"
						className="object-cover rounded-xl"
						src="img/avatar.png"
						width={1000}
						radius="lg"
					/>
				</div>
				<div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2 text-start">
					<h4 className={subtitle()}>I’m a student of Business Computing at HTW Berlin University, focusing on Product Management and Software Engineering.</h4>
					<h4 className={subtitle()}><strong>I work as a Backend PM at CHECK24 in Berlin.</strong></h4>
				</div>
			</div>
		</section>
	);
}
