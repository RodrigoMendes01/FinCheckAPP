import { z } from 'zod';
import { useDashboard } from '../DashboardContext/useDashboard';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useBankAccounts } from '../../../../../app/hooks/useBankAccounts';
import { useCategories } from '../../../../../app/hooks/useCategories';
import { useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionsService } from '../../../../../app/services/transactionsService';
import { CreateTransactionParams } from '../../../../../app/services/transactionsService/create';
import toast from 'react-hot-toast';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';

const schema = z.object({
  value: z.union([
    z.string().min(1, 'Informe o valor da transação!'),
    z.number()
  ]),
  name: z.string().min(1, 'Informe o nome da transação!'),
  categoryId: z.string().min(1, 'Informe uma categoria!'),
  bankAccountId: z.string().min(1, 'Informe a conta!'),
  date: z.date()
});

type FormData = z.infer<typeof schema>

export function useNewTransactionController () {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType
  } = useDashboard();

  const queryClient = useQueryClient();
  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: CreateTransactionParams) => {
      return transactionsService.create(data);
    }
  });

  const handleSubmit = hookFormSubmit(async data => {
    try {
      console.log(data);
      await mutateAsync({
        ...data,
        value: currencyStringToNumber(data.value),
        type: newTransactionType!,
        date: data.date.toISOString()
      });

      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast.success(
        newTransactionType === 'EXPENSE'
          ? 'Despesa cadastrada com sucesso!'
          : 'Receita cadastrada com sucesso!'
      );
      closeNewTransactionModal();
      reset();

    } catch (error) {
      toast.error(
        newTransactionType === 'EXPENSE'
          ? 'Erro ao cadastrar despesa!'
          : 'Erro ao cadastrar receita!'
      );
    }
  });

  const categories = useMemo(() => {
    return categoriesList.filter(category => category.type === newTransactionType);
  }, [categoriesList, newTransactionType]);

  return {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
    register,
    control,
    errors,
    handleSubmit,
    accounts,
    categories,
    isPending,
  };
}
