import Image from 'next/image';
import type React from 'react';
import { cn } from '@/lib/utils/ui';
import type { Media } from '@/payload-types';

type Props = {
  media?: Media;
  caption?: {
    [k: string]: unknown;
  }[];
  captionClassName?: string;
  className?: string;
  enableGutter?: boolean;
  imgClassName?: string;
  disableInnerContainer?: boolean;
};

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    media,
    caption,
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    disableInnerContainer
  } = props;

  if (!media) return null;

  return (
    <div
      className={cn(
        '',
        {
          container: enableGutter
        },
        className
      )}
    >
      {media.url && (
        <Image
          src={media.url}
          alt={media.alt || ''}
          width={media.width || 1000}
          height={media.height || 1000}
          className={cn('border border-border rounded-[0.8rem]', imgClassName)}
        />
      )}
      {caption && (
        <div
          className={cn(
            'mt-6',
            {
              container: !disableInnerContainer
            },
            captionClassName
          )}
        />
      )}
    </div>
  );
};
