import { useContext } from 'react';
import { DashBoardContext } from '.';

export function useDashboard() {
  return useContext(DashBoardContext);
}
