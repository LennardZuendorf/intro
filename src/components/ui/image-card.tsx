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
  hideCaption = false
}: Props) {
  return (
    <Card
      variant='reversed'
      rotation='none'
      interactive='none'
      className={cn(
        className,
        'overflow-hidden',
        heightClass || '',
        fullHeight ? 'flex flex-col' : ''
      )}
    >
      <div
        className={cn(
          !fullHeight ? aspectRatio : 'flex-grow',
          'overflow-hidden',
          hideCaption ? 'h-full' : ''
        )}
      >
        <img
          className={cn(`w-${width} h-full object-cover`, imageClassName)}
          src={imageUrl}
          alt={alt}
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
