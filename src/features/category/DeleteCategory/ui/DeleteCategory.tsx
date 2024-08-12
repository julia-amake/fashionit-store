import React, { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDeleteCategoryMutation, useFetchCategoryByIdQuery } from 'src/entities/Category';
import { resetCatalog } from 'src/entities/Product';
import { ROUTER_PATHS } from 'src/shared/consts/router';
import { useAppDispatch } from 'src/shared/lib/hooks/redux';
import { Button } from 'src/shared/ui/Button';
import { Confirmation } from 'src/shared/ui/Confirmation/Confirmation';
import { Notification } from 'src/shared/ui/Notification/Notification';
import CloseIcon from 'src/shared/assets/icons/Trash.svg';

interface DeleteCategoryProps {
  id: string;
}

export const DeleteCategory = memo(({ id }: DeleteCategoryProps) => {
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const [deleteCategory, { data, isLoading, error }] = useDeleteCategoryMutation();
  const { data: category, isLoading: categoryLoading } = useFetchCategoryByIdQuery(id || '', {
    skip: !id || Boolean(data),
  });
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const closeConfirmation = useCallback(() => setConfirmationOpen(false), []);

  useEffect(() => {
    if (isLoading) return;
    if (!error && data) {
      dispatch(resetCatalog());
      navigate(ROUTER_PATHS.CATEGORIES);
    }
  }, [data, dispatch, error, isLoading, navigate]);

  useEffect(() => {
    if (!error) return;
    closeConfirmation();
  }, [closeConfirmation, error]);

  const handleRemove = useCallback(() => {
    deleteCategory(id);
  }, [deleteCategory, id]);

  const handleClick = useCallback(() => setConfirmationOpen(true), []);

  if (!category || categoryLoading) return null;

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
          title={`${t('Удалить')} ${category.name}?`}
          desc={t('После удаления восстановить категорию будет невозможно')}
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

DeleteCategory.displayName = 'DeleteCategory';
