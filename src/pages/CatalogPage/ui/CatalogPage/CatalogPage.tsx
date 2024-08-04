import React, { memo } from 'react';
import cn from 'clsx';
import { useTranslation } from 'react-i18next';
import { Heading } from 'src/shared/ui/Heading';
import { ProductsInfinityList } from 'src/widgets/product/ProductsInfinityList';
import { ProductActionsPanel } from 'src/widgets/ProductActionsPanel';
import s from './CatalogPage.module.scss';

interface CatalogPageProps {
  className?: string;
}

export const CatalogPage = memo((props: CatalogPageProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <div className={cn(s.outer, className)}>
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
