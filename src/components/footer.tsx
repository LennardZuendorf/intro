import { ThemeSelect } from '@/components/theme/theme-select';
import { Section } from '@/components/ui/section';
import { Link, S } from '@/components/ui/typography';
import { cn } from '@/lib/utils/ui';

interface FooterProps {
  className?: string;
}

export const Footer = ({ className = '' }: FooterProps) => {
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(new Date());
  return (
    <Section
      as='footer'
      fullHeight={false}
      fullWidth={true}
      className={cn('border-t border-border', className)}
      padding='py-4 px-6'
      centerContent={false}
    >
      <div className='w-full flex flex-row items-center justify-between'>
        <div className='flex items-center gap-x-4 font-mono text-muted-foreground'>
          <S className='font-mono tracking-widest uppercase text-xs'>
            {`© ${year} LENNARD ZÜNDORF`}
          </S>
          <S className='font-mono text-xs hidden sm:block'>— designed &amp; built in stockholm</S>
        </div>
        <div className='flex items-center gap-x-4 font-mono text-muted-foreground text-xs'>
          <Link
            href='/legal'
            className='font-mono tracking-wide uppercase text-xs hover:text-foreground transition-colors'
          >
            legal
          </Link>
          <ThemeSelect buttonVariant='ghost' />
        </div>
      </div>
    </Section>
  );
};
