import { useDashboard } from '../useAccountsController/useDashboard';

export function useTransactionsController () {
  const { areValuesVisible } = useDashboard();

  return {
    areValuesVisible,
    isLoading: false
  };
}
