import * as RedixSelect from '@radix-ui/react-select';
import { cn } from '../../app/utils/cn';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { Error } from './Error';

interface SelectProps {
  className?: string;
  error?: string
  placeholder?: string
  options: {
    value: string
    label: string
  }[]
  onChange(value: string): void
  value?: string
}

export function Select ({
  className,
  error,
  placeholder,
  options,
  onChange,
  value
}: SelectProps) {
  const [selectedValue, setSelectedValue] = useState(value);

  function handleSelect(value: string) {
    setSelectedValue(value);
    onChange(value);
  }

  return (
    <div>
      <div className='relative'>
        <label
          className={cn('absolute z-10 top-1/2 -translate-y-1/2 left-3 text-gray-700 pointer-events-none', selectedValue && 'text-xs left-[13px] top-2 translate-y-0 transition-all')}
        >
          {placeholder}
        </label>

        <RedixSelect.Root value={value} onValueChange={handleSelect}>
          <RedixSelect.Trigger
            className={cn('bg-white rounded-lg w-full border border-gray-500 px-3 h-[52px] text-gray-800 focus:border-gray-800 transition-all outline-none text-left relative pt-4', error && '!border-red-900', className
            )}
          >
            <RedixSelect.Value/>

            <RedixSelect.Icon className='absolute right-3 bottom-3'>
              <ChevronDownIcon className='w-6 h-6 text-gray-800'/>
            </RedixSelect.Icon>

          </RedixSelect.Trigger>

          <RedixSelect.Portal>

            <RedixSelect.Content
              className='z-[99] overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]'
            >
              <RedixSelect.ScrollUpButton
                className='flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default'
              />

              <RedixSelect.Viewport className='p-2'>

                {options.map(option => (
                  <RedixSelect.Item
                    key={option.value}
                    value={option.value}
                    className='p-2 text-gray-800 text-sm data-[state=checked]:font-bold outline-none data-[highlighted]:bg-gray-50 rounded-lg transition-colors'
                  >
                    <RedixSelect.ItemText>{option.label}</RedixSelect.ItemText>
                  </RedixSelect.Item>
                ))}

              </RedixSelect.Viewport>

              <RedixSelect.ScrollDownButton
                className='flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default'
              />
            </RedixSelect.Content>

          </RedixSelect.Portal>
        </RedixSelect.Root>
      </div>

      {error && (
        <Error
          error={error}
        />
      )}
    </div>
  );
}

