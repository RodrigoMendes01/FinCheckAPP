import { EyeIcon } from '../../../../components/icons/EyeIcon';
import { AccountCard } from './AccountCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { SliderNavigation } from './SliderNavigation';
import { useAccountsController } from './useAccountsController';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { Spinner } from '../../../../components/Spinner';
import { PlusIcon } from '@radix-ui/react-icons';

export function Accounts () {
  const {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValueVisibility,
    isLoading,
    accounts,
    openNewAccountModal,
    currentBalance
  } = useAccountsController();

  return (
    <div
      className="bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col"
    >
      {isLoading && (
        <div className='w-full h-full flex justify-center items-center'>
          <Spinner className='text-teal-950/50 fill-white'/>
        </div>
      )}


      {!isLoading && (
        <>
          <div className="flex flex-col">
            <span className="text-white tracking-[-0.5px]">Saldo total</span>

            <div className='flex items-center gap-2'>

              <strong
                className='text-2xl tracking-[-1px] text-white'
              >
                {!areValuesVisible ? formatCurrency(currentBalance) : 'R$ ******'}
              </strong>

              <button
                className='w-8 h-8 flex items-center justify-center'
                onClick={toggleValueVisibility}
              >
                <EyeIcon open={!areValuesVisible}/>
              </button>

            </div>
          </div>

          <div className='flex-1 flex flex-col justify-end'>
            {accounts.length === 0 && (
              <>
                <div
                  slot='container-start'
                  className='mb-4'
                >
                  <strong
                    className='text-white tracking-[-1px] text-lg'
                  >
                  Minhas contas
                  </strong>
                </div>

                <button
                  className='mt-4 h-52 border-2 border-dashed rounded-2xl border-teal-600 flex flex-col items-center justify-center gap-4 text-white'
                  onClick={openNewAccountModal}
                >

                  <div
                    className='w-11 h-11 rounded-full border-2 border-dashed border-white flex items-center justify-center'
                  >
                    <PlusIcon className='w-6 h-6'/>
                  </div>

                  <span
                    className='tracking-[-0.5px] font-medium'
                  >
                    Cadastre uma nova conta
                  </span>

                </button>
              </>
            )}

            {accounts.length > 0 && (
              <div>
                <Swiper
                  spaceBetween={16}
                  slidesPerView={windowWidth >= 500 ? 2.3 : 1.1}
                  onSlideChange={swiper => {
                    setSliderState({
                      isBeginning: swiper.isBeginning,
                      isEnd: swiper.isEnd
                    });
                  }}
                >

                  <div
                    slot='container-start'
                    className='flex items-center justify-between mb-4'
                  >

                    <strong className='text-white tracking-[-1px] text-lg'>Minhas contas</strong>

                    <SliderNavigation
                      isBeginning={sliderState.isBeginning}
                      isEnd={sliderState.isEnd}
                    />

                  </div>

                  <div>

                    {accounts.map(account => (
                      <SwiperSlide
                        key={account.id}
                      >
                        <AccountCard
                          data={account}
                        />
                      </SwiperSlide>
                    ))}

                  </div>
                </Swiper>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
