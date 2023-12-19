import { useDashboard } from '../DashboardContext/useDashboard';

export function NewAccountController () {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard();


  return {
    isNewAccountModalOpen,
    closeNewAccountModal
  };
}
