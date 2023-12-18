import { useState } from 'react';
import { useWindowWidth } from '../../../../../app/hooks/useWindowWidth';
import { useDashboard } from '../useAccountsController/useDashboard';

export function useAccountsController () {
  const { areValuesVisible, toggleValueVisibility } = useDashboard();
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
    isLoading: false
  };
}
