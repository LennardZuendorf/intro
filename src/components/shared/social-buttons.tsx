import { basehub } from 'basehub';
import { Icon } from 'basehub/react-icon';
import Link from 'next/link';
import { Button } from '@/components/retroui/Button';
import { cn } from '@/lib/utils/ui';

interface SocialButtonsProps {
  className?: string;
  buttonVariant?: 'default' | 'secondary' | 'outline' | 'link' | 'ghost';
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
      {socials
        .filter((social) => social.url && social.icon)
        .map((social) => {
          return (
            <Button key={social._id} variant={buttonVariant} size='icon' asChild>
              <Link
                href={social.url!}
                aria-label={social._title}
                target='_blank'
                rel='noopener noreferrer'
              >
                <Icon
                  content={social.icon || ''}
                  components={{
                    svg: (props) => <svg {...props} className={iconClassName} />
                  }}
                />
              </Link>
            </Button>
          );
        })}
    </div>
  );
}

SocialButtons.displayName = 'SocialButtons';
