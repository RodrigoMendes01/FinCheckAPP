import { z } from 'zod';
import { useDashboard } from '../DashboardContext/useDashboard';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { bankAccountService } from '../../../../../app/services/bankAccountService';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';
import { UpdateBankAccountParams } from '../../../../../app/services/bankAccountService/update';
import { useState } from 'react';

const schema = z.object({
  initialBalance: z.union([
    z.string().min(1, 'Saldo inicial é obrigatório'),
    z.number(),
  ]),
  name: z.string().min(1, 'Nome da conta é obrigatório'),
  type: z.enum(['INVESTMENT', 'CHECKING', 'CASH']),
  color: z.string().min(1, 'Cor é obrigatória' )
});

type FormData = z.infer<typeof schema>

export function EditAccountController () {
  const {
    isEditAccountModalOpen,
    closeEditAccountModal,
    accountBeingEdited
  } = useDashboard();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      color: accountBeingEdited?.color,
      name: accountBeingEdited?.name,
      type: accountBeingEdited?.type,
      initialBalance: accountBeingEdited?.initialBalance
    }
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const queryClient = useQueryClient();
  const {
    isPending,
    mutateAsync: updateAccount
  } = useMutation({
    mutationFn: async (data: UpdateBankAccountParams) => {
      return bankAccountService.update(data);
    }
  },);

  const {
    isPending: isPendingDeleteAccount,
    mutateAsync: deleteAccount
  } = useMutation({
    mutationFn: async (data: string) => {
      return bankAccountService.remove(data);
    }
  },);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await updateAccount({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
        id: accountBeingEdited!.id
      });

      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      toast.success('Conta editada com sucesso!');
      closeEditAccountModal();
    } catch (error) {
      toast.error('Erro ao salvar as alterações!');
    }
  });

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  async function handleDeleteAccount () {
    try {
      await deleteAccount(
        accountBeingEdited!.id
      );

      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      toast.success('Conta removida com sucesso!');
      closeEditAccountModal();
    } catch (error) {
      toast.error('Erro ao excluir a conta!');
    }
  }

  return {
    isEditAccountModalOpen,
    closeEditAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isPending,
    isPendingDeleteAccount,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteAccount
  };
}
