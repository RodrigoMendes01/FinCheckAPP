import { createContext, useCallback, useState } from 'react';

interface DashBoardContextValue {
  areValuesVisible: boolean
  toggleValueVisibility(): void
}

export const DashBoardContext = createContext({} as DashBoardContextValue);


export function DashBoardProvider({ children }: { children: React.ReactNode }) {
  const [ areValuesVisible, setAreValuesVisible ] = useState(true);

  const toggleValueVisibility = useCallback(() => {
    setAreValuesVisible((prevState) => !prevState);
  }, []);

  return (
    <DashBoardContext.Provider
      value={{
        areValuesVisible,
        toggleValueVisibility
      }}>
      {children}
    </DashBoardContext.Provider>
  );
}
