'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/ui';
import { MailboxIcon } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';
import type { IconType } from 'react-icons';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { siteConfig } from '../../../content/ContentSettings';

// Icon mapping for common social platforms
const iconMap = {
  github: FaGithub,
  linkedin: FaLinkedin,
  mail: MailboxIcon
} as const;

// Available social types
type SocialType = keyof typeof iconMap;

// Individual social link configuration
export interface SocialLink {
  type: SocialType;
  href: string;
  label?: string;
  icon?: IconType | React.FC<{ size?: string | number; className?: string }>;
}

export interface SocialButtonsProps extends React.HTMLAttributes<HTMLDivElement> {
  // Array of social links to display
  socials?: SocialLink[];
  // Use predefined links from siteConfig
  useDefaultLinks?: boolean;
  // Button styling
  buttonVariant?: React.ComponentProps<typeof Button>['variant'];
  // Icon size (e.g. '1.25rem', '2vh')
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
  // If no socials provided and useDefaultLinks is true, use siteConfig links
  const socialLinks =
    socials ||
    (useDefaultLinks
      ? [
          { type: 'mail', href: siteConfig.links.mail },
          { type: 'linkedin', href: siteConfig.links.linkedin },
          { type: 'github', href: siteConfig.links.github }
        ]
      : []);

  // No social links to display
  if (socialLinks.length === 0) return null;

  return (
    <div className={cn('flex gap-2', className)} {...props}>
      {socialLinks.map((social, index) => {
        // Determine which icon to use (custom or from our map)
        const IconComponent = social.icon || iconMap[social.type];

        return (
          <Link
            href={social.href}
            key={`${social.type}-${index}`}
            aria-label={social.label || social.type}
          >
            <Button variant={buttonVariant} size='icon'>
              <IconComponent size={iconSize} className={iconSize ? undefined : 'size-5'} />
            </Button>
          </Link>
        );
      })}
    </div>
  );
};

SocialButtons.displayName = 'SocialButtons';
