'use server';

import configPromise from '@payload-config';
import { getPayload } from 'payload';
import { cache } from 'react';
import type { SectionContent } from '@/payload-types';
import { sectionContentFallback } from './data/sectionContent';

// Base query functions - CACHED for deduplication across multiple composite functions
const querySectionContentRaw = cache(async (): Promise<SectionContent | null> => {
  try {
    const payload = await getPayload({ config: configPromise });
    const sectionContent = await payload.findGlobal({
      slug: 'sectionContent',
      depth: 2 // Ensure we get full related objects
    });
    return sectionContent as SectionContent;
  } catch (error) {
    console.error('Error fetching section content:', error);
    return null;
  }
});

// MAIN FUNCTION: Returns complete SectionContent with guaranteed fallbacks
export const fetchSectionContent = cache(async (): Promise<SectionContent> => {
  const rawSectionContent = await querySectionContentRaw();

  // If we have PayloadCMS data, return it; otherwise return complete fallback
  if (rawSectionContent) {
    return rawSectionContent;
  }

  // Return complete fallback with proper PayloadCMS structure
  return sectionContentFallback;
});
