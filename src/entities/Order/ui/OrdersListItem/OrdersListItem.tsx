import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTER_PATHS } from 'src/shared/consts/router';
import { formatDate } from 'src/shared/lib/utils/formatDate';
import { Heading } from 'src/shared/ui/Heading';
import { PicWrapper } from 'src/shared/ui/PicWrapper';
import { Text } from 'src/shared/ui/Text/Text';
import { Order, OrderStatus } from '../../model/types/orderTypes';
import s from './OrdersListItem.module.scss';

interface OrdersListItemProps {
  order: Order;
  className?: string;
}

export const OrdersListItem = memo(
  ({ order: { id, createdAt, status, products }, className }: OrdersListItemProps) => {
    const { t } = useTranslation();

    return (
      <div className={className}>
        <Heading className={s.title} as="h3" size="h6" weight="normal">
          {t('Заказ')} {id} {t('от')} {formatDate(createdAt)}
        </Heading>
        <div className={s.status}>{t(OrderStatus[status])}</div>
        <div className={s.products}>
          {products.map(({ product, quantity }, idx) =>
            product ? (
              <Link className={s.product} to={ROUTER_PATHS.PRODUCT(product.id)} key={product.id}>
                <PicWrapper className={s.pic} pic={product.photo} />
                <Text size="s">
                  {product.name} ({quantity}&nbsp;{t('шт')}.)
                </Text>
              </Link>
            ) : (
              <div className={s.product} key={idx}>
                <PicWrapper className={s.pic} />
                <Text size="s">
                  {t('Нет данных о товаре')} ({quantity}&nbsp;{t('шт')}.)
                </Text>
              </div>
            )
          )}
        </div>
      </div>
    );
  }
);

OrdersListItem.displayName = 'OrdersListItem';
