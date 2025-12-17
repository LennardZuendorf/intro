import type { VariantProps } from 'class-variance-authority';
import type { cardVariants } from '@/components/ui/card';

// Extract the variant types from the card component
type CardVariants = VariantProps<typeof cardVariants>;
type Rotation = NonNullable<CardVariants['rotation']>;

const ROTATIONS: Rotation[] = ['none', 'slight', 'slightNegative', 'medium', 'mediumNegative'];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Returns deterministic random card properties based on project ID.
 * Same ID will always return the same rotation value.
 */
export function getRandomCardProps(id: number | string) {
  const hash = typeof id === 'number' ? id : hashString(id.toString());

  return {
    rotation: ROTATIONS[hash % ROTATIONS.length]
  } as const;
}
