'use client';

import { useToast } from '@/hooks/use-toast';

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from '@/components/ui/toast';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        // Alternate between rotate-1 and -rotate-1 based on whether ID is even or odd
        const isEven = parseInt(id) % 2 === 0;
        const rotationClass = isEven ? 'rotate-1' : '-rotate-1';

        // Pick border color based on variant
        const borderColor = props.variant === 'destructive' ? 'border-red-500' : 'border-black';

        // Format color names in titles with HTML
        let formattedTitle = title;
        if (typeof title === 'string') {
          const colorNames = ['Amber', 'Emerald', 'Rose', 'Indigo'];
          const colorHexMap: Record<string, string> = {
            Amber: '#d97706', // amber-600
            Emerald: '#059669', // emerald-600
            Rose: '#e11d48', // rose-600
            Indigo: '#4f46e5' // indigo-600
          };

          for (const colorName of colorNames) {
            if (title.includes(colorName)) {
              const colorHex = colorHexMap[colorName] || '';
              formattedTitle = title.replace(
                colorName,
                `<span style="color: ${colorHex}">${colorName}</span>`
              );
              break;
            }
          }
        }

        return (
          <Toast
            key={id}
            {...props}
            className={`${rotationClass} ${borderColor} hover:-translate-y-1 transition-transform duration-200`}
          >
            <div className='grid gap-1'>
              {title && (
                <ToastTitle
                  className='font-bold text-base'
                  dangerouslySetInnerHTML={{ __html: formattedTitle as string }}
                />
              )}
              {description && (
                <ToastDescription className='font-mono text-sm'>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
