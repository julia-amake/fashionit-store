import React, { ChangeEvent, memo, useState } from 'react';
import cn from 'clsx';
import { Button } from 'src/shared/ui/Button';
import { Modal } from 'src/shared/ui/Modal';
import { TextField } from 'src/shared/ui/TextField';
import s from './ModalStateTesting.module.scss';

interface ModalStateTestingProps {
  className?: string;
}

export const ModalStateTesting = memo(({ className }: ModalStateTestingProps) => {
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={cn(s.outer, className)}>
      <TextField
        label="Что вывести в модалке?"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.currentTarget.value)}
      />
      <Button label="Открыть модалку" onClick={() => setIsModalOpen(true)} disabled={!message} />
      <Modal visible={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {message}
      </Modal>
    </div>
  );
});

ModalStateTesting.displayName = 'ModalStateTesting';
