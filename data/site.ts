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
    focusProjects:{
        top1: "tempus",
        top2: "thesis",
        top3: "quaestio"
    },
    links: {
        github: "/github",
        linkedin: "/linkd",
        mail: "/mail"
    },
};

export type SiteMetadata = typeof siteMetadata;

export const siteMetadata = {
    title: 'ignitr',
    author: 'Lennard',
    description: 'Lennard Zuendorfs project and showcase portfolio website',
    headerTitle: 'ignitr',
    language: 'en-us',
    theme: 'system',
    siteUrl: 'https://ignitr.tech',
    siteRepo: 'https://github.com/lennardzuendorf/ignitus',
    siteLogo: '/static/images/logo.png',
    image: '/static/images/avatar.png',
    socialBanner: '/static/images/social-preview.png',
    email: 'lennard@zuendorf.me',
    github: 'https://zuendorf.me/github',
    linkedin: 'https://zuendorf.me/linkd',
    locale: 'en-de',
}