import { Spinner } from './Spinner';

export function PageLoader () {
  return (
    <div className='bg-gray-100 fixed z-20 top-0 left-0 w-full h-full backdrop-blur-sm flex items-center justify-center'>
      <Spinner/>
    </div>
  );
}
