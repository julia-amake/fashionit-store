import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectToken } from 'src/features/Auth';
import { DeleteCategory, EditCreateCategory } from 'src/features/Category';
import { ActionsPanel } from 'src/shared/ui/ActionsPanel';

interface CategoriesActionsPanelProps {
  id?: string;
  className?: string;
}

export const CategoriesActionsPanel = memo(({ id, className }: CategoriesActionsPanelProps) => {
  const isAuth = useSelector(selectToken);

  if (!isAuth) return null;

  return (
    <ActionsPanel className={className}>
      <EditCreateCategory id={id} />
      {id && <DeleteCategory id={id} />}
    </ActionsPanel>
  );
});

CategoriesActionsPanel.displayName = 'CategoriesActionsPanel';
