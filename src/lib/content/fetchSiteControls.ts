'use server';

import configPromise from '@payload-config';
import { getPayload } from 'payload';
import { siteControlFallback } from '@/lib/content/data/siteControl';
import type { SiteControl } from '@/payload-types';

// MAIN FUNCTION: Returns complete SiteControl with guaranteed fallbacks
export const fetchSiteControls = async (): Promise<SiteControl> => {
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
  return siteControlFallback;
};
