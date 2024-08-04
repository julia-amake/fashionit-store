import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useFetchProductByIdQuery } from 'src/entities/Product';
import { getRouteCatalog } from 'src/shared/consts/router';
import { Button } from 'src/shared/ui/Button';
import { ConfirmModal } from 'src/shared/ui/modals/ConfirmModal';
import CloseIcon from 'src/shared/assets/icons/Trash.svg';
import { useDeleteProductMutation } from '../../api/productMutationApi';

interface DeleteProductProps {
  id: string;
  className?: string;
}

export const DeleteProduct = memo(({ id, className }: DeleteProductProps) => {
  const [deleteProduct, { data, isLoading }] = useDeleteProductMutation();
  const { data: product, isLoading: productLoading } = useFetchProductByIdQuery(id || '', {
    skip: !id || !!data,
  });
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleRemove = useCallback(async () => {
    await deleteProduct(id);
    navigate(getRouteCatalog());
  }, [deleteProduct, id, navigate]);

  const button = useCallback(
    (open: () => void) => (
      <Button
        label={t('Удалить')}
        iconPosition="right"
        icon={CloseIcon}
        variant="secondary"
        size="xs"
        onClick={open}
      />
    ),
    [t]
  );

  if (productLoading || isLoading || data || !product) return null;

  return (
    <div className={className}>
      <ConfirmModal
        button={button}
        title={`${t('Удалить')} ${product.name}?`}
        desc="После удаления восстановить товар будет невозможно"
        onConfirm={handleRemove}
        disabled={isLoading || productLoading}
        confirmText={t('Удалить')}
      />
    </div>
  );
});

DeleteProduct.displayName = 'DeleteProduct';
