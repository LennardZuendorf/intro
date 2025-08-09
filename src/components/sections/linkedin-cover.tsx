import { BackgroundGrid } from '@/components/ui/background-grid';
import { Card, CardContent } from '@/components/ui/card';
import { NeoBadge } from '@/components/ui/neoBadge';
import { H1, H3, L } from '@/components/ui/typography';

interface LinkedinCoverProps {
  name?: string;
  title?: string;
}

export function LinkedinCover({
  name = 'Lennard Zündorf',
  title = 'Product Manager & Product Owner'
}: LinkedinCoverProps) {
  return (
    <Card
      id='linkedin-cover'
      className='relative w-[1584px] h-[396px] overflow-hidden'
      rotation='none'
      interactive='none'
      disableScale
    >
      <BackgroundGrid className='absolute inset-0 w-full h-full' maskType='none' gridSize={80}>
        <CardContent className='relative z-[2] w-full h-full flex items-center justify-end p-8 md:p-10'>
          <div className='flex flex-col items-end text-right gap-3 md:gap-4'>
            <H1 className='m-0'>{name}</H1>
            <NeoBadge variant='dark' rotation='negative' size='md' className='font-mono'>
              <H3 className='m-0'>{title}</H3>
            </NeoBadge>
            <div className='flex flex-wrap justify-end gap-2 md:gap-3'>
              <NeoBadge
                variant='light'
                rotation='slight'
                className='font-mono'
                interactive='grow'
                size='md'
              >
                Building digital products
              </NeoBadge>
              <L className='font-mono'>that combine</L>
              <NeoBadge
                variant='default'
                rotation='negative'
                className='font-mono'
                interactive='wiggle'
                size='md'
              >
                strategic vision
              </NeoBadge>
              <L className='font-mono'>and</L>
              <NeoBadge
                variant='default'
                rotation='negative'
                className='font-mono'
                interactive='wiggle'
                size='md'
              >
                customer needs
              </NeoBadge>
              <L className='font-mono'>with</L>
              <NeoBadge
                variant='dark'
                rotation='negative'
                className='font-mono'
                interactive='bounce'
                size='md'
              >
                technical excellence.
              </NeoBadge>
            </div>
          </div>
        </CardContent>
      </BackgroundGrid>
    </Card>
  );
}

export default LinkedinCover;
