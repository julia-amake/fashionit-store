import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useFetchProductByIdQuery } from 'src/entities/Product';
import { ROUTER_PATHS } from 'src/shared/consts/router';
import { Button } from 'src/shared/ui/Button';
import { Confirmation } from 'src/shared/ui/Confirmation/Confirmation';
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
    navigate(ROUTER_PATHS.CATALOG);
  }, [deleteProduct, id, navigate]);

  const button = useCallback(
    (open: () => void) => (
      <Button iconPosition="right" icon={CloseIcon} variant="secondary" size="xs" onClick={open}>
        {t('Удалить')}
      </Button>
    ),
    [t]
  );

  if (productLoading || isLoading || data || !product) return null;

  return (
    <div className={className}>
      <Confirmation
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
