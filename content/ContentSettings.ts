// Content settings interface and configuration
export interface ContentSettings {
  sections: {
    showProjects: boolean;
    showAbout: boolean;
    showContact: boolean;
  };
}

export const contentSettings: ContentSettings = {
  sections: {
    showProjects: true,
    showAbout: true,
    showContact: true
  }
};

// Local site configuration (avoid name conflicts)
export const siteConfig = {
  links: {
    github: 'https://zuendorf.me/github',
    linkedin: 'https://zuendorf.me/linkd',
    mail: 'mailto:lennard@zuendorf.me',
    cv: 'https://zuendorf.me/cv'
  }
};

export const siteMetadata = {
  name: 'zuendorf.me',
  title: 'zuendorf.me',
  description: 'Personal Website and Portfolio',
  headerTitle: 'zuendorf.me',
  language: 'en-us',
  theme: 'system',
  siteUrl: 'https://zuendorf.me',
  siteLogo: '/img/logo.png',
  image: '/img/avatar.png',
  socialBanner: '/img/opengraph-image.png',
  locale: 'en-de'
};
