import type { HTMLAttributes, ReactNode } from 'react';
import { H1, M } from '@/components/ui/typography';
import { cn } from '@/lib/utils/ui';

interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Card = ({ className, ...props }: ICardProps) => {
  return (
    <div
      className={cn(
        'inline-block w-full rounded-base border-2 border-border bg-card text-card-foreground p-1 shadow-md shadow-shadow font-base outline-hidden',
        className
      )}
      {...props}
    />
  );
};

const CardHeader = ({ className, ...props }: ICardProps) => {
  return <div className={cn('flex flex-col justify-start px-4 pt-4', className)} {...props} />;
};

const CardTitle = ({ className, children }: ICardProps & { children: ReactNode }) => {
  return (
    <H1 as='h3' format={false} className={cn('mb-0 mt-0', className)}>
      {children}
    </H1>
  );
};

const CardDescription = ({ className, children, color: _color, ...props }: ICardProps) => (
  <M color='muted' className={className} {...props}>
    {children}
  </M>
);

const CardContent = ({ className, ...props }: ICardProps) => {
  return (
    <div
      className={cn('flex flex-col gap-8 px-4 pb-4 pt-3 md:gap-10 [&>*]:mt-0', className)}
      {...props}
    />
  );
};

const CardComponent = Object.assign(Card, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent
});

export { CardComponent as Card };
