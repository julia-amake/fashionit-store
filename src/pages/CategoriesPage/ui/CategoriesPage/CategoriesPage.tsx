import React, { memo } from 'react';
import cn from 'clsx';
import { useTranslation } from 'react-i18next';
import { CategoriesList } from 'src/entities/Category/ui';
import { Heading } from 'src/shared/ui/Heading';
import { CategoriesActionsPanel } from 'src/widgets/CategoriesActionsPanel';
import s from './CategoriesPage.module.scss';

interface CategoriesPageProps {
  className?: string;
}

export const CategoriesPage = memo(({ className }: CategoriesPageProps) => {
  const { t } = useTranslation();

  return (
    <div className={cn(s.outer, className)}>
      <div className={s.header}>
        <Heading className={s.title} as="h1" size="h3">
          {t('Категории')}
        </Heading>
        <CategoriesActionsPanel className={s.actions} />
      </div>
      <CategoriesList />
    </div>
  );
});

CategoriesPage.displayName = 'CategoriesPage';
