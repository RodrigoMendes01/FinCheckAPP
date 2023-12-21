import { Swiper, SwiperSlide } from 'swiper/react';
import { Months } from '../../../../../app/mocks/months';
import { SliderMonths } from './SliderMonths';
import { SliderNavigation } from './SliderNavigation';
import { useTransactionsController } from './useTransactionsController';
import { Spinner } from '../../../../components/Spinner';
import empytState from '../../../../../assets/images/empytState.svg';
import { TypeDropdown } from './TypeDropdown';
import { FilterIcon } from '../../../../components/icons/FilterIcon';
import { FiltersModal } from './FiltersModal';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { CategoryIcon } from '../../../../components/icons/categories/CategoryIcon';
import { cn } from '../../../../../app/utils/cn';
import { formatDate } from '../../../../../app/utils/formatDate';
import { EditTransactionModal } from '../EditTransactionModal copy';

export function Transactions () {
  const {
    isInitialLoading,
    isLoading,
    transactions,
    isFilteredModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    areValuesVisible,
    handleChangeFilters,
    filters,
    handleOnChange,
    handleOpenEditTransactionModal,
    handleCloseEditTransactionModal,
    isEditModalOpen,
    transactionBeingEdited
  } = useTransactionsController();

  const hasTransactions = transactions.length > 0;

  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full p-10 flex flex-col">
      {isInitialLoading && (
        <div className='w-full h-full flex justify-center items-center'>
          <Spinner/>
        </div>
      )}

      {!isInitialLoading && (
        <>
          <FiltersModal
            onChange={handleOnChange}
            open={isFilteredModalOpen}
            onClose={handleCloseFiltersModal}/>

          <header>
            <div className='flex items-center justify-between'>
              <TypeDropdown
                onSelect={handleChangeFilters('type')}
                selectedType={filters.type}
              />

              <button onClick={handleOpenFiltersModal}>
                <FilterIcon/>
              </button>
            </div>

            <div className="mt-6 relative">
              <Swiper
                slidesPerView={3}
                centeredSlides
                initialSlide={filters.month}
                onSlideChange={swiper => {
                  handleChangeFilters('month')(swiper.realIndex);
                }}
              >
                <SliderNavigation/>

                {Months.map((month, index) => (
                  <SwiperSlide key={month}>
                    {({ isActive }) => (
                      <SliderMonths
                        isActive={isActive}
                        month={month}
                        index={index}
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </header>

          <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
            {isLoading && (
              <div className='h-full flex justify-center items-center'>
                <Spinner/>
              </div>
            )}

            {(!hasTransactions && !isLoading) && (
              <div className='h-full flex flex-col items-center justify-center'>
                <img src={empytState} alt="Mulher com lupa" />
                <span className='text-gray-700'>Não encontramos nenhuma transação</span>
              </div>
            )}

            {(hasTransactions && !isLoading) && (
              <>
                {transactionBeingEdited && (
                  <EditTransactionModal
                    open={isEditModalOpen}
                    onClose={handleCloseEditTransactionModal}
                    transaction={transactionBeingEdited}
                  />
                )}

                {transactions.map(transaction => (
                  <div
                    role='button'
                    className="p-4 bg-white rounded-2xl flex items-center justify-between gap-4"
                    key={transaction.id}
                    onClick={() => handleOpenEditTransactionModal(transaction)}
                  >
                    <div className='flex-1 flex items-center gap-3'>
                      <CategoryIcon
                        type={transaction.type === 'EXPENSE' ? 'expense' : 'income'}
                        category={transaction.category?.icon}
                      />

                      <div className='flex flex-col'>
                        <strong className='tracking-[-0.5px]'>{transaction.name}</strong>
                        <span
                          className='text-sm text-gray-600'
                        >
                          {formatDate(new Date(transaction.date))}
                        </span>
                      </div>
                    </div>

                    <span className={cn(
                      'tracking-[-0.5px] font-medium',
                      transaction.type === 'EXPENSE'
                        ? 'text-red-800'
                        : 'text-green-800'
                    )}>
                      {areValuesVisible ? `${transaction.type === 'EXPENSE'
                        ? '-'
                        : '+'} ${formatCurrency(transaction.value)}`: 'R$ ******'}
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
