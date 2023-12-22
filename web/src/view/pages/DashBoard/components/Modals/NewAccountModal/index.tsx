import { Controller } from 'react-hook-form';
import { ColorsDropdown } from '../../../../../components/ColorsDropdown';
import { Input } from '../../../../../components/Input';
import { InputCurrency } from '../../../../../components/InputCurrency';
import { Modal } from '../../../../../components/Modal';
import { Select } from '../../../../../components/Select';
import { NewAccountController } from './useNewAccountController';
import { Button } from '../../../../../components/Button';

export function NewAccountModal () {
  const {
    closeNewAccountModal,
    isNewAccountModalOpen,
    errors,
    handleSubmit,
    register,
    control,
    isPending
  } = NewAccountController();

  return (
    <Modal
      title='Nova Conta'
      open={isNewAccountModalOpen}
      onClose={closeNewAccountModal}
    >
      <form onSubmit={handleSubmit}>

        <div>

          <span className='text-gray-600 tracking-[-0.5px] text-sm'>Saldo inicial</span>

          <div className='flex items-center gap-2'>
            <span className='text-gray-600 tracking-[-0.5px] text-lg'>R$</span>

            <Controller
              control={control}
              name='initialBalance'
              defaultValue='0'
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.initialBalance?.message}
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
            defaultValue=''
            placeholder='Nome da Conta'
            error={errors.name?.message}
            {...register('name')}
          />

          <Controller
            control={control}
            name='type'
            defaultValue='CHECKING'
            render={({ field: { onChange, value} }) => (
              <Select
                placeholder='Selecione um tipo'
                error={errors.type?.message}
                onChange={onChange}
                value={value}
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
            name='color'
            defaultValue=''
            render={({ field: { onChange } }) => (
              <ColorsDropdown
                error={errors.color?.message}
                onChange={onChange}
              />
            )}
          />

        </div>

        <Button type='submit' className='w-full mt-6' isLoading={isPending}>
          Criar
        </Button>

      </form>
    </Modal>
  );
}
