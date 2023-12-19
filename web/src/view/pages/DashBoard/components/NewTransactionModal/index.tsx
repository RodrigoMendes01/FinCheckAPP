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
    newTransactionType
  } = useNewTransactionController();

  const isIncome = newTransactionType === 'INCOME';

  return (
    <Modal
      title={isIncome ? 'Nova Receita' : 'Nova Despesa'}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
    >
      <form>

        <div>

          <span
            className='text-gray-600 tracking-[-0.5px] text-sm'
          >
            Valor {isIncome ? 'da receita' : 'da despesa'}
          </span>

          <div className='flex items-center gap-2'>
            <span className='text-gray-600 tracking-[-0.5px] text-lg'>R$</span>
            <InputCurrency/>
          </div>

        </div>

        <div className='mt-10 flex flex-col gap-4'>
          <Input
            type='text'
            name='name'
            placeholder={isIncome ? 'Nome da receita' : 'Nome da despesa'}
          />

          <Select
            placeholder='Categoria'
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

          <Select
            placeholder={isIncome ? 'Receber com' : 'Pagar com'}
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

          <DatePickerInput/>

          <Button>
            Criar
          </Button>

        </div>

      </form>
    </Modal>
  );
}
