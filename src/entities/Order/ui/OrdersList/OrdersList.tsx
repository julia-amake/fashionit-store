import React, { memo } from 'react';
import cn from 'clsx';
import { useTranslation } from 'react-i18next';
import { OrdersListItem } from 'src/entities/Order/ui/OrdersListItem/OrdersListItem';
import { OrdersListItemSkeleton } from 'src/entities/Order/ui/OrdersListItem/OrdersListItemSkeleton';
import { useAppearanceDelay } from 'src/shared/lib/hooks/useAppearanceDelay';
import { Order } from '../../model/types/orderTypes';
import s from './OrdersList.module.scss';

interface OrdersListProps {
  isLoading: boolean;
  orders?: Order[];
  className?: string;
}

export const OrdersList = memo(({ orders, isLoading, className }: OrdersListProps) => {
  const showSkeleton = useAppearanceDelay(isLoading, { defaultValue: true });
  const { t } = useTranslation();

  if (!orders?.length && !showSkeleton) return t('Вы еще не совершали заказов');

  return (
    <div className={cn(s.outer, className)}>
      {showSkeleton &&
        Array.from({ length: 10 }).map((_, idx) => <OrdersListItemSkeleton key={idx} />)}
      {!!orders?.length &&
        !showSkeleton &&
        orders.map((order) => <OrdersListItem order={order} key={order.id} />)}
    </div>
  );
});

OrdersList.displayName = 'OrdersList';
