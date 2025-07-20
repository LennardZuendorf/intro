'use server';

import configPromise from '@payload-config';
import { getPayload } from 'payload';
import { cache } from 'react';
import { experienceData } from '@/lib/content/data/experienceContent';
import type { Experience, Tag } from '@/payload-types';

// Raw query for all projects from PayloadCMS
export const fetchAllExperiences = cache(async (): Promise<Experience[]> => {
  try {
    const payload = await getPayload({ config: configPromise });

    // 1. Fetch all experiences (expecting only technology IDs)
    const projectsResult = await payload.find({
      collection: 'experiences',
      pagination: false,
      depth: 2, // Needs to be 2 to get the Picture Data
      select: {
        id: true,
        company: true,
        position: true,
        startDate: true,
        endDate: true,
        skills: true,
        description: true,
        responsibilityOne: true,
        responsibilityTwo: true,
        responsibilityThree: true
      }
    });

    console.log(
      'Experiences with skill IDs:',
      projectsResult.docs.map((p) => ({
        company: p.company,
        skills: p.skills
      }))
    );

    // 2. Collect all unique technology IDs from all projects
    const allTechIds = new Set<number>();
    for (const project of projectsResult.docs) {
      if (project.skills && Array.isArray(project.skills)) {
        for (const techId of project.skills) {
          if (typeof techId === 'number') {
            allTechIds.add(techId);
          }
        }
      }
    }

    console.log('Unique skill IDs to fetch:', Array.from(allTechIds));

    // 3. Fetch ALL techstack tags in a single query
    const techstackResult = await payload.find({
      collection: 'tag',
      where: {
        id: {
          in: Array.from(allTechIds)
        },
        type: {
          equals: 'techstack'
        }
      },
      depth: 0,
      pagination: false
    });

    console.log(
      'Fetched skill tags:',
      techstackResult.docs.map((t) => ({ id: t.id, name: t.name }))
    );

    // 4. Create a lookup map for O(1) technology assignment
    const techLookup = new Map();
    for (const tech of techstackResult.docs) {
      techLookup.set(tech.id, tech);
    }

    // 5. Map skills to experiences
    const experiencesWithSkills = projectsResult.docs.map((experience) => {
      if (experience.skills && Array.isArray(experience.skills)) {
        const populatedSkills = experience.skills
          .map((skillId) => {
            if (typeof skillId === 'number') {
              return techLookup.get(skillId) || null;
            }
            return null;
          })
          .filter((skill) => skill !== null);

        return {
          ...experience,
          skills: populatedSkills
        };
      }
      return experience;
    }) as Experience[];

    console.log(
      'Final experiences with populated skills:',
      experiencesWithSkills.map((e) => ({
        company: e.company,
        skills: e.skills?.map((t) => (t as Tag).name)
      }))
    );

    // 6. Check if we need fallback experiences
    if (experiencesWithSkills.length <= 1) {
      console.log('Insufficient experiences found, using fallback experiences');

      return experienceData;
    }

    return experiencesWithSkills;
  } catch (error) {
    console.error('Error fetching experiences:', error);

    return experienceData;
  }
});

// MAIN FUNCTION: Returns single project by ID (no fallback - null if not found)
export const fetchExperienceById = cache(
  async (experienceId: number): Promise<Experience | null> => {
    const experiences = await fetchAllExperiences();

    if (experiences.length <= 1) {
      return experienceData.find((experience) => experience.id === experienceId) || null;
    }

    return experiences.find((experience) => experience.id === experienceId) || null;
  }
);
