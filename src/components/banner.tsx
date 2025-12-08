'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import type { SectionProps } from '@/app/page';

export function Banner(_props: SectionProps) {
  useEffect(() => {
    // Wait for client-side hydration and DOM to be ready
    if (typeof window === 'undefined') return;

    // Use requestAnimationFrame to ensure DOM is ready, then add a small delay
    const showToast = () => {
      // Check if user has already seen the notification
      const acknowledgment = localStorage.getItem('trackingCheck');

      if (acknowledgment !== 'true') {
        // Save to localStorage immediately when toast is shown (user has seen it)
        localStorage.setItem('trackingCheck', 'true');

        // Show toast notification on first visit
        toast('Privacy-Friendly Tracking', {
          description: (
            <p className='text-xs'>
              I use <strong>privacy-friendly, cookieless tracking powered by Vercel</strong> to
              enhance my website. This method doesn&apos;t require consent and avoids cross-session
              tracking.
            </p>
          ),
          action: {
            label: 'Learn More',
            onClick: () => {
              window.open(
                'https://vercel.com/docs/analytics/privacy-policy',
                '_blank',
                'noopener,noreferrer'
              );
            }
          },
          duration: 10000 // Show for 10 seconds
        });
      }
    };

    // Wait for next frame, then add a small delay to ensure Toaster is mounted
    requestAnimationFrame(() => {
      setTimeout(showToast, 200);
    });
  }, []);

  // This component doesn't render anything, it just triggers the toast
  return null;
}
