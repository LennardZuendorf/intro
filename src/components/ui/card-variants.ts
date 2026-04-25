import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Project-local CVA helper preserving the legacy neobrutalist Card visual contract.
 *
 * RetroUI's `Card` is a compound API (`Card.Header`, `Card.Content`, `Card.Title`,
 * `Card.Description`) without per-instance variant props. Consumers that need the
 * project's bespoke variant/shadow/borderStyle/rotation/interactive/spacing
 * combinations should call `cardVariants({...})` and merge the resulting className
 * into the RetroUI Card.
 */
export const cardVariants = cva(
  'rounded-md border-4 border-border text-primary-foreground shadow-black shadow-md transition-[transform,box-shadow] duration-200',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        reversed: 'bg-primary',
        outline: 'bg-transparent ',
        accent: 'bg-accent text-accent-foreground ',
        // Completely remove border and shadow, background is transparent, no outline at all
        invisible: 'bg-transparent! border-none! shadow-none!'
      },
      shadow: {
        none: 'shadow-none',
        sm: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg',
        xl: 'shadow-xl'
      },
      borderStyle: {
        default: 'border-4 border-border',
        accent: 'border-4 border-accent',
        none: 'border-0'
      },
      rotation: {
        none: '',
        slight: 'rotate-negative',
        slightNegative: 'rotate-1',
        medium: 'rotate-negative-medium',
        mediumNegative: 'rotate-2'
      },
      interactive: {
        none: '',
        slight: 'hover:-translate-y-0.5',
        medium: 'hover:-translate-y-1'
      }
    },
    defaultVariants: {
      variant: 'default',
      shadow: 'lg',
      borderStyle: 'default',
      rotation: 'none',
      interactive: 'none'
    }
  }
);

export const cardHeaderVariants = cva('flex flex-col space-y-1.5', {
  variants: {
    spacing: {
      compact: 'p-3 pt-6',
      default: 'p-3 pt-6 md:p-4 md:pt-6'
    }
  },
  defaultVariants: { spacing: 'default' }
});

export const cardContentVariants = cva('', {
  variants: {
    spacing: {
      compact: 'p-3',
      default: 'p-3 md:p-4'
    }
  },
  defaultVariants: { spacing: 'default' }
});

export const cardFooterVariants = cva('flex items-center', {
  variants: {
    spacing: {
      compact: 'p-2 pt-0',
      default: 'p-2 pt-0 md:p-3 md:pt-0'
    }
  },
  defaultVariants: { spacing: 'default' }
});

export type CardVariantProps = VariantProps<typeof cardVariants>;
export type CardHeaderVariantProps = VariantProps<typeof cardHeaderVariants>;
export type CardContentVariantProps = VariantProps<typeof cardContentVariants>;
export type CardFooterVariantProps = VariantProps<typeof cardFooterVariants>;
