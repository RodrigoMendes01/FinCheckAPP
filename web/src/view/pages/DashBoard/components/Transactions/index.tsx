import { ChevronDownIcon } from '@radix-ui/react-icons';
import { TransactionsIcon } from '../../../../components/icons/TransactionsIcon';
import { FilterIcon } from '../../../../components/icons/FilterIcon';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Months } from '../../../../../app/mocks/months';
import { SliderMonths } from './SliderMonths';
import { SliderNavigation } from './SliderNavigation';
import { Card } from './Card';

export function Transactions () {
  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full p-10 flex flex-col">
      <header>
        <div className='flex justify-between items-center'>
          <button className='flex items-center gap-2'>
            <TransactionsIcon/>
            <span className='text-sm text-gray-800 tracking-[-0.5px] font-medium'>Transações</span>
            <ChevronDownIcon className="text-gray-900"/>
          </button>

          <button>
            <FilterIcon/>
          </button>
        </div>
      </header>

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

      <div className="mt-4 space-y-2 flex-1">
        <Card/>
      </div>
    </div>
  );
}
