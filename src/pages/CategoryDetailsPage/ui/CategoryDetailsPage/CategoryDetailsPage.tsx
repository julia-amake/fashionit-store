import React, { memo } from 'react';
import cn from 'clsx';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useFetchCategoryByIdQuery } from 'src/entities/Category';
import { useAppearanceDelay } from 'src/shared/lib/hooks/useAppearanceDelay';
import { Heading } from 'src/shared/ui/Heading';
import { PicWrapper } from 'src/shared/ui/PicWrapper';
import { Skeleton } from 'src/shared/ui/Skeleton/Skeleton';
import { Text } from 'src/shared/ui/Text/Text';
import { CategoriesActionsPanel } from 'src/widgets/CategoriesActionsPanel';
import s from './CategoryDetailsPage.module.scss';

interface CategoryDetailsPageProps {
  className?: string;
}

export const CategoryDetailsPage = memo(({ className }: CategoryDetailsPageProps) => {
  const { id } = useParams();
  const { data, isLoading, error } = useFetchCategoryByIdQuery(id || '', { skip: !id });
  const showSkeleton = useAppearanceDelay(isLoading, { defaultValue: true });
  const { t } = useTranslation();

  if (showSkeleton)
    return (
      <div className={cn(s.outer, className)}>
        <div className={s.header}>
          <Skeleton height={44} width="30%" marginBottom={8} marginTop={4} />
        </div>
        <Skeleton width={640} height={800} />
      </div>
    );

  if (error || !data) return <Text>{(error as string) || t('Нет данных')}</Text>;

  const { name, photo } = data;

  return (
    <div className={cn(s.outer, className)}>
      <div className={s.header}>
        <Heading as="h1" size="h3">
          {name}
        </Heading>
        <CategoriesActionsPanel id={id} className={s.actions} />
      </div>
      <PicWrapper className={s.pic} pic={photo} alt={name} />
    </div>
  );
});

CategoryDetailsPage.displayName = 'CategoryDetailsPage';
