import React, { memo } from 'react';
import { ProductForm } from 'src/features/Product/ui/ProductForm';
import { ROUTER_PATHS } from 'src/shared/consts/router';
import { useModalByRoute } from 'src/shared/lib/hooks/useModalByRoute/useModalByRoute';
import { Modal } from 'src/shared/ui/Modal';

export const AddProductPage = memo(() => {
  const { isVisible, close } = useModalByRoute(ROUTER_PATHS.ADD_PRODUCT);

  return (
    <Modal visible={isVisible} onClose={close}>
      <ProductForm onSubmitAction={close} />
    </Modal>
  );
});

AddProductPage.displayName = 'AddProductPage';
