import * as RadixPopover from '@radix-ui/react-popover';
import { cn } from '../../app/utils/cn';

interface PopoverProps {
  children: React.ReactNode
  className?: string
  onSelect?(): void
}

export function PopoverRoot ({ children } : PopoverProps) {
  return (
    <RadixPopover.Root>
      {children}
    </RadixPopover.Root>
  );
}

export function PopoverTrigger ({ children } : PopoverProps) {
  return (
    <RadixPopover.Trigger asChild>
      {children}
    </RadixPopover.Trigger>
  );
}

export function PopoverContent ({ children, className } : PopoverProps) {
  return (
    <RadixPopover.Portal>
      <RadixPopover.Content
        className={cn('rounded-2xl bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] z-50 p-4',
          'data-[side=bottom]:animate-slideUpAndFade',
          'data-[side=top]:animate-slideDownAndFade', className)}
      >
        {children}
      </RadixPopover.Content>
    </RadixPopover.Portal>
  );
}

export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent
};
