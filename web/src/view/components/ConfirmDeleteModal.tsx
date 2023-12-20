import { Button } from './Button';
import { Modal } from './Modal';
import { TrashIcon } from './icons/TrashIcon';

interface ConfirmDeleteModalProps {
  onClose(): void
  title: string
  description?: string
  onConfirm(): void
  isLoading: boolean
}

export function ConfirmDeleteModal({
  onConfirm,
  onClose,
  isLoading,
  title,
  description
}: ConfirmDeleteModalProps) {
  return (
    <Modal open onClose={onClose} title='Excluir'>
      <div className='flex flex-col justify-center items-center text-center gap-6'>
        <div className='w-[52px] h-[52px] rounded-full bg-red-50 flex items-center justify-center text-red-900'
        >
          <TrashIcon className='w-6 h-6'/>
        </div>

        <p
          className='w-[180px] text-gray-800 tracking-[-0.5px] font-bold'
        >
          {title}
        </p>

        <p
          className='tracking-[-0.5px] text-gray-800'
        >
          {description}
        </p>
      </div>

      <div className='mt-10 flex flex-col gap-4'>
        <Button
          className='w-full bg-red-900 hover:bg-red-800'
          onClick={onConfirm}
          isLoading={isLoading}
        >
          Sim, desejo excluir!
        </Button>

        <Button
          className='hover:bg-gray-800/10 w-full bg-transparent border border-gray-800 text-gray-800'
          onClick={onClose}
          disabled={isLoading}
        >
          Cancelar
        </Button>
      </div>
    </Modal>
  );
}
