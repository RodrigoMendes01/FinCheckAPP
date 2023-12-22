import { Logo } from '../../components/Logo';
import { UserMenu } from '../../components/UserMenu';
import { Accounts } from './components/Accounts';
import { Fab } from './components/Fab';
import { Transactions } from './components/Transactions';
import { DashBoardContext, DashBoardProvider } from './components/DashboardContext';
import { NewAccountModal } from './components/Modals/NewAccountModal';
import { NewTransactionModal } from './components/Modals/NewTransactionModal';
import { EditAccountModal } from './components/Modals/EditAccountModal';

export function DashBoard() {
  return (
    <DashBoardProvider>
      <DashBoardContext.Consumer>
        {({ accountBeingEdited }) => (
          <div className='w-full h-full p-4 md:px-8 md:pb-8 md:pt-6 flex flex-col'>
            <header className='h-12 flex justify-between'>
              <Logo className='h-6 text-teal-900'/>
              <UserMenu/>
            </header>

            <main className='mt-4 flex-1 flex flex-col gap-4 md:flex-row max-h-full'>
              <div className='w-full md:w-1/2'>
                <Accounts/>
              </div>

              <div className='w-full md:w-1/2'>
                <Transactions/>
              </div>
            </main>

            <Fab/>
            <NewAccountModal/>
            <NewTransactionModal/>
            {accountBeingEdited && <EditAccountModal/>}
          </div>
        )}
      </DashBoardContext.Consumer>
    </DashBoardProvider>
  );
}
