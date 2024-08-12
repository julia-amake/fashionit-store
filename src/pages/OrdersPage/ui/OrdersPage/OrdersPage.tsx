import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { OrdersList, useFetchOrdersQuery } from 'src/entities/Order';
import { useFetchProfileQuery } from 'src/entities/Profile';
import { Heading } from 'src/shared/ui/Heading';
import { Text } from 'src/shared/ui/Text/Text';
import s from './OrdersPage.module.scss';

export const OrdersPage = memo(() => {
  const { data: profile } = useFetchProfileQuery();
  const { data: orders, isFetching, error } = useFetchOrdersQuery({ userId: profile?.id });
  const { t } = useTranslation();

  if (!profile) return;

  return (
    <div className={s.outer}>
      <Heading as="h1" size="h3">
        {t('Заказы')}
      </Heading>
      {!isFetching && (error || !orders) && (
        <Text color="error">{(error as string) || t('Ошибка загрузки')}</Text>
      )}
      <OrdersList orders={orders} isLoading={isFetching} />
    </div>
  );
});

OrdersPage.displayName = 'OrdersPage';
