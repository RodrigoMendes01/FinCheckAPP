import { createContext, useCallback, useState } from 'react';

interface DashBoardContextValue {
  areValuesVisible: boolean
  toggleValueVisibility(): void
  openNewAccountModal(): void,
  closeNewAccountModal(): void,
  newTransactionType: 'INCOME' | 'EXPENSE' | null
  isNewAccountModalOpen: boolean,
  openNewTransactionModal(type: 'INCOME' | 'EXPENSE'): void
  closeNewTransactionModal(): void
  isNewTransactionModalOpen: boolean
}

export const DashBoardContext = createContext({} as DashBoardContextValue);


export function DashBoardProvider({ children }: { children: React.ReactNode }) {
  const [ areValuesVisible, setAreValuesVisible ] = useState(true);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
  const [newTransactionType, setNewTransactionType] = useState<'INCOME' | 'EXPENSE' | null>(null);

  const toggleValueVisibility = useCallback(() => {
    setAreValuesVisible((prevState) => !prevState);
  }, []);

  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true);
  }, []);

  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false);
  }, []);

  const openNewTransactionModal = useCallback((type: 'INCOME' | 'EXPENSE') => {
    setNewTransactionType(type);
    setIsNewTransactionModalOpen(true);
  }, []);

  const closeNewTransactionModal = useCallback(() => {
    setNewTransactionType(null);
    setIsNewTransactionModalOpen(false);
  }, []);


  return (
    <DashBoardContext.Provider
      value={{
        areValuesVisible,
        toggleValueVisibility,
        openNewAccountModal,
        closeNewAccountModal,
        isNewAccountModalOpen,
        isNewTransactionModalOpen,
        openNewTransactionModal,
        closeNewTransactionModal,
        newTransactionType
      }}>
      {children}
    </DashBoardContext.Provider>
  );
}
