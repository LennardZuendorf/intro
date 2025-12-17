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
            'group toast group-[.toaster]:bg-pr group-[.toaster]:text-foreground group-[.toaster]:border-2 group-[.toaster]:border-black group-[.toaster]:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-[.toaster]:rounded-md group-[.toaster]:rotate-1 group-[.toaster]:font-bold',
          title: 'group-[.toast]:font-bold group-[.toast]:text-base',
          description:
            'group-[.toast]:text-foreground/80 group-[.toast]:font-mono group-[.toast]:text-sm',
          actionButton:
            'group-[.toast]:bg-accent group-[.toast]:text-accent-foreground group-[.toast]:border-2 group-[.toast]:border-black group-[.toast]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-[.toast]:rounded-md group-[.toast]:px-3 group-[.toast]:py-1 group-[.toast]:text-sm group-[.toast]:font-bold group-[.toast]:hover:translate-y-[-2px] group-[.toast]:hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-[.toast]:transition-all',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:border-2 group-[.toast]:border-black group-[.toast]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-[.toast]:rounded-md group-[.toast]:px-3 group-[.toast]:py-1 group-[.toast]:text-sm group-[.toast]:font-bold group-[.toast]:hover:translate-y-[-2px] group-[.toast]:hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-[.toast]:transition-all',
          closeButton:
            'group-[.toast]:bg-foreground/5 group-[.toast]:border group-[.toast]:border-black group-[.toast]:rounded-md group-[.toast]:hover:bg-foreground/10'
        },
        duration: 4000,
        closeButton: true
      }}
      {...props}
    />
  );
};

export { Toaster };
