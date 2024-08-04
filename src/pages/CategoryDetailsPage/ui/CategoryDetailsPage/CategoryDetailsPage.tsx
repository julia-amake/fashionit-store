import React, { memo } from 'react';
import cn from 'clsx';
import { useParams } from 'react-router-dom';
import { useFetchCategoryByIdQuery } from 'src/entities/Category/api/categoriesApi';
import { Heading } from 'src/shared/ui/Heading';
import { PicWrapper } from 'src/shared/ui/PicWrapper';
import { Text } from 'src/shared/ui/Text';
import { CategoriesActionsPanel } from 'src/widgets/CategoriesActionsPanel';
import s from './CategoryDetailsPage.module.scss';

interface CategoryDetailsPageProps {
  className?: string;
}

export const CategoryDetailsPage = memo(({ className }: CategoryDetailsPageProps) => {
  const { id } = useParams();
  const { data, isLoading, error } = useFetchCategoryByIdQuery(id || '', { skip: !id });

  if (isLoading) return <Text>Загружаем...</Text>;
  if (error || !data) return <Text>{(error as string) || 'Нет данных'}</Text>;

  const { name, photo } = data;

  return (
    <div className={cn(s.outer, className)}>
      <div className={s.header}>
        <Heading className={s.title} as="h1" size="h3">
          {name}
        </Heading>
        <CategoriesActionsPanel id={id} className={s.actions} />
      </div>
      <PicWrapper className={s.pic} pic={photo} alt={name} />
    </div>
  );
});

CategoryDetailsPage.displayName = 'CategoryDetailsPage';
