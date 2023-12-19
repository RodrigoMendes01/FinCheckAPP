import { useState } from 'react';
import { useWindowWidth } from '../../../../../app/hooks/useWindowWidth';
import { useDashboard } from '../DashboardContext/useDashboard';

export function useAccountsController () {
  const {
    areValuesVisible,
    toggleValueVisibility,
    openNewAccountModal,
    closeNewAccountModal,
    isNewAccountModalOpen
  } = useDashboard();

  const windowWidth = useWindowWidth();

  const [sliderState, setSliderState ] = useState({
    isBeginning: true,
    isEnd: false
  });

  return {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValueVisibility,
    isLoading: false,
    accounts: [],
    openNewAccountModal,
    closeNewAccountModal,
    isNewAccountModalOpen
  };
}
