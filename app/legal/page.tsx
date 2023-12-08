'use client'

import {header, title} from "@/components/primitives";
import {
	Card,
	CardBody,
	Divider, Spacer,
	Tab,
	Table, TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Tabs
} from "@nextui-org/react";

export default function LegalPage() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10" >
			<div className="inline-block text-start justify-center">
				<h1 className={title()}>Legal & Data Protection</h1>
			</div>
			<Divider/>
			<div className="inline-block text-center justify-center">
				<div className="w-full">
					<Tabs aria-label="Options" defaultSelectedKey="data-protection">
						<Tab key="data-protection" title="Data Protection">
							<div className="text-start">
								<h2 className={header()}>Data Protection</h2>
								<p>These are the data protection guidelines. They are not yet finished.</p>
							</div>
						</Tab>
						<Tab key="cookies" title="Cookie">
							<div className="text-start">
								<h2 className={header()}>Cookie Usage</h2>
								<p>This page doesn&lsquot use cookies. It uses posthog for analytics, but doesn&lsquot store any data about you.</p>
								<Spacer />
								<p>That&lsquos it.</p>
							</div>
						</Tab>
						<Tab key="impressum" title="Impressum">
							<div className="text-start">
								<h2 className={header()}>Contact Information</h2>
								<p>You can contact me (the site owner) under the following information.</p>
								<p>(This is the legally required information about this website owner)</p>
								<Spacer y={4}/>
							</div>
						</Tab>
					</Tabs>
				</div>
			</div>
		</section>
	);
}
