import { Link } from 'react-router-dom';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useRegisterController } from './useRegisterController';

export function Register() {
  const { register, errors, handleSubmit, isPending } = useRegisterController();

  return (
    <>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]"
        >
          Crie sua conta
        </h1>

        <p className='space-x-2'>
          <span className='text-gray-700 tracking-[-0.5px]'>Já possui uma conta?</span>
          <Link to="/login" className='text-teal-900 font-medium'>Fazer Login</Link>
        </p>

      </header>

      <form
        className='mt-[60px] flex flex-col gap-4'
        onSubmit={handleSubmit}
      >
        <Input
          placeholder='Nome'
          {...register('name')}
          error={errors.name?.message}
        />

        <Input
          type='email'
          placeholder='E-mail'
          {...register('email')}
          error={errors.email?.message}
        />

        <Input
          type='password'
          placeholder='Senha'
          {...register('password')}
          error={errors.password?.message}
        />

        <Button
          type='submit'
          className='mt-2'
          isLoading={isPending}
        >
          Criar conta
        </Button>
      </form>
    </>
  );
}
