import React, { memo, ReactNode } from 'react';
import cn from 'clsx';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/shared/lib/hooks/redux';
import { Preloader } from 'src/shared/ui/Preloader/Preloader';
import { cartSelector, selectCartIsLoading } from '../../model/slices/cartSlice';
import { CartItem } from '../CartItem';
import s from './CartList.module.scss';

interface CartListProps {
  action: (id: string) => ReactNode;
  className?: string;
}

export const CartList = memo(({ action, className }: CartListProps) => {
  const isLoading = useAppSelector(selectCartIsLoading);
  const products = useAppSelector(cartSelector.selectAll);
  const { t } = useTranslation();

  if (isLoading) return <Preloader />;
  if (!products.length) return t('В корзине пусто');

  return (
    <div className={cn(s.outer, className)}>
      {products.map(({ id, ...otherProps }) => (
        <CartItem {...otherProps} id={id} removeButton={action(id)} key={id} />
      ))}
    </div>
  );
});

CartList.displayName = 'CartList';
