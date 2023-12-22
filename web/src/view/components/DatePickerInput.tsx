import { cn } from '../../app/utils/cn';
import { useState } from 'react';
import { formatDate } from '../../app/utils/formatDate';
import { Popover } from './Popover';
import { DatePicker } from './DatePicker';
import { Error } from './Error';

interface DatePickerInputProps {
  error?: string
  className?: string
  value?: Date
  onChange?(date: Date): void
}

export function DatePickerInput ({ error, className, value, onChange}: DatePickerInputProps) {
  const [selectedDate, setSelectedDate ] = useState(value ?? new Date());

  function handleChangedDate (date: Date) {
    setSelectedDate(date);
    onChange?.(date);
  }

  return (
    <div>
      <Popover.Root>
        <Popover.Trigger>
          <button
            type='button'
            className={cn('bg-white rounded-lg w-full border border-gray-500 px-3 h-[52px] text-gray-700 focus:border-gray-800 transition-all outline-none text-left relative pt-4', error && '!border-red-900 z-50', className
            )}
          >
            <span className='absolute text-xs left-[13px] top-2 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all'>Data</span>

            <span>{formatDate(selectedDate)}</span>

          </button>
        </Popover.Trigger>

        <Popover.Content>
          <DatePicker value={selectedDate} onChange={handleChangedDate}/>
        </Popover.Content>
      </Popover.Root>

      {error && (
        <Error
          error={error}
        />
      )}
    </div>
  );
}
