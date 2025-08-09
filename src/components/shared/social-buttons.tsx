import { basehub } from 'basehub';
import { Icon } from 'basehub/react-icon';
import Link from 'next/link';
import type React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/ui';

interface SocialButtonsProps {
  className?: string;
  buttonVariant?: 'default' | 'neutral' | 'noShadow' | 'accent' | 'link' | 'action';
  iconClassName?: string;
}

export async function SocialButtons({
  className,
  iconClassName = 'w-5 h-5',
  buttonVariant = 'default',
  ...props
}: SocialButtonsProps) {
  const socials = await basehub()
    .query({
      globals: {
        socials: {
          items: {
            _id: true,
            _title: true,
            url: true,
            icon: true
          }
        }
      }
    })
    .then((data) => data.globals.socials.items);

  if (!socials) return null;

  return (
    <div className={cn('flex gap-2', className)} {...props}>
      {socials.map((social) => {
        return (
          <Link
            href={social.url!}
            key={social._id}
            aria-label={social._title}
            target='_blank'
            rel='noopener noreferrer'
          >
            <Button variant={buttonVariant} size='icon'>
              <Icon
                key={social._id}
                content={social.icon || ''}
                components={{
                  svg: (props) => <svg {...props} className={iconClassName} />
                }}
              />
            </Button>
          </Link>
        );
      })}
    </div>
  );
}

SocialButtons.displayName = 'SocialButtons';
