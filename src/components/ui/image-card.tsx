import Image from 'next/image';
import type { CardProps } from '@/components/ui/card';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils/ui';

type Props = {
  imageUrl: string;
  caption?: string;
  alt?: string;
  className?: string;
  width?: string;
  aspectRatio?: string;
  heightClass?: string;
  imageClassName?: string;
  fullHeight?: boolean;
  hideCaption?: boolean;
  rotation?: CardProps['rotation'];
  interactive?: CardProps['interactive'];
  variant?: CardProps['variant'];
};

export default function ImageCard({
  imageUrl,
  caption = '',
  alt = 'image',
  className = 'w-[250px]',
  width = 'full',
  aspectRatio = 'aspect-[4/3]',
  heightClass,
  imageClassName = '',
  fullHeight = false,
  hideCaption = false,
  rotation = 'slight',
  interactive = 'slight',
  variant = 'reversed'
}: Props) {
  return (
    <Card
      variant={variant}
      rotation={rotation}
      interactive={interactive}
      className={cn(
        className,
        'overflow-hidden justify-center items-center',
        heightClass || '',
        fullHeight ? 'flex flex-col' : ''
      )}
    >
      <div
        className={cn(
          !fullHeight ? aspectRatio : 'flex-grow',
          'overflow-hidden relative',
          hideCaption ? 'h-full' : ''
        )}
      >
        <Image
          className={cn(`w-${width} h-full object-cover`, imageClassName)}
          src={imageUrl}
          alt={alt}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </div>
      {!hideCaption && caption && (
        <figcaption className='border-t-2 border-border p-4 text-center font-medium'>
          {caption}
        </figcaption>
      )}
    </Card>
  );
}
