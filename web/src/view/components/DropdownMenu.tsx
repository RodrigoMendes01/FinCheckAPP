import * as RedixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { cn } from '../../app/utils/cn';

interface DropdownMenuProps {
  children: React.ReactNode
  className?: string
  onSelect?(): void
}

export function DropdownMenuRoot ({ children } : DropdownMenuProps) {
  return (
    <RedixDropdownMenu.Root>
      {children}
    </RedixDropdownMenu.Root>
  );
}

export function DropdownMenuTrigger ({ children, className } : DropdownMenuProps) {
  return (
    <RedixDropdownMenu.Trigger asChild className={cn('outline-none', className)}>
      {children}
    </RedixDropdownMenu.Trigger>
  );
}

export function DropdownMenuContent ({ children, className } : DropdownMenuProps) {
  return (
    <RedixDropdownMenu.Portal>
      <RedixDropdownMenu.Content
        className={cn('rounded-2xl p-1 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] z-50',
          'data-[side=bottom]:animate-slideUpAndFade',
          'data-[side=top]:animate-slideDownAndFade', className)}
      >
        {children}
      </RedixDropdownMenu.Content>
    </RedixDropdownMenu.Portal>
  );
}

export function DropdownMenuItem ({ children, className, onSelect } : DropdownMenuProps) {
  return (
    <RedixDropdownMenu.Item
      onSelect={onSelect}
      className={cn('min-h-[40px] outline-none flex items-center px-4 py-2 text-sm text-gray-800 data-[highlighted]:bg-gray-50 rounded-2xl transition-colors cursor-pointer', className)}
    >
      {children}
    </RedixDropdownMenu.Item>
  );
}

export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
};
