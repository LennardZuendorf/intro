import { Card } from '@/components/ui/retroui/Card';
import { Section } from '@/components/ui/section';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import { M, S } from '@/components/ui/typography';
import { cn } from '@/lib/utils/ui';
import type { WorkItem } from '@/lib/work';

interface WorkSectionProps {
  items: WorkItem[];
}

const rowHover = cn(
  'w-full p-0 transition-all duration-200',
  'hover:bg-primary hover:text-primary-foreground',
  'hover:-translate-x-px hover:-translate-y-px hover:shadow-lg hover:shadow-shadow',
  'group'
);

function RowInner({ item }: { item: WorkItem }) {
  return (
    <div className='flex items-center gap-3 px-4 py-3 md:px-5 md:py-4'>
      <S
        as='span'
        className='font-mono text-muted-foreground group-hover:text-primary-foreground shrink-0 w-7 transition-colors duration-200'
      >
        {item.n}
      </S>

      <M as='span' weight='semibold' className='flex-1 truncate'>
        {item.title}
      </M>

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
      <SectionEyebrow tone='s'>{'// selected work'}</SectionEyebrow>

      <div className='flex flex-col gap-2 w-full'>
        {items.map((item) =>
          item.href ? (
            <a
              key={item.n}
              href={item.href}
              target='_blank'
              rel='noopener noreferrer'
              className='block no-underline'
            >
              <Card className={rowHover}>
                <RowInner item={item} />
              </Card>
            </a>
          ) : (
            <Card key={item.n} className={rowHover}>
              <RowInner item={item} />
            </Card>
          )
        )}
      </div>
    </Section>
  );
}
