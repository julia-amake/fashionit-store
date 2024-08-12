import React, { memo, useCallback } from 'react';
import cn from 'clsx';
import { useTranslation } from 'react-i18next';
import { addProductToCart, removeProductFromCart, selectCartProductById } from 'src/entities/Cart';
import { Product } from 'src/entities/Product';
import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks/redux';
import { Button, ButtonProps, ButtonSize } from 'src/shared/ui/Button';
import BugIcon from 'src/shared/assets/icons/Bag.svg';
import MinusIcon from 'src/shared/assets/icons/Minus.svg';
import PlusIcon from 'src/shared/assets/icons/Plus.svg';
import s from './CartButton.module.scss';

interface CartButtonProps extends ButtonProps {
  product: Product;
  size?: ButtonSize;
}

export const CartButton = memo(({ product, size = 's', disabled, className }: CartButtonProps) => {
  const { id } = product;
  const dispatch = useAppDispatch();
  const cartProduct = useAppSelector(selectCartProductById(id));
  const { t } = useTranslation();

  const quantity = cartProduct?.quantity || 0;

  const handleAddProduct = useCallback(() => {
    dispatch(addProductToCart(product));
  }, [dispatch, product]);

  const handleRemoveProduct = useCallback(() => {
    dispatch(removeProductFromCart({ id, count: 'one' }));
  }, [dispatch, id]);

  const button = (() => (
    <Button full icon={BugIcon} size={size} onClick={handleAddProduct}>
      {t('В корзину')}
    </Button>
  ))();

  const controls = (() => (
    <>
      <Button size={size} icon={MinusIcon} disabled={disabled} onClick={handleRemoveProduct} />
      <span className={s.count}>{quantity}</span>
      <Button size={size} icon={PlusIcon} disabled={disabled} onClick={handleAddProduct} />
    </>
  ))();

  return <div className={cn(s.outer, className)}>{quantity > 0 ? controls : button}</div>;
});

CartButton.displayName = 'CartButton';
