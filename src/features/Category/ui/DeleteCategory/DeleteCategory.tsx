import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchCategoryByIdQuery } from 'src/entities/Category/api/categoriesApi';
import { getRouteCategories } from 'src/shared/consts/router';
import { Button } from 'src/shared/ui/Button';
import { ConfirmModal } from 'src/shared/ui/modals/ConfirmModal';
import CloseIcon from 'src/shared/assets/icons/Trash.svg';
import { useDeleteCategoryMutation } from '../../api/categoryMutationApi';

interface DeleteCategoryProps {
  id: string;
  className?: string;
}

export const DeleteCategory = memo(({ id, className }: DeleteCategoryProps) => {
  const [deleteCategory, { data, isLoading }] = useDeleteCategoryMutation();
  const { data: category, isLoading: categoryLoading } = useFetchCategoryByIdQuery(id || '', {
    skip: !id || !!data,
  });
  const navigate = useNavigate();

  const handleRemove = useCallback(async () => {
    await deleteCategory(id);
    navigate(getRouteCategories());
  }, [deleteCategory, id, navigate]);

  const button = useCallback(
    (open: () => void) => (
      <Button
        label="Удалить"
        iconPosition="right"
        icon={CloseIcon}
        variant="secondary"
        size="xs"
        onClick={open}
      />
    ),
    []
  );

  if (categoryLoading || isLoading || data || !category) return null;

  return (
    <div className={className}>
      <ConfirmModal
        button={button}
        title={`Удалить категорию ${category.name}?`}
        desc="После удаления восстановить категорию будет невозможно"
        onConfirm={handleRemove}
        disabled={isLoading || categoryLoading}
        confirmText="Удалить"
      />
    </div>
  );
});

DeleteCategory.displayName = 'DeleteCategory';
