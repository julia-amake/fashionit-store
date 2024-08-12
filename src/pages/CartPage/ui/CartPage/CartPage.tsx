import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { CartList } from 'src/entities/Cart';
import { RemoveProductFromCart } from 'src/features/cart/RemoveProductFromCart';
import { Heading } from 'src/shared/ui/Heading';
import { CartPageButton } from '../CartPageButton/CartPageButton';
import s from './CartPage.module.scss';

export const CartPage = memo(() => {
  const { t } = useTranslation();

  const renderRemove = useCallback(
    (id: string) => <RemoveProductFromCart id={id} count="all" />,
    []
  );

  return (
    <div className={s.outer}>
      <Heading as="h1" size="h3">
        {t('Корзина')}
      </Heading>
      <CartList action={renderRemove} />
      <CartPageButton />
    </div>
  );
});

CartPage.displayName = 'CartPage';
