import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useModal } from 'src/shared/lib/hooks/useModal';
import { Button } from 'src/shared/ui/Button';
import { Modal } from 'src/shared/ui/Modal';
import EditIcon from 'src/shared/assets/icons/Edit.svg';
import { ProductForm } from '../ProductForm';

interface EditProductProps {
  id: string;
  className?: string;
}

export const EditProduct = memo(({ id, className }: EditProductProps) => {
  const { isOpen, open, close } = useModal();
  const { t } = useTranslation();

  return (
    <div className={className}>
      <Button icon={EditIcon} iconPosition="right" variant="secondary" size="xs" onClick={open}>
        {t('Редактировать')}
      </Button>
      <Modal visible={isOpen} onClose={close}>
        <ProductForm onSubmitAction={close} id={id} />
      </Modal>
    </div>
  );
});

EditProduct.displayName = 'EditProduct';
