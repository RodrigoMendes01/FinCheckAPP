import { Controller } from 'react-hook-form';
import { Button } from '../../../../components/Button';
import { DatePickerInput } from '../../../../components/DatePickerInput';
import { Input } from '../../../../components/Input';
import { InputCurrency } from '../../../../components/InputCurrency';
import { Modal } from '../../../../components/Modal';
import { Select } from '../../../../components/Select';
import { useNewTransactionController } from './useNewTransactionController';

export function NewTransactionModal () {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
    control,
    errors,
    handleSubmit,
    register
  } = useNewTransactionController();

  const isIncome = newTransactionType === 'INCOME';

  return (
    <Modal
      title={isIncome ? 'Nova Receita' : 'Nova Despesa'}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
    >
      <form onSubmit={handleSubmit}>

        <div>

          <span
            className='text-gray-600 tracking-[-0.5px] text-sm'
          >
            Valor {isIncome ? 'da receita' : 'da despesa'}
          </span>

          <div className='flex items-center gap-2'>
            <span className='text-gray-600 tracking-[-0.5px] text-lg'>R$</span>
            <Controller
              control={control}
              name='value'
              defaultValue='0'
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.value?.message}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>

        </div>

        <div className='mt-10 flex flex-col gap-4'>
          <Input
            type='text'
            placeholder={isIncome ? 'Nome da receita' : 'Nome da despesa'}
            {...register('name')}
            error={errors.name?.message}
          />

          <Controller
            control={control}
            name='categoryId'
            render={({ field: { onChange, value }}) => (
              <Select
                placeholder='Categoria'
                onChange={onChange}
                value={value}
                error={errors.categoryId?.message}
                options={[
                  {
                    value: 'INVESTMENT',
                    label: 'Investimento'
                  },
                  {
                    value: 'CHECKING',
                    label: 'Conta Corrente'
                  },
                  {
                    value: 'CASH',
                    label: 'Dinheiro Físico'
                  },
                ]}
              />
            )}
          />

          <Controller
            control={control}
            name='bankAccountId'
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder={isIncome ? 'Receber com' : 'Pagar com'}
                onChange={onChange}
                value={value}
                error={errors.bankAccountId?.message}
                options={[
                  {
                    value: 'INVESTMENT',
                    label: 'Investimento'
                  },
                  {
                    value: 'CHECKING',
                    label: 'Conta Corrente'
                  },
                  {
                    value: 'CASH',
                    label: 'Dinheiro Físico'
                  },
                ]}
              />
            )}
          />

          <DatePickerInput/>


        </div>
        <Button type='submit' className='w-full mt-6'>
            Criar
        </Button>
      </form>
    </Modal>
  );
}
