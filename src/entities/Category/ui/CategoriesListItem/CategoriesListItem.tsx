import React, { memo } from 'react';
import cn from 'clsx';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTER_PATHS } from 'src/shared/consts/router';
import { Button } from 'src/shared/ui/Button';
import { Heading } from 'src/shared/ui/Heading';
import { PicWrapper } from 'src/shared/ui/PicWrapper';
import s from './CategoriesListItem.module.scss';

interface CategoriesListItemProps {
  id: string;
  name: string;
  photo?: string;
  className?: string;
}

export const CategoriesListItem = memo(
  ({ id, name, photo, className }: CategoriesListItemProps) => {
    const { t } = useTranslation();

    return (
      <Link className={cn(s.outer, className)} to={ROUTER_PATHS.CATEGORY(id)}>
        <PicWrapper className={s.pic} pic={photo} alt={name} />
        <div className={s.content}>
          <Heading className={s.title} as="h3" size="h5" uppercase>
            {name}
          </Heading>
          <Button className={s.btn} size="xs">
            {t('Перейти')}
          </Button>
        </div>
      </Link>
    );
  }
);

CategoriesListItem.displayName = 'CategoriesListItem';
