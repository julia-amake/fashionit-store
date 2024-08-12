import React, { memo } from 'react';
import { selectIsAuth } from 'src/features/Auth';
import { DeleteProduct } from 'src/features/product/DeleteProduct';
import { ProductFormWithModal } from 'src/features/product/ProductForm';
import { useAppSelector } from 'src/shared/lib/hooks/redux';
import { ActionsPanel } from 'src/shared/ui/ActionsPanel';

interface ProductActionsPanelProps {
  id?: string;
  className?: string;
}

export const ProductActionsPanel = memo(({ id, className }: ProductActionsPanelProps) => {
  const isAuth = useAppSelector(selectIsAuth);
  if (!isAuth) return null;

  return (
    <ActionsPanel className={className}>
      <ProductFormWithModal id={id} />
      {id && <DeleteProduct id={id} />}
    </ActionsPanel>
  );
});

ProductActionsPanel.displayName = 'ProductActionsPanel';
