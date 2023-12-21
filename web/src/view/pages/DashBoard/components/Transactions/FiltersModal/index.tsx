import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { Modal } from '../../../../../components/Modal';
import { Button } from '../../../../../components/Button';
import { useFiltersModal } from './useFiltersModalController';
import { cn } from '../../../../../../app/utils/cn';

interface FiltersModalProps {
  open: boolean
  onClose(): void
  onChange(filters: { bankAccountId: string | undefined, year: number }): void
}

export function FiltersModal ({ open, onClose, onChange }: FiltersModalProps) {
  const {
    handleSelectBankAccount,
    selectedBankAccount,
    selectedYear,
    handleChangeYear,
    accounts
  } = useFiltersModal();

  return (
    <Modal
      open={open}
      title='Filtros'
      onClose={onClose}
    >
      <div>
        <span
          className='text-lg tracking-[-1px] font-bold text-gray-800'
        >
        Conta
        </span>

        <div className='space-y-2 mt-2'>

          {
            accounts.map((account) => (
              <button
                key={account.id}
                onClick={() => handleSelectBankAccount(account.id)}
                className={cn('p-2 rounded-2xl w-full text-left text-gray-800 hover:bg-gray-50 transition-colors', account.id === selectedBankAccount && '!bg-gray-200')}
              >
                {account.name}
              </button>
            ))
          }

        </div>
      </div>

      <div className='mt-10'>
        <span
          className='text-lg tracking-[-1px] font-bold text-gray-800'
        >
        Ano
        </span>

        <div className='mt-2 w-52 flex items-center justify-between'>
          <button
            className='w-12 h-12 flex items-center justify-center text-gray-800'
            onClick={() => handleChangeYear(-1)}
          >
            <ChevronLeftIcon className='w-6 h-6'/>
          </button>

          <div className='flex-1 text-center'>
            <span className='text-sm tracking-[-0.5px] font-medium'>{selectedYear}</span>
          </div>

          <button
            className='w-12 h-12 flex items-center justify-center text-gray-800'
            onClick={() => handleChangeYear(1)}
          >
            <ChevronRightIcon className='w-6 h-6'/>
          </button>
        </div>

      </div>

      <Button
        className='w-full mt-10'
        onClick={() => onChange({
          bankAccountId: selectedBankAccount,
          year: selectedYear
        })}
      >
        Aplicar Filtros
      </Button>
    </Modal>
  );
}
