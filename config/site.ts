export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "zuendorf.me",
    title: "Lennard Zündorf",
    description: "Personal Website and Portfolio",
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
    links: {
        github: "/github",
        linkedin: "/linkd",
        mail: "/mail"
    },
};