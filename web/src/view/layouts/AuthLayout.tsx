import { Outlet } from 'react-router-dom';
import illustration from '../../assets/images/illustration.png';
import { Logo } from '../components/Logo';

export function AuthLayout() {
  return (
    <div className='flex w-full h-full'>

      <div className='w-full h-full flex justify-center flex-col items-center lg:w-1/2'>
        <Logo className='text-gray-500 h-6'/>

        <div className='mt-16 w-full max-w-[504px] px-8'>
          <Outlet/>
        </div>
      </div>

      <div className='w-1/2 h-full flex-col justify-center py-8 pr-8 hidden lg:flex'>
        <div className='object-contain max-w-[656px] max-h-[960px] relative'>
          <img
            src={illustration} className='rounded-b-[32px]'
          />
          <div
            className='max-w-[656px] bg-white py-12 px-10 rounded-b-[32px] bottom-0 absolute'
          >
            <Logo className='text-teal-900 h-8'/>
            <p className='text-gray-700 font-medium text-xl mt-6'>
            Gerencie suas finanças pessoais de uma forma simples com o fincheck, e o melhor, totalmente de graça!
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
