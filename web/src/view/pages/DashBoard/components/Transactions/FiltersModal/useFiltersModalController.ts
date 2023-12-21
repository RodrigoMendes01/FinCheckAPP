import { useState } from 'react';
import { useBankAccounts } from '../../../../../../app/hooks/useBankAccounts';

export function useFiltersModal () {
  const [ selectedBankAccount, setSelectedBankAccount ] = useState<undefined | string>(undefined);
  const [ selectedYear, setSelectedYear ] = useState(new Date().getFullYear());

  const { accounts } = useBankAccounts();

  function handleSelectBankAccount(bankAccountId: string) {
    setSelectedBankAccount(prevState => prevState === bankAccountId ? undefined : bankAccountId);
  }

  function handleChangeYear(step: number) {
    setSelectedYear(prevState => prevState + step);
  }

  return {
    selectedBankAccount,
    handleSelectBankAccount,
    selectedYear,
    handleChangeYear,
    accounts
  };
}