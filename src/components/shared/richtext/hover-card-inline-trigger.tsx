import { cloneElement, type ReactElement } from 'react';
import { HoverCardTrigger } from '@/components/ui/hover-card';
import { cn } from '@/lib/utils/ui';

export const hoverCardTriggerClassName =
  'underline! decoration-1 underline-offset-[3px] decoration-foreground/40 hover:decoration-foreground/70 transition-colors cursor-pointer';

interface HoverCardInlineTriggerProps {
  render: ReactElement<{ className?: string; style?: React.CSSProperties }>;
}

export function HoverCardInlineTrigger({ render }: HoverCardInlineTriggerProps) {
  return (
    <HoverCardTrigger
      render={cloneElement(render, {
        style: { display: 'inline', ...render.props.style },
        className: cn(hoverCardTriggerClassName, render.props.className)
      })}
    />
  );
}
