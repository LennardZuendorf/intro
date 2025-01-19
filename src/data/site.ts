export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	navItems: [
		{
			label: "Home",
			href: "/",
		},
		{
			label: "Projects",
			href: "/projects",
		},
		{
			label: "About",
			href: "/about",
		},
	],
	focusProjects: {
		top1: "tempus",
		top2: "thesis",
		top3: "quaestio",
	},
	links: {
		github: "https://zuendorf.me/github",
		linkedin: "https://zuendorf.me/linkd",
		mail: "mailto:lennard@zuendorf.me",
		cv: "https://zuendorf.me/cv",
	},
};

export type SiteMetadata = typeof siteMetadata;

export const siteMetadata = {
	name: "zuendorf.me",
	title: "zuendorf.me",
	description: "Personal Website and Portfolio",
	headerTitle: "zuendorf.me",
	language: "en-us",
	theme: "system",
	siteUrl: "https://zuendorf.me",
	siteLogo: "/img/logo.png",
	image: "/img/avatar.png",
	socialBanner: "/img/opengraph-image.png",
	locale: "en-de",
};
