import { ComponentProps } from 'react';

interface ButtonProps extends ComponentProps<'button'> {
  children: string
}

export function Button ({children, ...props}: ButtonProps) {
  return (
    <button
      {...props}
      className='bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 px-6 h-12 rounded-2xl font-medium text-white disabled:text-gray-400 disabled:cursor-not-allowed transition-all '
    >
      {children}
    </button>
  );
}
