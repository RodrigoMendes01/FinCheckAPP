import { Swiper, SwiperSlide } from 'swiper/react';
import { Months } from '../../../../../app/mocks/months';
import { SliderMonths } from './SliderMonths';
import { SliderNavigation } from './SliderNavigation';
import { Card } from './Card';
import { useTransactionsController } from './useTransactionsController';
import { Spinner } from '../../../../components/Spinner';
import empytState from '../../../../../assets/images/empytState.svg';
import { TypeDropdown } from './TypeDropdown';
import { FilterIcon } from '../../../../components/icons/FilterIcon';
import { FiltersModal } from './FiltersModal';

export function Transactions () {
  const {
    isInitialLoading,
    isLoading,
    transactions,
    isFilteredModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal
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
            open={isFilteredModalOpen}
            onClose={handleCloseFiltersModal}/>

          <header>
            <div className='flex items-center justify-between'>
              <TypeDropdown/>

              <button onClick={handleOpenFiltersModal}>
                <FilterIcon/>
              </button>
            </div>

            <div className="mt-6 relative">
              <Swiper
                slidesPerView={3}
                centeredSlides
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
              <Card/>
            )}
          </div>
        </>
      )}
    </div>
  );
}
