import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils/ui';

interface DockDividerProps {
  className?: string;
}

export function DockDivider({ className }: DockDividerProps) {
  return <Separator orientation='vertical' className={cn('self-stretch', className)} />;
}
