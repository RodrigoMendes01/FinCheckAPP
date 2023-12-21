import { useEffect, useState } from 'react';
import { useDashboard } from '../DashboardContext/useDashboard';
import { useTransactions } from '../../../../../app/hooks/useTransactions';
import { TransactionsFilters } from '../../../../../app/services/transactionsService/getAll';
import { Transaction } from '../../../../../app/entities/Transaction';

export function useTransactionsController () {
  const { areValuesVisible } = useDashboard();

  const [ isFilteredModalOpen, setIsFilteredModalOpen ] = useState(false);
  const [ isEditModalOpen, setIsEditModalOpen ] = useState(false);
  const [transactionBeingEdited, setTransactionBeingEdited] = useState<null | Transaction >(null);

  const [filters, setFilters] = useState<TransactionsFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  });

  const { transactions, isLoading, isInitialLoading, refetch } = useTransactions(filters);

  function handleChangeFilters<TFilter extends keyof TransactionsFilters>(filter: TFilter) {
    return (value: TransactionsFilters[TFilter]) => {
      if (value === filters[filter]) return;

      setFilters(prevState => ({
        ...prevState,
        [filter]: value
      }));
    };
  }

  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  function handleOnChange({ bankAccountId, year }:{ bankAccountId: string | undefined, year: number }) {
    handleChangeFilters('bankAccountId')(bankAccountId);
    handleChangeFilters('year')(year);
    setIsFilteredModalOpen(false);
  }

  function handleOpenFiltersModal() {
    setIsFilteredModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFilteredModalOpen(false);
  }

  function handleOpenEditTransactionModal(transaction: Transaction) {
    setIsEditModalOpen(true);
    setTransactionBeingEdited(transaction);
  }

  function handleCloseEditTransactionModal() {
    setIsEditModalOpen(false);
    setTransactionBeingEdited(null);
  }

  return {
    areValuesVisible,
    isInitialLoading,
    isLoading,
    transactions,
    isFilteredModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    handleChangeFilters,
    filters,
    handleOnChange,
    transactionBeingEdited,
    isEditModalOpen,
    handleOpenEditTransactionModal,
    handleCloseEditTransactionModal
  };
}
