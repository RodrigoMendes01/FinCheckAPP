import { BankAccount } from '../../../../../app/entities/BankAccount';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { BankAccountTypeIcon } from '../../../../components/icons/BankAccountTypeIcon';
import { useDashboard } from '../DashboardContext/useDashboard';

interface AccountCardProps {
  data: BankAccount
}

export function AccountCard({ data }: AccountCardProps) {
  const { areValuesVisible, openEditAccountModal } = useDashboard();
  const { color, name, currentBalance, type } = data;

  return (
    <div
      className="p-4 bg-white rounded-2xl h-[200px] flex flex-col justify-between border-b-[5px] border-gray-900"
      style={{ borderColor: color}}
      role='button'
      onClick={() => openEditAccountModal(data)}
    >
      <div>
        <BankAccountTypeIcon type={type}/>
        <span className='text-gray-800 font-medium tracking-[-0.5px] block mt-4'>{name}</span>
      </div>

      <div>
        <span
          className='text-gray-800 font-medium tracking-[-0.5px] block'
        >
          {areValuesVisible ? formatCurrency(currentBalance) : 'R$ ******'}
        </span>

        <small className='text-gray-600 text-sm'>Saldo atual</small>
      </div>
    </div>
  );
}
