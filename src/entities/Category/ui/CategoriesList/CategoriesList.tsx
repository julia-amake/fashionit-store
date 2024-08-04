import React, { memo, useMemo } from 'react';
import cn from 'clsx';
import { Link } from 'react-router-dom';
import { Button } from 'src/shared/ui/Button';
import { Heading } from 'src/shared/ui/Heading';
import { PicWrapper } from 'src/shared/ui/PicWrapper';
import { Text } from 'src/shared/ui/Text';
import { useFetchCategoriesQuery } from '../../api/categoriesApi';
import s from './CategoriesList.module.scss';

interface CategoriesListProps {
  className?: string;
}

export const CategoriesList = memo(({ className }: CategoriesListProps) => {
  const { data: categories, error, isLoading } = useFetchCategoriesQuery();

  const text = useMemo(() => {
    switch (true) {
      case isLoading:
        return 'Загружаем категории...';
      case !!error:
        return (
          <>
            Не удалось загрузить категории — <b>{error as string}</b>
          </>
        );
      case !categories?.length:
        return 'Нет категорий';
      default:
        return null;
    }
  }, [categories, error, isLoading]);

  if (text) return <Text>{text}</Text>;

  return (
    <div className={cn(s.outer, className)}>
      {categories?.map(({ id, name, photo }) => (
        <Link className={s.item} to={`/categories/${id}`} key={id}>
          <PicWrapper className={s.pic} pic={photo} alt={name} />
          <div className={s.content}>
            <Heading className={s.title} as="h3" size="h5" uppercase>
              {name}
            </Heading>
            <Button className={s.btn} label="Перейти" size="xs" />
          </div>
        </Link>
      ))}
    </div>
  );
});

CategoriesList.displayName = 'CategoriesList';
