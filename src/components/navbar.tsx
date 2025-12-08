'use client';

import { Icon } from 'basehub/react-icon';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ThemeSelect } from '@/components/theme/theme-select';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils/ui';

type SocialItem = {
  _id: string;
  _title: string;
  url: string | null;
  icon: string | null;
};

export const Nav = ({
  className,
  socials
}: {
  className?: string;
  showAbout: boolean;
  showProjects: boolean;
  socials: SocialItem[];
}) => {
  return <Navbar className={cn('flex max-w-fit mx-auto', className)} socials={socials} />;
};

const Navbar = ({ className = '', socials }: { className?: string; socials: SocialItem[] }) => {
  return (
    <motion.header
      className={cn('flex justify-center items-center py-2', 'w-full md:w-auto', className)}
    >
      <NavigationMenu className='bg-primary w-full md:w-auto'>
        <NavigationMenuList className='flex justify-end w-full'>
          <div className='isolate relative z-[9999]'>
            <NavigationMenuItem key='settings' className='relative bg-primary'>
              <div className='flex space-x-1 items-center'>
                {socials
                  .filter((social) => social.url && social.icon)
                  .map((social) => (
                    <Link
                      href={social.url!}
                      key={social._id}
                      aria-label={social._title}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <Button variant='default' size='icon' className='shadow-none'>
                        <Icon
                          content={social.icon!}
                          components={{
                            svg: (props) => <svg {...props} className='w-4 h-4' />
                          }}
                        />
                      </Button>
                    </Link>
                  ))}
                <ThemeSelect
                  buttonVariant='default'
                  noButtonShadow={true}
                  popoverClassName='z-[9999]'
                />
                {/* Pin button removed */}
              </div>
            </NavigationMenuItem>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </motion.header>
  );
};

// No ListItem export needed since nav items are removed
