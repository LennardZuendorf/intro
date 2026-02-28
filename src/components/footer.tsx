import Link from 'next/link';
import { SocialButtons } from '@/components/shared/social-buttons';
import { ThemeSelect } from '@/components/theme/theme-select';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { S } from '@/components/ui/typography';
import { cn } from '@/lib/utils/ui';

interface FooterProps {
  className?: string;
}

export const Footer = async ({ className = '' }: FooterProps) => {
  return (
    <Section
      as='footer'
      fullHeight={false}
      fullWidth={true}
      className={cn('border-t-4 border-black', className)}
      padding='pt-6 pb-6 px-6 md:pt-4 md:pb-4'
      centerContent={false}
    >
      <div className='w-full flex flex-row items-center justify-between z-[10]'>
        <SocialButtons buttonVariant='default' />
        <div className='flex items-end gap-x-4'>
          <ThemeSelect buttonVariant='default' />
        </div>
      </div>
      <div className='w-full flex justify-center mt-4 md:mt-2'>
        <div className='flex items-center gap-x-2 font-mono'>
          <S>Built by Lennard Zündorf</S>
          <S>{`© ${new Intl.DateTimeFormat('en', { year: 'numeric' }).format(new Date())}`}</S>
          <S>|</S>
          <Button variant='link' className='justify-center items-center' size='icon' asChild>
            <Link href='/legal'>legal</Link>
          </Button>
        </div>
      </div>
    </Section>
  );
};
