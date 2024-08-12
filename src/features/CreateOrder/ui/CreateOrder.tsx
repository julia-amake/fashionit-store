import React, { memo, useCallback, useEffect } from 'react';
import cn from 'clsx';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { cartSelector, resetCart } from 'src/entities/Cart';
import { useCreateOrderMutation } from 'src/entities/Order';
import { ROUTER_PATHS } from 'src/shared/consts/router';
import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks/redux';
import { Button } from 'src/shared/ui/Button';
import { Text } from 'src/shared/ui/Text/Text';
import s from './CreateOrder.module.scss';

interface CreateOrderProps {
  className?: string;
}

export const CreateOrder = memo(({ className }: CreateOrderProps) => {
  const [createOrder, { data, isLoading, error }] = useCreateOrderMutation();
  const products = useAppSelector(cartSelector.selectAll);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = useCallback(() => {
    createOrder({ products });
  }, [createOrder, products]);

  useEffect(() => {
    if (!data || error) return;
    navigate(ROUTER_PATHS.ORDERS);
    dispatch(resetCart());
  }, [data, dispatch, error, navigate]);

  if (!products.length) return null;

  return (
    <div className={cn(className, s.outer)}>
      {error && (
        <Text size="xs" color="error">
          {error as string}
        </Text>
      )}
      <Button className={s.btn} onClick={handleClick} disabled={isLoading}>
        {t('Оформить заказ')}
      </Button>
    </div>
  );
});

CreateOrder.displayName = 'CreateOrder';
