import * as React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer
      className={cn('flex flex-col items-center pt-4 pb-6 w-full', className)}
    >
      <div className='flex items-center gap-x-2 text-xs sm:text-sm text-muted-foreground'>
        <span>Built by Lennard Zündorf</span>
        <span>© {new Date().getFullYear()}</span>
        <span>|</span>
        <Link href='/legal' className='font-medium hover:underline hover:text-foreground transition-colors'>
          legal
        </Link>
      </div>
    </footer>
  );
};
