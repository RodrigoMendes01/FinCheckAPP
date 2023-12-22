import { NumericFormat } from 'react-number-format';
import { Error } from './Error';

interface InputCurrencyProps {
  error?: string
  onChange(value: string): void
  value?: string | number
}

export function InputCurrency ({ error, onChange, value }: InputCurrencyProps) {
  return (
    <div>
      <NumericFormat
        thousandSeparator=","
        decimalSeparator='.'
        className='w-full text-gray-800 text-[32px] font-bold tracking-[-1px] outline-none'
        value={value}
        onChange={event => onChange(event.target.value)}
      />

      {error && (
        <Error
          error={error}
        />
      )}
    </div>
  );
}
