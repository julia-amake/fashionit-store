import React, { memo } from 'react';
import { selectIsAuth } from 'src/features/Auth';
import { DeleteCategory } from 'src/features/category/DeleteCategory';
import { EditCreateCategory } from 'src/features/category/EditCreateCategory';
import { useAppSelector } from 'src/shared/lib/hooks/redux';
import { ActionsPanel } from 'src/shared/ui/ActionsPanel';

interface CategoriesActionsPanelProps {
  id?: string;
  className?: string;
}

export const CategoriesActionsPanel = memo(({ id, className }: CategoriesActionsPanelProps) => {
  const isAuth = useAppSelector(selectIsAuth);

  if (!isAuth) return null;

  return (
    <ActionsPanel className={className}>
      <EditCreateCategory id={id} />
      {id && <DeleteCategory id={id} />}
    </ActionsPanel>
  );
});

CategoriesActionsPanel.displayName = 'CategoriesActionsPanel';
