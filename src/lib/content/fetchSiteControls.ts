'use server';

import configPromise from '@payload-config';
import { getPayload } from 'payload';
import { cache } from 'react';
import type { SiteControl } from '@/payload-types';
import { contentSettings } from './data/contentSettings';

// MAIN FUNCTION: Returns complete SiteControl with guaranteed fallbacks - CACHED for deduplication
export const fetchSiteControls = cache(async (): Promise<SiteControl> => {
  try {
    const payload = await getPayload({ config: configPromise });
    const siteControls = await payload.findGlobal({
      slug: 'siteControls'
    });

    // If we have PayloadCMS data, return it; otherwise return complete fallback
    if (siteControls) {
      return siteControls as SiteControl;
    }
  } catch (error) {
    console.error('Error fetching site controls:', error);
  }

  // Return complete fallback from ContentSettings
  return contentSettings;
});
