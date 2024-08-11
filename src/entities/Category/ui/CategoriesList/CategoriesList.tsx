import React, { memo } from 'react';
import cn from 'clsx';
import { useTranslation } from 'react-i18next';
import { Text } from 'src/shared/ui/Text/Text';
import { useFetchCategoriesQuery } from '../../api/categoriesApi';
import { CategoriesListItem } from '../CategoriesListItem/CategoriesListItem';
import { CategoriesListItemSkeleton } from '../CategoriesListItem/CategoriesListItemSkeleton';
import s from './CategoriesList.module.scss';

interface CategoriesListProps {
  className?: string;
}

export const CategoriesList = memo(({ className }: CategoriesListProps) => {
  const { data: categories, error, isLoading } = useFetchCategoriesQuery();
  const { t } = useTranslation();

  if (isLoading)
    return (
      <div className={cn(s.outer, className)}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <CategoriesListItemSkeleton key={item} />
        ))}
      </div>
    );

  if (error || !categories?.length) return <Text>{(error as string) || t('Нет категорий')}</Text>;

  return (
    <div className={cn(s.outer, className)}>
      {categories?.map((category) => (
        <CategoriesListItem key={category.id} {...category} />
      ))}
    </div>
  );
});

CategoriesList.displayName = 'CategoriesList';
