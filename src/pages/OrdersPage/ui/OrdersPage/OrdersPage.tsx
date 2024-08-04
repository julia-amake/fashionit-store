import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Heading } from 'src/shared/ui/Heading';
import { OrdersList } from 'src/widgets/Order';
import s from './OrdersPage.module.scss';

export const OrdersPage = memo(() => {
  const { t } = useTranslation();

  return (
    <div className={s.outer}>
      <Heading as="h1" size="h3">
        {t('Заказы')}
      </Heading>
      <OrdersList />
    </div>
  );
});

OrdersPage.displayName = 'OrdersPage';
