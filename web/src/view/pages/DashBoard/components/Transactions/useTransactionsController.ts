import { useState } from 'react';
import { useDashboard } from '../useAccountsController/useDashboard';

export function useTransactionsController () {
  const { areValuesVisible } = useDashboard();
  const [ isFilteredModalOpen, setIsFilteredModalOpen ] = useState(true);

  function handleOpenFiltersModal() {
    setIsFilteredModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFilteredModalOpen(false);
  }

  return {
    areValuesVisible,
    isInitialLoading: false,
    isLoading: false,
    transactions: [{}],
    isFilteredModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal
  };
}
