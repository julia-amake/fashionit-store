import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectToken } from 'src/features/Auth';
import { DeleteProduct, EditProduct } from 'src/features/Product';
import { ROUTER_PATHS } from 'src/shared/consts/router';
import { ActionsPanel } from 'src/shared/ui/ActionsPanel';
import { Button } from 'src/shared/ui/Button';
import EditIcon from 'src/shared/assets/icons/Edit.svg';

interface ProductActionsPanelProps {
  id?: string;
  className?: string;
}

export const ProductActionsPanel = memo(({ id, className }: ProductActionsPanelProps) => {
  const isAuth = useSelector(selectToken);
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (!isAuth) return null;

  return (
    <ActionsPanel className={className}>
      {!id && (
        <Button
          icon={EditIcon}
          iconPosition="right"
          variant="secondary"
          size="xs"
          onClick={() => navigate(ROUTER_PATHS.ADD_PRODUCT)}
        >
          {t('Добавить товар')}
        </Button>
      )}
      {id && (
        <>
          <EditProduct id={id} />
          <DeleteProduct id={id} />
        </>
      )}
    </ActionsPanel>
  );
});

ProductActionsPanel.displayName = 'ProductActionsPanel';
