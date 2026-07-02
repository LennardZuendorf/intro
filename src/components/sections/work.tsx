import { Section } from '@/components/ui/section';
import { M, S } from '@/components/ui/typography';
import { cn } from '@/lib/utils/ui';
import type { WorkItem } from '@/lib/work';

interface WorkSectionProps {
  items: WorkItem[];
}

const rowBase = cn(
  // Card-equivalent visual tokens (border, bg, radius, shadow)
  'w-full rounded-base border-2 border-border bg-card text-card-foreground',
  'shadow shadow-shadow',
  // Hover: accent fill + lift + shadow grow
  'transition-all duration-200',
  'hover:bg-primary hover:text-primary-foreground',
  'hover:-translate-x-px hover:-translate-y-px hover:shadow-lg hover:shadow-shadow',
  'group'
);

function RowInner({ item }: { item: WorkItem }) {
  return (
    <div className='flex items-center gap-3 px-4 py-3 md:px-5 md:py-4'>
      {/* Numeral */}
      <S
        as='span'
        className='font-mono text-muted-foreground group-hover:text-primary-foreground shrink-0 w-7 transition-colors duration-200'
      >
        {item.n}
      </S>

      {/* Title */}
      <M as='span' weight='semibold' className='flex-1 truncate'>
        {item.title}
      </M>

      {/* Kind · Year */}
      <S
        as='span'
        className='font-mono text-muted-foreground group-hover:text-primary-foreground shrink-0 text-right whitespace-nowrap transition-colors duration-200'
      >
        {item.kind}&nbsp;·&nbsp;{item.year}
      </S>
    </div>
  );
}

export function WorkSection({ items }: WorkSectionProps) {
  return (
    <Section
      id='work'
      as='section'
      fullHeight={false}
      centerContent={false}
      padding='px-6 py-12 md:py-16'
      containerClassName='gap-6'
      data-reveal
    >
      {/* Eyebrow */}
      <S as='p' className='font-mono tracking-widest uppercase text-muted-foreground'>
        {'// selected work'}
      </S>

      {/* Rows */}
      <div className='flex flex-col gap-2 w-full'>
        {items.map((item) =>
          item.href ? (
            <a
              key={item.n}
              href={item.href}
              target='_blank'
              rel='noopener noreferrer'
              className={rowBase}
            >
              <RowInner item={item} />
            </a>
          ) : (
            <div key={item.n} className={rowBase}>
              <RowInner item={item} />
            </div>
          )
        )}
      </div>
    </Section>
  );
}
