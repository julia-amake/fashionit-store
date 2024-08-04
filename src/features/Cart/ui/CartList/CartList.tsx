import React, { memo } from 'react';
import cn from 'clsx';
import { Product } from 'src/entities/Product';
import { useAppSelector } from 'src/shared/lib/hooks';
import { useFetchCartProductsQuery } from '../../api/cartApi';
import { selectCartIds, selectCartProducts } from '../../model/slices/CartSlice';
import { CartItem } from '../CartItem';
import s from './CartList.module.scss';

interface CartListProps {
  className?: string;
}

export const CartList = memo(({ className }: CartListProps) => {
  const cartProducts = useAppSelector(selectCartProducts);
  const cartProductsIds = useAppSelector(selectCartIds);

  const {
    data: products,
    isFetching,
    error,
  } = useFetchCartProductsQuery({ ids: cartProductsIds }, { skip: !cartProductsIds.length });

  const cartItem = ({ id, name, desc, price, photo }: Product) => {
    const product = cartProducts[id];

    return product ? (
      <CartItem
        id={id}
        title={name}
        desc={desc}
        count={product.quantity}
        price={price}
        pic={photo}
        key={id}
      />
    ) : null;
  };

  if (!cartProductsIds.length) return 'В корзине ничего нет';
  if (isFetching) return null;
  if (error || !products?.data || products?.data.length !== cartProductsIds.length)
    return (error as string) || 'Ошибка при загрузке товаров';

  return (
    <div className={cn(s.outer, className)}>{products.data?.map((item) => cartItem(item))}</div>
  );
});

CartList.displayName = 'CartList';
