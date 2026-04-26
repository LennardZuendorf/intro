import type { HTMLAttributes } from 'react';
import { Text } from '@/components/retroui/Text';
import { M } from '@/components/ui/typography';
import { cn } from '@/lib/utils/index';

interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Card = ({ className, ...props }: ICardProps) => {
  return (
    <div
      className={cn(
        'inline-block border-2 rounded shadow-md transition-all hover:shadow-none bg-card',
        className
      )}
      {...props}
    />
  );
};

const CardHeader = ({ className, ...props }: ICardProps) => {
  return <div className={cn('flex flex-col justify-start p-4', className)} {...props} />;
};

const CardTitle = ({ className, ...props }: ICardProps) => {
  return <Text as='h3' className={cn('mb-2', className)} {...props} />;
};

const CardDescription = ({ className, children, color: _color, ...props }: ICardProps) => (
  <M color='muted' className={className} {...props}>
    {children}
  </M>
);

const CardContent = ({ className, ...props }: ICardProps) => {
  return <div className={cn('p-4', className)} {...props} />;
};

const CardComponent = Object.assign(Card, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent
});

export { CardComponent as Card };
