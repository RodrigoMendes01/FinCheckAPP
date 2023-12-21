import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useBankAccounts } from '../../../../../app/hooks/useBankAccounts';
import { useCategories } from '../../../../../app/hooks/useCategories';
import { useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionsService } from '../../../../../app/services/transactionsService';
import toast from 'react-hot-toast';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';
import { Transaction } from '../../../../../app/entities/Transaction';
import { UpdateTransactionParams } from '../../../../../app/services/transactionsService/update';

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

export function useEditTransactionController (
  transaction: Transaction | null,
  onclose: () => void
) {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId,
      name: transaction?.name,
      value: transaction?.value,
      date: transaction?.date ? new Date(transaction?.date) : new Date()
    }
  });

  const queryClient = useQueryClient();
  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();
  const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState(false);
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: UpdateTransactionParams) => {
      return transactionsService.update(data);
    }
  });
  const {
    isPending: isPendingDeleteModal,
    mutateAsync: deleteTransaction
  } = useMutation({
    mutationFn: async (data: string) => {
      return transactionsService.remove(data);
    }
  },);

  const handleSubmit = hookFormSubmit(async data => {
    try {
      await mutateAsync({
        ...data,
        id: transaction!.id,
        value: currencyStringToNumber(data.value),
        type: transaction?.type,
        date: data.date.toISOString()
      });

      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      toast.success(
        transaction?.type === 'EXPENSE'
          ? 'Despesa editada com sucesso!'
          : 'Receita editada com sucesso!'
      );
      onclose();
    } catch (error) {
      toast.error(
        transaction?.type === 'EXPENSE'
          ? 'Erro ao editar despesa!'
          : 'Erro ao editar receita!'
      );
    }
  });

  const categories = useMemo(() => {
    return categoriesList.filter(category => category.type === transaction?.type);
  }, [categoriesList, transaction]);

  async function handleDeleteTransaction () {
    try {
      await deleteTransaction(
        transaction!.id
      );

      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      toast.success(
        transaction?.type === 'EXPENSE'
          ? 'Despesa removida com sucesso!'
          : 'Receita removida com sucesso!'
      );
      onclose();
    } catch (error) {
      toast.error(
        transaction?.type === 'EXPENSE'
          ? 'Erro ao remover Despesa!'
          : 'Erro ao remover Receita!'
      );
    }
  }

  function handleOpenDeleteModal () {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal () {
    setIsDeleteModalOpen(false);
  }


  return {
    register,
    control,
    errors,
    handleSubmit,
    accounts,
    categories,
    isPending,
    isDeleteModalOpen,
    isPendingDeleteModal,
    handleDeleteTransaction,
    handleCloseDeleteModal,
    handleOpenDeleteModal
  };
}
