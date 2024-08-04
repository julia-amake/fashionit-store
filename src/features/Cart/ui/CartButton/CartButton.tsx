import React, { memo, useCallback } from 'react';
import cn from 'clsx';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks';
import { Button, ButtonProps, ButtonSize } from 'src/shared/ui/Button';
import BugIcon from 'src/shared/assets/icons/Bag.svg';
import MinusIcon from 'src/shared/assets/icons/Minus.svg';
import PlusIcon from 'src/shared/assets/icons/Plus.svg';
import {
  addProductToCart,
  removeProductFromCart,
  selectCartItem,
} from '../../model/slices/CartSlice';
import s from './CartButton.module.scss';

interface CartButtonProps extends ButtonProps {
  id: string;
  size?: ButtonSize;
}

export const CartButton = memo(({ id, size = 's', disabled, className }: CartButtonProps) => {
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectCartItem(id));
  const { t } = useTranslation();

  const handleAddProduct = useCallback(() => {
    dispatch(addProductToCart(id));
  }, [dispatch, id]);

  const handleRemoveProduct = useCallback(() => {
    dispatch(removeProductFromCart(id));
  }, [dispatch, id]);

  const button = (() => (
    <Button label={t('В корзину')} full icon={BugIcon} size={size} onClick={handleAddProduct} />
  ))();

  const controls = (() => (
    <>
      <Button size={size} icon={MinusIcon} disabled={disabled} onClick={handleRemoveProduct} />
      <span className={s.count}>{product?.quantity || 0}</span>
      <Button size={size} icon={PlusIcon} disabled={disabled} onClick={handleAddProduct} />
    </>
  ))();

  return <div className={cn(s.outer, className)}>{product?.quantity > 0 ? controls : button}</div>;
});

CartButton.displayName = 'CartButton';
