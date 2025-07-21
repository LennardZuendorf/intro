'use server';

import configPromise from '@payload-config';
import { draftMode } from 'next/headers';
import { getPayload } from 'payload';
import { fetchTechStackTags } from '@/lib/content/fetchTags';
import type { Project, Tag } from '@/payload-types';

// Raw query for all projects from PayloadCMS
export const fetchAllProjects = async (): Promise<Project[]> => {
  try {
    const { isEnabled: draft } = await draftMode();
    const payload = await getPayload({ config: configPromise });

    // 1. Fetch all projects (expecting only technology IDs)
    const projectsResult = await payload.find({
      collection: 'projects',
      overrideAccess: draft,
      pagination: false,
      depth: 2, // Needs to be 2 to get the Picture Data
      select: {
        id: true,
        title: true,
        slug: true,
        shortDescription: true,
        heroImage: true,
        technologies: true,
        liveUrl: true,
        repoUrl: true
      },
      where: {
        _status: {
          equals: 'published'
        }
      }
    });

    console.log(
      'Projects with technology IDs:',
      projectsResult.docs.map((p) => ({
        title: p.title,
        technologies: p.technologies
      }))
    );

    // 2. Collect all unique technology IDs from all projects
    const allTechIds = new Set<number>();
    for (const project of projectsResult.docs) {
      if (project.technologies && Array.isArray(project.technologies)) {
        for (const techId of project.technologies) {
          if (typeof techId === 'number') {
            allTechIds.add(techId);
          }
        }
      }
    }

    console.log('Unique technology IDs to fetch:', Array.from(allTechIds));

    // 3. Fetch techstack tags using existing tag fetching logic
    const techStackTags = await fetchTechStackTags();

    console.log(
      'Fetched techstack tags:',
      techStackTags.map((t) => ({ id: t.id, name: t.name }))
    );

    // 4. Create a lookup map for O(1) technology assignment
    const techLookup = new Map();
    for (const tech of techStackTags) {
      techLookup.set(tech.id, tech);
    }

    // 5. Map technologies to projects
    const projectsWithTechnologies = projectsResult.docs.map((project) => {
      if (project.technologies && Array.isArray(project.technologies)) {
        const populatedTechnologies = project.technologies
          .map((techId) => {
            if (typeof techId === 'number') {
              return techLookup.get(techId) || null;
            }
            return null;
          })
          .filter((tech) => tech !== null);

        return {
          ...project,
          technologies: populatedTechnologies
        };
      }
      return project;
    }) as Project[];

    console.log(
      'Final projects with populated technologies:',
      projectsWithTechnologies.map((p) => ({
        title: p.title,
        technologies: p.technologies?.map((t) => (t as Tag).name)
      }))
    );

    return projectsWithTechnologies;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

// MAIN FUNCTION: Returns single project by ID (no fallback - null if not found)
export const fetchProjectById = async (projectId: number): Promise<Project | null> => {
  const projects = await fetchAllProjects();

  return projects.find((project) => project.id === projectId) || null;
};

// MAIN FUNCTION: Returns single project by slug (no fallback - null if not found)
export const fetchProjectBySlug = async (slug: string): Promise<Project | null> => {
  const projects = await fetchAllProjects();

  return projects.find((project) => project.slug === slug) || null;
};
