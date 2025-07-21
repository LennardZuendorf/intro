'use server';

import configPromise from '@payload-config';
import { getPayload } from 'payload';
import { tags as fallbackTags } from '@/lib/content/data/tagContent';
import type { Tag } from '@/payload-types';

// Base query functions - removed cache for direct data loading
const fetchAllTags = async (): Promise<Tag[]> => {
  try {
    const payload = await getPayload({ config: configPromise });
    const allTags = await payload.find({
      collection: 'tag',
      limit: 1000, // Get all tags
      depth: 1
    });

    // Use fallback if we get one or fewer tags
    if (allTags.docs.length <= 1) {
      return fallbackTags;
    }

    return allTags.docs as Tag[];
  } catch (error) {
    console.error('Error fetching tags:', error);
    // Fallback to static tag data
    return fallbackTags;
  }
};

export const fetchSkillTags = async (): Promise<Tag[]> => {
  const tags = await fetchAllTags();
  const skills = tags.filter((tag) => tag.type === 'skill');

  if (skills.length <= 1) {
    return fallbackTags.filter((tag) => tag.type === 'skill');
  }

  return skills;
};

export const fetchTechStackTags = async (): Promise<Tag[]> => {
  const tags = await fetchAllTags();
  const techStack = tags.filter((tag) => tag.type === 'techstack');

  if (techStack.length <= 1) {
    return fallbackTags.filter((tag) => tag.type === 'techstack');
  }

  return techStack;
};

export const fetchSocialTags = async (): Promise<Tag[]> => {
  const tags = await fetchAllTags();
  const socials = tags.filter((tag) => tag.type === 'socials');

  if (socials.length <= 1) {
    return fallbackTags.filter((tag) => tag.type === 'socials');
  }

  return socials;
};
