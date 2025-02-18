import { MediaBlock } from '@/components/blocks/media-block/Component';
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode
} from '@payloadcms/richtext-lexical';
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as RichTextWithoutBlocks
} from '@payloadcms/richtext-lexical/react';

import type {
  BannerBlock as BannerBlockProps,
  MediaBlock as MediaBlockProps
} from '@/payload-types';
import { BannerBlock } from '@/components/blocks/banner/Component';
import { cn } from '@/lib/utils/ui';

type NodeTypes = DefaultNodeTypes | SerializedBlockNode<MediaBlockProps | BannerBlockProps>;

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!;
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object');
  }
  const slug = value.slug;
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`;
};

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    banner: ({ node }) => <BannerBlock className='col-start-2 mb-4' {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className='col-start-1 col-span-3'
        imgClassName='m-0'
        media={typeof node.fields.media === 'object' ? node.fields.media : undefined}
        captionClassName='mx-auto max-w-[48rem]'
        enableGutter={false}
        disableInnerContainer={true}
      />
    )
  }
});

type Props = {
  data: SerializedEditorState;
  enableGutter?: boolean;
  enableProse?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props;
  return (
    <RichTextWithoutBlocks
      converters={jsxConverters}
      className={cn(
        'pt-10',
        {
          'container ': enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert': enableProse
        },
        className
      )}
      {...rest}
    />
  );
}
