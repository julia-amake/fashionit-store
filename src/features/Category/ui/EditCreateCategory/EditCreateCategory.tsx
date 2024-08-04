import React, { memo } from 'react';
import { useModal } from 'src/shared/lib/hooks';
import { Button } from 'src/shared/ui/Button';
import { Modal } from 'src/shared/ui/Modal';
import EditIcon from 'src/shared/assets/icons/Edit.svg';
import { CategoryForm } from '../CategoryForm';

interface EditCreateCategoryProps {
  id?: string;
  className?: string;
}

export const EditCreateCategory = memo(({ id, className }: EditCreateCategoryProps) => {
  const { isOpen, open, close } = useModal();

  return (
    <div className={className}>
      <Button
        label={id ? 'Редактировать' : 'Добавить категорию'}
        icon={EditIcon}
        iconPosition="right"
        variant="secondary"
        size="xs"
        onClick={open}
      />
      <Modal visible={isOpen} onClose={close}>
        <CategoryForm onSubmitAction={close} id={id} />
      </Modal>
    </div>
  );
});

EditCreateCategory.displayName = 'EditCreateCategory';
