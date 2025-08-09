import React from 'react';

// Mock for Next.js modules
export const draftMode = jest.fn(() => ({
  isEnabled: false
}));

// Mock Next Image component
interface MockImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  [key: string]: unknown;
}

export const Image = ({ src, alt, width, height, ...props }: MockImageProps) =>
  React.createElement('img', {
    src,
    alt,
    width,
    height,
    'data-testid': 'next-image',
    ...props
  });

export default {
  draftMode,
  Image
};
