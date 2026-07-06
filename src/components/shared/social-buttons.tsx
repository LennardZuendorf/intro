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
  buttonVariant?: 'default' | 'secondary' | 'outline' | 'link' | 'ghost' | 'flatSecondary';
  buttonClassName?: string;
  iconClassName?: string;
}

export function SocialButtons({
  socials,
  className,
  buttonClassName,
  iconClassName = 'w-5 h-5',
  buttonVariant = 'default'
}: SocialButtonsProps) {
  if (!socials || socials.length === 0) return null;

  return (
    <div className={cn('flex gap-2', className)}>
      {socials
        .filter((social) => social.url && social.icon)
        .map((social) => (
          <Button
            key={social._id}
            variant={buttonVariant}
            size='icon'
            className={buttonClassName}
            asChild
          >
            <Link
              href={social.url!}
              aria-label={social._title}
              target='_blank'
              rel='noopener noreferrer'
            >
              <span
                className={cn(
                  'inline-flex size-4 items-center justify-center [&_svg]:size-4',
                  iconClassName
                )}
                dangerouslySetInnerHTML={{ __html: social.icon! }}
              />
            </Link>
          </Button>
        ))}
    </div>
  );
}

SocialButtons.displayName = 'SocialButtons';
