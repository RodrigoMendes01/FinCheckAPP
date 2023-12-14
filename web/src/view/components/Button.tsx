import { ComponentProps } from 'react';
import { cn } from '../../app/utils/cn';
import { Spinner } from './Spinner';

interface ButtonProps extends ComponentProps<'button'> {
  children: string
  isLoading?: boolean
}

export function Button ({children, className, disabled, isLoading, ...props}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={cn('bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 px-6 h-12 rounded-2xl font-medium text-white disabled:text-gray-400 disabled:cursor-not-allowed transition-all flex items-center justify-center', className)}
    >
      {isLoading ? <Spinner className='w-6 h-6'/> : children}
    </button>
  );
}
