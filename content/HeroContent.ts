// Central fallback data for main sections when PayloadCMS data is not available

export interface HeroFallbackData {
  introText: string;
  projectTitle: string;
  projectDescription: string;
  projectLink: string;
  currentRoleTitle: string;
  currentRoleDescription: string;
  currentRoleLink: string;
}

export const heroFallbackData: HeroFallbackData = {
  introText:
    'a 25-year-old Product Leader based in Berlin, Germany. I leverage my technical expertise to execute product strategy, drive implementation and manage the product.',
  projectTitle: 'Stride Analytics',
  projectDescription: 'Performance analytics for agile teams.',
  projectLink: '/stride-analytics',
  currentRoleTitle: 'Senior Product Manager @Check24',
  currentRoleDescription: 'Working with a team of 10+ engineers to build a new product.',
  currentRoleLink: '/#about'
};
