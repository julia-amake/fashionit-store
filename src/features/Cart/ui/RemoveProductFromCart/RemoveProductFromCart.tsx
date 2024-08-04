import React, { memo } from 'react';
import cn from 'clsx';
import { useAppDispatch } from 'src/shared/lib/hooks';
import { Button } from 'src/shared/ui/Button';
import RemoveIcon from 'src/shared/assets/icons/Trash.svg';
import { removeProductFromCart } from '../../model/slices/CartSlice';
import s from './RemoveProductFromCart.module.scss';

interface RemoveProductFromCartProps {
  id: string;
  removeAll?: boolean;
  className?: string;
}

export const RemoveProductFromCart = memo(
  ({ id, removeAll = false, className }: RemoveProductFromCartProps) => {
    const dispatch = useAppDispatch();
    const handleRemove = () => {
      dispatch(removeProductFromCart(id, removeAll));
    };

    return (
      <Button
        className={cn(s.outer, className)}
        icon={RemoveIcon}
        variant="clean"
        size="xs"
        onClick={handleRemove}
      />
    );
  }
);

RemoveProductFromCart.displayName = 'RemoveProductFromCart';
