import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { CategoryIcon } from '../../../../components/icons/categories/CategoryIcon';
import { useTransactionsController } from './useTransactionsController';

export function Card () {
  const { areValuesVisible } = useTransactionsController();

  return (
    <div className="p-4 bg-white rounded-2xl flex items-center justify-between gap-4">
      <div className='flex-1 flex items-center gap-3'>
        <CategoryIcon type='expense'/>

        <div className='flex flex-col'>
          <strong className='tracking-[-0.5px]'>Almoço</strong>
          <span className='text-sm text-gray-600'>04/06/2023</span>
        </div>
      </div>

      <span className='tracking-[-0.5px] text-red-800 font-medium'>
        {!areValuesVisible ? `-${formatCurrency(200)}`: 'R$ ******'}
      </span>
    </div>
  );
}
