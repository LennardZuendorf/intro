import React from 'react';
import type { Query } from '../../basehub-types';

// Mock for BaseHub modules
export const RichText = ({ children }: { children: React.ReactNode }) => {
  return React.createElement('div', { 'data-testid': 'rich-text' }, children);
};

export const Pump = ({
  children
}: {
  children: ((data: [Query]) => React.ReactNode) | React.ReactNode;
  draft?: boolean;
  queries?: unknown[];
}) => {
  // Mock data structure that matches BaseHub types exactly
  const mockData: Query = {
    _analyticsKey: 'mock-analytics-key',
    _diff: {},
    _structure: {},
    _sys: {
      id: 'mock-repo-id',
      lastModifiedAt: '2024-01-01T00:00:00Z',
      firstPublishedAt: '2024-01-01T00:00:00Z',
      publishedAt: '2024-01-01T00:00:00Z',
      __typename: 'RepoSys'
    },
    globals: {
      _analyticsKey: 'mock-globals-analytics-key',
      _dashboardUrl: 'mock-dashboard-url',
      _id: 'mock-globals-id',
      _idPath: 'mock-globals-id-path',
      _slug: 'mock-globals-slug',
      _slugPath: 'mock-globals-slug-path',
      _sys: {
        id: 'mock-block-sys-id',
        lastModifiedAt: '2024-01-01T00:00:00Z',
        firstPublishedAt: '2024-01-01T00:00:00Z',
        publishedAt: '2024-01-01T00:00:00Z',
        __typename: 'BlockDocumentSys'
      },
      _title: 'Mock Globals',
      __typename: 'Globals'
    },
    sectionsAndPages: {
      _analyticsKey: 'mock-sections-analytics-key',
      _dashboardUrl: 'mock-sections-dashboard-url',
      _id: 'mock-sections-id',
      _idPath: 'mock-sections-id-path',
      _slug: 'mock-sections-slug',
      _slugPath: 'mock-sections-slug-path',
      _sys: {
        id: 'mock-sections-sys-id',
        lastModifiedAt: '2024-01-01T00:00:00Z',
        firstPublishedAt: '2024-01-01T00:00:00Z',
        publishedAt: '2024-01-01T00:00:00Z',
        __typename: 'BlockDocumentSys'
      },
      _title: 'Mock Sections and Pages',
      heroSection: {
        _analyticsKey: 'mock-hero-analytics-key',
        _dashboardUrl: 'mock-hero-dashboard-url',
        _id: 'mock-hero-id',
        _idPath: 'mock-hero-id-path',
        _slug: 'mock-hero-slug',
        _slugPath: 'mock-hero-slug-path',
        _sys: {
          id: 'mock-hero-sys-id',
          lastModifiedAt: '2024-01-01T00:00:00Z',
          firstPublishedAt: '2024-01-01T00:00:00Z',
          publishedAt: '2024-01-01T00:00:00Z',
          __typename: 'BlockDocumentSys'
        },
        _title: 'Mock Hero Section',
        content: {
          mainHeroText: {
            html: '<p>Mock Hero Text</p>',
            json: {
              content: [{ type: 'paragraph', children: [{ text: 'Mock Hero Text' }] }],
              toc: [],
              __typename: 'MainHeroTextRichText'
            },
            markdown: 'Mock Hero Text',
            plainText: 'Mock Hero Text',
            readingTime: 1,
            __typename: 'MainHeroText'
          },
          avatarImage: {
            url: '/mock-avatar.jpg',
            alt: 'Mock Avatar',
            rawUrl: '/mock-avatar.jpg',
            fileName: 'mock-avatar.jpg',
            width: 400,
            height: 400,
            mimeType: 'image/jpeg',
            __typename: 'Asset'
          },
          selectedProject: {
            _title: 'Mock Project',
            shortDescription: 'Mock project description.',
            _slug: 'mock-project',
            __typename: 'ProjectComponent'
          },
          selectedExperience: {
            _title: 'Mock Role',
            companyDescription: 'Mock company description.',
            companyLink: 'https://mock-company.com',
            __typename: 'ExperienceComponent'
          },
          callToAction: true,
          __typename: 'HeroSectionContent'
        },
        socials: {
          _analyticsKey: 'mock-socials-analytics-key',
          _dashboardUrl: 'mock-socials-dashboard-url',
          _id: 'mock-socials-id',
          _idPath: 'mock-socials-id-path',
          _meta: {
            totalCount: 1,
            __typename: 'ListMeta'
          },
          _searchKey: 'mock-socials-search-key',
          _slug: 'mock-socials-slug',
          _slugPath: 'mock-socials-slug-path',
          _sys: {
            id: 'mock-socials-sys-id',
            lastModifiedAt: '2024-01-01T00:00:00Z',
            firstPublishedAt: '2024-01-01T00:00:00Z',
            publishedAt: '2024-01-01T00:00:00Z',
            __typename: 'BlockDocumentSys'
          },
          _title: 'Mock Socials',
          items: [
            {
              _id: '1',
              _title: 'GitHub',
              url: 'https://github.com/mock',
              __typename: 'SocialComponent'
            }
          ],
          __typename: 'Socials'
        },
        showAbout: true,
        showProjects: true,
        __typename: 'HeroSection'
      },
      aboutSection: {
        _analyticsKey: 'mock-about-analytics-key',
        _dashboardUrl: 'mock-about-dashboard-url',
        _id: 'mock-about-id',
        _idPath: 'mock-about-id-path',
        _slug: 'mock-about-slug',
        _slugPath: 'mock-about-slug-path',
        _sys: {
          id: 'mock-about-sys-id',
          lastModifiedAt: '2024-01-01T00:00:00Z',
          firstPublishedAt: '2024-01-01T00:00:00Z',
          publishedAt: '2024-01-01T00:00:00Z',
          __typename: 'BlockDocumentSys'
        },
        _title: 'Mock About Section',
        aboutMeText: {
          html: '<p>Mock About Me Text</p>',
          json: {
            content: [{ type: 'paragraph', children: [{ text: 'Mock About Me Text' }] }],
            toc: [],
            __typename: 'AboutMeTextRichText'
          },
          markdown: 'Mock About Me Text',
          plainText: 'Mock About Me Text',
          readingTime: 1,
          __typename: 'AboutMeText'
        },
        quickSkillsShowcase: {
          _analyticsKey: 'mock-quick-skills-analytics-key',
          _dashboardUrl: 'mock-quick-skills-dashboard-url',
          _id: 'mock-quick-skills-id',
          _idPath: 'mock-quick-skills-id-path',
          _meta: {
            totalCount: 2,
            __typename: 'ListMeta'
          },
          _searchKey: 'mock-quick-skills-search-key',
          _slug: 'mock-quick-skills-slug',
          _slugPath: 'mock-quick-skills-slug-path',
          _sys: {
            id: 'mock-quick-skills-sys-id',
            lastModifiedAt: '2024-01-01T00:00:00Z',
            firstPublishedAt: '2024-01-01T00:00:00Z',
            publishedAt: '2024-01-01T00:00:00Z',
            __typename: 'BlockDocumentSys'
          },
          _title: 'Mock Quick Skills Showcase',
          items: [
            { _id: '1', _title: 'Skill 1', __typename: 'SkillComponent' },
            { _id: '2', _title: 'Skill 2', __typename: 'SkillComponent' }
          ],
          __typename: 'QuickSkillsShowcase'
        },
        experiences: {
          _analyticsKey: 'mock-experiences-analytics-key',
          _dashboardUrl: 'mock-experiences-dashboard-url',
          _id: 'mock-experiences-id',
          _idPath: 'mock-experiences-id-path',
          _meta: {
            totalCount: 1,
            __typename: 'ListMeta'
          },
          _searchKey: 'mock-experiences-search-key',
          _slug: 'mock-experiences-slug',
          _slugPath: 'mock-experiences-slug-path',
          _sys: {
            id: 'mock-experiences-sys-id',
            lastModifiedAt: '2024-01-01T00:00:00Z',
            firstPublishedAt: '2024-01-01T00:00:00Z',
            publishedAt: '2024-01-01T00:00:00Z',
            __typename: 'BlockDocumentSys'
          },
          _title: 'Mock Experiences',
          items: [
            {
              _id: 'exp1',
              _title: 'Mock Job',
              companyDescription: 'Mock Company',
              startDate: '2020-01-01',
              endDate: '2022-12-31',
              companyLink: 'https://mockcompany.com',
              jobActivities: {
                html: '<p>Mock job activities</p>',
                json: {
                  content: [],
                  toc: [],
                  __typename: 'JobActivitiesRichText'
                },
                markdown: 'Mock job activities',
                plainText: 'Mock job activities',
                readingTime: 1,
                __typename: 'JobActivities'
              },
              skills: [],
              __typename: 'ExperienceComponent'
            }
          ],
          __typename: 'Experiences'
        },
        __typename: 'AboutSection'
      },
      projectsSection: {
        _analyticsKey: 'mock-projects-analytics-key',
        _dashboardUrl: 'mock-projects-dashboard-url',
        _id: 'mock-projects-id',
        _idPath: 'mock-projects-id-path',
        _meta: {
          totalCount: 2,
          __typename: 'ListMeta'
        },
        _searchKey: 'mock-projects-search-key',
        _slug: 'mock-projects-slug',
        _slugPath: 'mock-projects-slug-path',
        _sys: {
          id: 'mock-projects-sys-id',
          lastModifiedAt: '2024-01-01T00:00:00Z',
          firstPublishedAt: '2024-01-01T00:00:00Z',
          publishedAt: '2024-01-01T00:00:00Z',
          __typename: 'BlockDocumentSys'
        },
        _title: 'Mock Projects Section',
        items: [
          {
            _id: 'proj1',
            _title: 'Mock Project 1',
            _slug: 'mock-project-1',
            shortDescription: 'Desc 1',
            date: '2023-01-01',
            technology: [],
            __typename: 'ProjectComponent'
          },
          {
            _id: 'proj2',
            _title: 'Mock Project 2',
            _slug: 'mock-project-2',
            shortDescription: 'Desc 2',
            date: '2023-02-01',
            technology: [],
            __typename: 'ProjectComponent'
          }
        ],
        __typename: 'ProjectsSection'
      },
      legalPage: {
        _analyticsKey: 'mock-legal-analytics-key',
        _dashboardUrl: 'mock-legal-dashboard-url',
        _id: 'mock-legal-id',
        _idPath: 'mock-legal-id-path',
        _slug: 'mock-legal-slug',
        _slugPath: 'mock-legal-slug-path',
        _sys: {
          id: 'mock-legal-sys-id',
          lastModifiedAt: '2024-01-01T00:00:00Z',
          firstPublishedAt: '2024-01-01T00:00:00Z',
          publishedAt: '2024-01-01T00:00:00Z',
          __typename: 'BlockDocumentSys'
        },
        _title: 'Mock Legal Page',
        dataPrivacyRegulations: [
          {
            _analyticsKey: 'mock-legal-de-analytics-key',
            _dashboardUrl: 'mock-legal-de-dashboard-url',
            _id: 'mock-legal-de-id',
            _idPath: 'mock-legal-de-id-path',
            _slug: 'mock-legal-de-slug',
            _slugPath: 'mock-legal-de-slug-path',
            _sys: {
              id: 'mock-legal-de-sys-id',
              lastModifiedAt: '2024-01-01T00:00:00Z',
              firstPublishedAt: '2024-01-01T00:00:00Z',
              publishedAt: '2024-01-01T00:00:00Z',
              __typename: 'BlockDocumentSys'
            },
            _title: 'German',
            dataProtectionRules: {
              html: '<p>Mock German Legal Text</p>',
              json: {
                content: [{ type: 'paragraph', children: [{ text: 'Mock German Legal Text' }] }],
                toc: [],
                __typename: 'DataProtectionRulesRichText'
              },
              markdown: 'Mock German Legal Text',
              plainText: 'Mock German Legal Text',
              readingTime: 1,
              __typename: 'DataProtectionRules'
            },
            impressum: {
              html: '<p>Mock German Impressum</p>',
              json: {
                content: [{ type: 'paragraph', children: [{ text: 'Mock German Impressum' }] }],
                toc: [],
                __typename: 'ImpressumRichText'
              },
              markdown: 'Mock German Impressum',
              plainText: 'Mock German Impressum',
              readingTime: 1,
              __typename: 'Impressum'
            },
            __typename: 'LegalInfoComponent'
          },
          {
            _analyticsKey: 'mock-legal-en-analytics-key',
            _dashboardUrl: 'mock-legal-en-dashboard-url',
            _id: 'mock-legal-en-id',
            _idPath: 'mock-legal-en-id-path',
            _slug: 'mock-legal-en-slug',
            _slugPath: 'mock-legal-en-slug-path',
            _sys: {
              id: 'mock-legal-en-sys-id',
              lastModifiedAt: '2024-01-01T00:00:00Z',
              firstPublishedAt: '2024-01-01T00:00:00Z',
              publishedAt: '2024-01-01T00:00:00Z',
              __typename: 'BlockDocumentSys'
            },
            _title: 'English',
            dataProtectionRules: {
              html: '<p>Mock English Legal Text</p>',
              json: {
                content: [{ type: 'paragraph', children: [{ text: 'Mock English Legal Text' }] }],
                toc: [],
                __typename: 'DataProtectionRulesRichText'
              },
              markdown: 'Mock English Legal Text',
              plainText: 'Mock English Legal Text',
              readingTime: 1,
              __typename: 'DataProtectionRules'
            },
            impressum: {
              html: '<p>Mock English Impressum</p>',
              json: {
                content: [{ type: 'paragraph', children: [{ text: 'Mock English Impressum' }] }],
                toc: [],
                __typename: 'ImpressumRichText'
              },
              markdown: 'Mock English Impressum',
              plainText: 'Mock English Impressum',
              readingTime: 1,
              __typename: 'Impressum'
            },
            __typename: 'LegalInfoComponent'
          }
        ],
        meta: {
          _analyticsKey: 'mock-legal-meta-analytics-key',
          _dashboardUrl: 'mock-legal-meta-dashboard-url',
          _id: 'mock-legal-meta-id',
          _idPath: 'mock-legal-meta-id-path',
          _slug: 'mock-legal-meta-slug',
          _slugPath: 'mock-legal-meta-slug-path',
          _sys: {
            id: 'mock-legal-meta-sys-id',
            lastModifiedAt: '2024-01-01T00:00:00Z',
            firstPublishedAt: '2024-01-01T00:00:00Z',
            publishedAt: '2024-01-01T00:00:00Z',
            __typename: 'BlockDocumentSys'
          },
          _title: 'Mock Legal Meta',
          desc: 'Mock legal meta description',
          img: {
            url: '/mock-og-image.jpg',
            rawUrl: '/mock-og-image.jpg',
            fileName: 'mock-og-image.jpg',
            width: 1200,
            height: 630,
            mimeType: 'image/jpeg',
            __typename: 'BlockOgImage'
          },
          title: 'Mock Legal Page Title',
          __typename: 'MetaComponent'
        },
        __typename: 'LegalPage'
      },
      __typename: 'SectionsAndPages'
    },
    types: {
      _analyticsKey: 'mock-types-analytics-key',
      _dashboardUrl: 'mock-types-dashboard-url',
      _id: 'mock-types-id',
      _idPath: 'mock-types-id-path',
      _slug: 'mock-types-slug',
      _slugPath: 'mock-types-slug-path',
      _sys: {
        id: 'mock-types-sys-id',
        lastModifiedAt: '2024-01-01T00:00:00Z',
        firstPublishedAt: '2024-01-01T00:00:00Z',
        publishedAt: '2024-01-01T00:00:00Z',
        __typename: 'BlockDocumentSys'
      },
      _title: 'Mock Types',
      skills: {
        _analyticsKey: 'mock-skills-analytics-key',
        _dashboardUrl: 'mock-skills-dashboard-url',
        _id: 'mock-skills-id',
        _idPath: 'mock-skills-id-path',
        _meta: {
          totalCount: 2,
          __typename: 'ListMeta'
        },
        _searchKey: 'mock-skills-search-key',
        _slug: 'mock-skills-slug',
        _slugPath: 'mock-skills-slug-path',
        _sys: {
          id: 'mock-skills-sys-id',
          lastModifiedAt: '2024-01-01T00:00:00Z',
          firstPublishedAt: '2024-01-01T00:00:00Z',
          publishedAt: '2024-01-01T00:00:00Z',
          __typename: 'BlockDocumentSys'
        },
        _title: 'Mock Skills',
        items: [
          { _id: 'skill1', _title: 'Mock Skill 1', __typename: 'SkillComponent' },
          { _id: 'skill2', _title: 'Mock Skill 2', __typename: 'SkillComponent' }
        ],
        __typename: 'Skills'
      },
      __typename: 'Types'
    },
    __typename: 'Query'
  };

  if (typeof children === 'function') {
    return children([mockData]);
  }

  return React.createElement('div', { 'data-testid': 'pump' }, children);
};

// Mock draftMode from Next.js
export const draftMode = () => ({
  isEnabled: false
});
