import {Navbar} from "@/components/navbar";
import {Footer} from "@/components/footer";

export default function AboutLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section>
			<div className="container mx-auto grow w-full">
				{children}
			</div>
		</section>
	);
}
