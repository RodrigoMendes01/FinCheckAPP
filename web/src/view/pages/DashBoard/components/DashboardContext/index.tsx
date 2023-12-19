import { createContext, useCallback, useState } from 'react';

interface DashBoardContextValue {
  areValuesVisible: boolean
  toggleValueVisibility(): void
  openNewAccountModal(): void,
  closeNewAccountModal(): void,
  isNewAccountModalOpen: boolean
}

export const DashBoardContext = createContext({} as DashBoardContextValue);


export function DashBoardProvider({ children }: { children: React.ReactNode }) {
  const [ areValuesVisible, setAreValuesVisible ] = useState(true);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);

  const toggleValueVisibility = useCallback(() => {
    setAreValuesVisible((prevState) => !prevState);
  }, []);

  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true);
  }, []);

  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false);
  }, []);


  return (
    <DashBoardContext.Provider
      value={{
        areValuesVisible,
        toggleValueVisibility,
        openNewAccountModal,
        closeNewAccountModal,
        isNewAccountModalOpen
      }}>
      {children}
    </DashBoardContext.Provider>
  );
}
