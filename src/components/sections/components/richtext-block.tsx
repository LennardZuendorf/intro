import { RichText } from 'basehub/react-rich-text';
import Image from 'next/image';
import type { ReactNode } from 'react';

interface RichTextBlockProps {
  children: ReactNode;
}

export const RichTextBlock = ({ children }: RichTextBlockProps) => {
  return (
    <RichText
      components={{
        img: (props: any) => (
          <Image
            src={props.src || ''}
            alt={props.alt || ''}
            width={800}
            height={400}
            className='rounded-lg border-2 border-black dark:border-white'
          />
        )
      }}
    >
      {children}
    </RichText>
  );
};
