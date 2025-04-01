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
    <figure
      className={`${className} overflow-hidden shadow-md rounded-md border-4 border-black bg-bg font-base  ${heightClass || ''} ${fullHeight ? 'flex flex-col' : ''}`}
    >
      <div
        className={`${!fullHeight ? aspectRatio : 'flex-grow'} overflow-hidden ${hideCaption ? 'h-full' : ''}`}
      >
        <img
          className={`w-${width} h-full object-cover ${imageClassName}`}
          src={imageUrl}
          alt={alt}
        />
      </div>
      {!hideCaption && caption && (
        <figcaption className='border-border p-4 text-center font-medium'>{caption}</figcaption>
      )}
    </figure>
  );
}
