import { z } from 'zod';
import { useDashboard } from '../DashboardContext/useDashboard';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType
  } = useDashboard();

  const handleSubmit = hookFormSubmit(data => {
    console.log(data);
  });

  return {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
    register,
    control,
    errors,
    handleSubmit
  };
}
