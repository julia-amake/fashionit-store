import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { cartSelector } from 'src/entities/Cart';
import { selectIsAuth } from 'src/features/Auth';
import { CreateOrder } from 'src/features/CreateOrder';
import { useAppSelector } from 'src/shared/lib/hooks/redux';
import { Text } from 'src/shared/ui/Text/Text';

export const CartPageButton = memo(() => {
  const products = useAppSelector(cartSelector.selectAll);
  const isAuth = useAppSelector(selectIsAuth);
  const { t } = useTranslation();

  if (isAuth) return <CreateOrder />;
  if (!products.length) return null;
  return <Text size="xs">*{t('Чтобы оформлять заказы нужно авторизоваться')}</Text>;
});

CartPageButton.displayName = 'CartPageButton';
