'use client';

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      position='bottom-right'
      icons={{
        success: <CircleCheckIcon className='size-4' />,
        info: <InfoIcon className='size-4' />,
        warning: <TriangleAlertIcon className='size-4' />,
        error: <OctagonXIcon className='size-4' />,
        loading: <Loader2Icon className='size-4 animate-spin' />
      }}
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-2 group-[.toaster]:border-border group-[.toaster]:shadow-md group-[.toaster]:shadow-shadow group-[.toaster]:rounded-md group-[.toaster]:rotate-1 group-[.toaster]:font-bold',
          title: 'group-[.toast]:font-bold group-[.toast]:text-base',
          description:
            'group-[.toast]:text-foreground/80 group-[.toast]:font-mono group-[.toast]:text-sm',
          actionButton:
            'group-[.toast]:bg-accent group-[.toast]:text-accent-foreground group-[.toast]:border-2 group-[.toast]:border-border group-[.toast]:shadow-md group-[.toast]:shadow-shadow group-[.toast]:rounded-md group-[.toast]:px-3 group-[.toast]:py-1 group-[.toast]:text-sm group-[.toast]:font-bold hover:group-[.toast]:translate-y-[-2px] hover:group-[.toast]:shadow-lg hover:group-[.toast]:shadow-shadow group-[.toast]:transition-all',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:border-2 group-[.toast]:border-border group-[.toast]:shadow-md group-[.toast]:shadow-shadow group-[.toast]:rounded-md group-[.toast]:px-3 group-[.toast]:py-1 group-[.toast]:text-sm group-[.toast]:font-bold hover:group-[.toast]:translate-y-[-2px] hover:group-[.toast]:shadow-lg hover:group-[.toast]:shadow-shadow group-[.toast]:transition-all',
          closeButton:
            'group-[.toast]:bg-foreground/5 group-[.toast]:border group-[.toast]:border-border group-[.toast]:rounded-md group-[.toast]:hover:bg-foreground/10'
        },
        duration: 4000,
        closeButton: true
      }}
      {...props}
    />
  );
};

export { Toaster };
