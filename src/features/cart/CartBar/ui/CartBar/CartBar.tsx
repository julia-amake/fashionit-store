import React, { memo } from 'react';
import cn from 'clsx';
import { Link } from 'react-router-dom';
import { selectCartTotalCount } from 'src/entities/Cart';
import { ROUTER_PATHS } from 'src/shared/consts/router';
import { useAppSelector } from 'src/shared/lib/hooks/redux';
import CartIcon from 'src/shared/assets/icons/Bag.svg';
import s from './CartBar.module.scss';

interface CartBarProps {
  className?: string;
}

export const CartBar = memo(({ className }: CartBarProps) => {
  const count = useAppSelector(selectCartTotalCount);

  return (
    <Link to={ROUTER_PATHS.CART} className={cn(s.outer, className)}>
      <CartIcon className={s.pic} />
      {!!count && <div className={s.count}>{count}</div>}
    </Link>
  );
});

CartBar.displayName = 'CartBar';
