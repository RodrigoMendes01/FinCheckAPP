import { useSwiper } from 'swiper/react';
import { cn } from '../../../../../app/utils/cn';

interface SliderMonthsProps {
  isActive: boolean
  month: string
  index: number
}

export function SliderMonths({ isActive, month, index }: SliderMonthsProps) {
  const swiper = useSwiper();

  return (
    <button
      onClick={() => swiper.slideTo(index)}
      className={cn('w-36 rounded-full h-12 text-sm text-gray-800 tracking-[-0.5px] font-medium', isActive && 'bg-white')}>
      {month}
    </button>
  );
}
