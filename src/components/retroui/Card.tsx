import type { HTMLAttributes } from 'react';
import { Text } from '@/components/retroui/Text';
import { M } from '@/components/ui/typography';
import { cn } from '@/lib/utils/ui';

interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Card = ({ className, ...props }: ICardProps) => {
  return (
    <div
      className={cn(
        'inline-block w-full rounded-base border-2 border-border bg-(--blank) text-popover-foreground p-1 shadow-md shadow-shadow font-base outline-hidden',
        className
      )}
      {...props}
    />
  );
};

const CardHeader = ({ className, ...props }: ICardProps) => {
  return <div className={cn('flex flex-col justify-start px-4 pt-4', className)} {...props} />;
};

const CardTitle = ({ className, ...props }: ICardProps) => {
  return <Text as='h3' className={cn('mb-0', className)} {...props} />;
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
