import React, { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { removeProductFromCart } from 'src/entities/Cart';
import { useDeleteProductMutation, useFetchProductByIdQuery } from 'src/entities/Product';
import { ROUTER_PATHS } from 'src/shared/consts/router';
import { useAppDispatch } from 'src/shared/lib/hooks/redux';
import { Button } from 'src/shared/ui/Button';
import { Confirmation } from 'src/shared/ui/Confirmation/Confirmation';
import { Notification } from 'src/shared/ui/Notification/Notification';
import CloseIcon from 'src/shared/assets/icons/Trash.svg';

interface DeleteProductProps {
  id: string;
}

export const DeleteProduct = memo(({ id }: DeleteProductProps) => {
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const [deleteProduct, { data, isLoading, error }] = useDeleteProductMutation();
  const { data: product, isLoading: productLoading } = useFetchProductByIdQuery(id || '', {
    skip: !id || Boolean(data),
  });

  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const closeConfirmation = useCallback(() => setConfirmationOpen(false), []);

  useEffect(() => {
    if (isLoading) return;
    if (!error && data) {
      dispatch(removeProductFromCart({ id, count: 'all' }));
      navigate(ROUTER_PATHS.CATALOG);
    }
  }, [data, dispatch, error, id, isLoading, navigate]);

  useEffect(() => {
    if (!error) return;
    closeConfirmation();
  }, [closeConfirmation, error]);

  const handleRemove = useCallback(() => {
    deleteProduct(id);
  }, [deleteProduct, id]);

  const handleClick = useCallback(() => setConfirmationOpen(true), []);

  if (!product || productLoading) return null;

  return (
    <>
      <Button
        iconPosition="right"
        icon={CloseIcon}
        variant="secondary"
        size="xs"
        onClick={handleClick}
      >
        {t('Удалить')}
      </Button>
      {confirmationOpen && (
        <Confirmation
          title={`${t('Удалить')} ${product.name}?`}
          desc={t('После удаления восстановить товар будет невозможно')}
          onConfirm={handleRemove}
          onCancel={closeConfirmation}
          disabled={isLoading}
          confirmText={t('Удалить')}
        />
      )}
      {error && <Notification title={t('Что-то пошло не так')} info={error as string} />}
    </>
  );
});

DeleteProduct.displayName = 'DeleteProduct';
