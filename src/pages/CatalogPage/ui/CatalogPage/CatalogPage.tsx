import React, { memo } from 'react';
import cn from 'clsx';
import { useTranslation } from 'react-i18next';
import { Heading } from 'src/shared/ui/Heading';
import { ProductActionsPanel } from 'src/widgets/ProductActionsPanel';
import { ProductsInfinityList } from 'src/widgets/ProductsInfinityList';
import s from './CatalogPage.module.scss';

export const CatalogPage = memo(() => {
  const { t } = useTranslation();

  return (
    <div className={cn(s.outer)}>
      <div className={s.header}>
        <Heading as="h1" size="h3">
          {t('Каталог')}
        </Heading>
        <ProductActionsPanel className={s.actions} />
      </div>
      <ProductsInfinityList />
    </div>
  );
});

CatalogPage.displayName = 'CatalogPage';
