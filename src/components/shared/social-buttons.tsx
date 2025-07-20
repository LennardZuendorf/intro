'use client';

import { MailboxIcon } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/ui';
import type { Tag } from '@/payload-types';

// Icon mapping for common social platforms
const iconMap = {
  github: FaGithub,
  linkedin: FaLinkedin,
  mail: MailboxIcon
} as const;

type IconMapKeys = keyof typeof iconMap;

interface SocialButtonsProps {
  socials?: Tag[];
  useDefaultLinks?: boolean;
  className?: string;
  buttonVariant?: 'default' | 'neutral' | 'noShadow' | 'accent' | 'link' | 'action';
  iconSize?: string;
}

export const SocialButtons: React.FC<SocialButtonsProps> = ({
  socials,
  useDefaultLinks = true,
  className,
  buttonVariant = 'default',
  iconSize = '1.25rem',
  ...props
}) => {
  // Don't render if socials is undefined or empty
  if (!socials || socials.length === 0) return null;

  // Filter socials to only include those with valid icons and links
  const validSocials = socials.filter((social): social is Tag => {
    // Check if the social has a valid type that maps to an icon
    const hasValidIcon = Boolean(
      social.name && (social.name.toLowerCase() as IconMapKeys) in iconMap
    );
    // Check if the social has a link
    const hasLink = Boolean(social.link && typeof social.link === 'string');

    return hasValidIcon && hasLink;
  });

  // Don't render if no valid socials
  if (validSocials.length === 0) {
    console.log('No valid socials found');
    console.log(socials);
    return null;
  }

  return (
    <div className={cn('flex gap-2', className)} {...props}>
      {validSocials.map((social, index) => {
        return (
          <Link
            href={social.link!}
            key={`${social.type}-${index}`}
            aria-label={social.name || social.type}
            target='_blank'
            rel='noopener noreferrer'
          >
            <Button variant={buttonVariant} size='icon'>
              {social.name.toLowerCase() === 'github' && (
                <FaGithub size={iconSize} className='w-5 h-5' />
              )}
              {social.name.toLowerCase() === 'linkedin' && (
                <FaLinkedin size={iconSize} className='w-5 h-5' />
              )}
              {social.name.toLowerCase() === 'mail' && (
                <MailboxIcon size={iconSize} className='w-5 h-5' />
              )}
            </Button>
          </Link>
        );
      })}
    </div>
  );
};

SocialButtons.displayName = 'SocialButtons';
