import React, { memo, useCallback } from 'react';
import cn from 'clsx';
import { removeProductFromCart } from 'src/entities/Cart';
import { useAppDispatch } from 'src/shared/lib/hooks/redux';
import { Button } from 'src/shared/ui/Button';
import RemoveIcon from 'src/shared/assets/icons/Trash.svg';
import s from './RemoveProductFromCart.module.scss';

interface RemoveProductFromCartProps {
  id: string;
  count?: 'all' | 'one';
  className?: string;
}

export const RemoveProductFromCart = memo(
  ({ id, count = 'one', className }: RemoveProductFromCartProps) => {
    const dispatch = useAppDispatch();

    const handleRemove = useCallback(() => {
      dispatch(removeProductFromCart({ id, count }));
    }, [count, dispatch, id]);

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
