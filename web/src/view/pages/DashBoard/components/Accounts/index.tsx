import { EyeIcon } from '../../../../components/icons/EyeIcon';
import { AccountCard } from './AccountCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { SliderNavigation } from './SliderNavigation';
import { useAccountsController } from './useAccountsController';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';

export function Accounts () {
  const {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValueVisibility
  } = useAccountsController();

  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col">
      <div className="flex flex-col">
        <span className="text-white tracking-[-0.5px]">Saldo total</span>

        <div className='flex items-center gap-2'>

          <strong
            className='text-2xl tracking-[-1px] text-white'
          >
            {!areValuesVisible ? formatCurrency(1000) : 'R$ ******'}
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

              <SwiperSlide>
                <AccountCard
                  color="#7950f2"
                  name="Nubank"
                  balance={120.24}
                  type='CHECKING'
                />
              </SwiperSlide>

              <SwiperSlide>
                <AccountCard
                  color="#0F0"
                  name="Carteira"
                  balance={2000.56}
                  type='CASH'
                />
              </SwiperSlide>

              <SwiperSlide>
                <AccountCard
                  color="#02d"
                  name="XP Investimentos"
                  balance={11000.56}
                  type='INVESTMENT'
                />
              </SwiperSlide>

            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
