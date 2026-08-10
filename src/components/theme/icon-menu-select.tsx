'use client';

import type { VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button, type buttonVariants } from '@/components/ui/retroui/Button';
import { cn } from '@/lib/utils/ui';

export interface IconMenuSelectOption {
  value: string;
  label: string;
  icon?: ReactNode;
  leading?: ReactNode;
}

interface IconMenuSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: IconMenuSelectOption[];
  triggerIcon: ReactNode;
  ariaLabel: string;
  buttonVariant?: VariantProps<typeof buttonVariants>['variant'];
  className?: string;
  popoverClassName?: string;
}

export function IconMenuSelect({
  value,
  onValueChange,
  options,
  triggerIcon,
  ariaLabel,
  buttonVariant = 'default',
  className,
  popoverClassName
}: IconMenuSelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        render={
          <Button variant={buttonVariant} aria-label={ariaLabel} size='icon' className={className}>
            {triggerIcon}
          </Button>
        }
      />
      <DropdownMenuContent
        align='center'
        sideOffset={8}
        className={cn('z-[9999] bg-background', popoverClassName)}
      >
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(next) => {
            onValueChange(next);
            setOpen(false);
          }}
        >
          {options.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value} className='gap-2'>
              {option.leading ?? option.icon}
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
