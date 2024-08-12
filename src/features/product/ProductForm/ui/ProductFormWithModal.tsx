import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useModal } from 'src/shared/lib/hooks/useModal';
import { Button } from 'src/shared/ui/Button';
import { Modal } from 'src/shared/ui/Modal';
import EditIcon from 'src/shared/assets/icons/Edit.svg';
import { ProductForm } from './ProductForm';

interface ProductFormWithModalProps {
  id?: string;
  className?: string;
}

export const ProductFormWithModal = memo(({ id, className }: ProductFormWithModalProps) => {
  const { isOpen, open, close } = useModal();
  const { t } = useTranslation();

  return (
    <>
      <Button
        className={className}
        icon={EditIcon}
        iconPosition="right"
        variant="secondary"
        size="xs"
        onClick={open}
      >
        {t(id ? 'Редактировать' : 'Добавить товар')}
      </Button>
      <Modal visible={isOpen} onClose={close}>
        <ProductForm onSubmitAction={close} id={id} />
      </Modal>
    </>
  );
});

ProductFormWithModal.displayName = 'ProductFormWithModal';
