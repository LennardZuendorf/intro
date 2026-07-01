import Link from 'next/link';
import { Button } from '@/components/ui/retroui/Button';
import { cn } from '@/lib/utils/ui';

export type SocialItem = {
  _id: string;
  _title: string;
  url: string | null;
  icon: string | null;
};

interface SocialButtonsProps {
  socials: SocialItem[];
  className?: string;
  buttonVariant?: 'default' | 'secondary' | 'outline' | 'link' | 'ghost';
  iconClassName?: string;
}

export function SocialButtons({
  socials,
  className,
  iconClassName = 'w-5 h-5',
  buttonVariant = 'default'
}: SocialButtonsProps) {
  if (!socials || socials.length === 0) return null;

  return (
    <div className={cn('flex gap-2', className)}>
      {socials
        .filter((social) => social.url && social.icon)
        .map((social) => (
          <Button key={social._id} variant={buttonVariant} size='icon' asChild>
            <Link
              href={social.url!}
              aria-label={social._title}
              target='_blank'
              rel='noopener noreferrer'
            >
              <span
                className={cn('inline-flex items-center justify-center', iconClassName)}
                dangerouslySetInnerHTML={{ __html: social.icon! }}
              />
            </Link>
          </Button>
        ))}
    </div>
  );
}

SocialButtons.displayName = 'SocialButtons';
