import React, { memo, useCallback, useEffect } from 'react';
import cn from 'clsx';
import { useNavigate } from 'react-router-dom';
import { useFetchProfileQuery } from 'src/entities/Profile';
import { clearCart, selectCartProductsList } from 'src/features/Cart';
import { getRouteOrders } from 'src/shared/consts/router';
import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks';
import { Button } from 'src/shared/ui/Button';
import { Text } from 'src/shared/ui/Text';
import { useCreateOrderMutation } from '../../api/orderApi';
import s from './CreateOrder.module.scss';

interface CreateOrderProps {
  className?: string;
}

export const CreateOrder = memo(({ className }: CreateOrderProps) => {
  const [createOrder, { data, isLoading, error }] = useCreateOrderMutation();
  const products = useAppSelector(selectCartProductsList());
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    data: profile,
    error: profileError,
    isFetching,
  } = useFetchProfileQuery(undefined, { skip: !products.length });

  const handleClick = useCallback(() => {
    createOrder({ products });
  }, [createOrder, products]);

  useEffect(() => {
    if (!data) return;
    dispatch(clearCart());
    navigate(getRouteOrders());
  }, [data, dispatch, navigate]);

  if (!products.length || !profile || profileError || isFetching) return null;

  return (
    <div className={cn(className, s.outer)}>
      {error && (
        <Text size="s" color="error">
          {error as string}
        </Text>
      )}
      <Button className={s.btn} label="Оформить заказ" onClick={handleClick} disabled={isLoading} />
    </div>
  );
});

CreateOrder.displayName = 'CreateOrder';
