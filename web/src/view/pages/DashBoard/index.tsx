import { useAuth } from '../../../app/hooks/useAuth';
import { Button } from '../../components/Button';

export function DashBoard() {
  const { signout } = useAuth();

  return (
    <>
      <h1>DASHBOARD PAGE</h1>
      <Button onClick={signout}>
        Sair
      </Button>
    </>
  );
}
