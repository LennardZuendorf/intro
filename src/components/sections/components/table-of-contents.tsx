'use client';

import { S } from '@/components/ui/typography';
import { cn } from '@/lib/utils/ui';

interface RichTextTocNode {
  title?: string;
  id?: string;
  slug?: string;
  children?: RichTextTocNode[];
}

interface TableOfContentsProps {
  toc: RichTextTocNode[];
  className?: string;
  prefix?: string;
}

export const TableOfContents = ({ toc, className, prefix = '' }: TableOfContentsProps) => {
  if (!toc || toc.length === 0) {
    return null;
  }

  const renderTocItem = (node: RichTextTocNode, index: number, depth: number = 0) => {
    const id = node.id || node.slug || `toc-${prefix}-${index}`;
    const href = `#${id}`;
    const indentClass = depth > 0 ? `ml-${depth * 4}` : '';

    return (
      <li key={`${id}-${index}-${depth}`} className={cn('font-mono', indentClass)}>
        <a
          href={href}
          className='text-accent underline underline-offset-4 hover:no-underline transition-all duration-200'
          onClick={(e) => {
            e.preventDefault();
            // Try to find element by ID
            let element = document.getElementById(id);

            // If not found, try slug
            if (!element && node.slug) {
              element = document.getElementById(node.slug);
            }

            if (element) {
              // Add offset for fixed headers if needed
              const offset = 80;
              const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
              const offsetPosition = elementPosition - offset;

              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });

              // Update URL without triggering scroll
              window.history.pushState(null, '', href);
            }
          }}
        >
          <S>{node.title ?? 'Section'}</S>
        </a>
        {node.children && node.children.length > 0 && (
          <ul className='list-disc list-inside space-y-1 mt-1 ml-4'>
            {node.children.map((child, childIndex) => renderTocItem(child, childIndex, depth + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <ul className={cn('list-disc list-inside space-y-1', className)}>
      {toc.map((node, index) => renderTocItem(node, index))}
    </ul>
  );
};
