import type { UnionCalloutComponentComponent } from 'basehub-types';
import type { ReactNode } from 'react';
import {
  RichTextBlock as RichText,
  type RichTextBlockUnion
} from '@/components/shared/richtext-block';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { NeoBadge } from '@/components/ui/neoBadge';
import { H1, M } from '@/components/ui/typography';

interface HeroCardProps {
  heroText?: {
    json?: {
      content?: ReactNode;
      blocks?: (UnionCalloutComponentComponent | RichTextBlockUnion)[];
    } | null;
  } | null;
  secondaryText?: {
    json?: {
      content?: ReactNode;
      blocks?: (UnionCalloutComponentComponent | RichTextBlockUnion)[];
    } | null;
  } | null;
  className?: string;
}

export function HeroCard({ heroText, secondaryText, className }: HeroCardProps) {
  return (
    <Card id='hero-card' className={className}>
      <CardHeader>
        <H1>I'm Lennard</H1>
      </CardHeader>
      <CardContent className='space-y-3'>
        {heroText?.json?.content ? (
          <div className='font-mono leading-relaxed inline [&_article>*]:inline!'>
            <RichText blocks={heroText.json.blocks} className='inline!'>
              {heroText.json.content}
            </RichText>
            {secondaryText?.json?.content && (
              <RichText blocks={secondaryText.json.blocks} className='pt-1'>
                {secondaryText.json.content}
              </RichText>
            )}
          </div>
        ) : (
          <M className='font-mono leading-relaxed'>
            Full-stack product leader crafting digital experiences.
          </M>
        )}

        <div className='flex flex-wrap items-center gap-2'>
          <NeoBadge variant='light' size='sm' interactive='lift'>
            Building products
          </NeoBadge>
          <NeoBadge variant='default' size='sm' interactive='lift'>
            Strategic vision
          </NeoBadge>
          <NeoBadge variant='dark' size='sm' interactive='lift'>
            Technical excellence
          </NeoBadge>
        </div>
      </CardContent>
    </Card>
  );
}
