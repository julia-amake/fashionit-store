import React, { memo, ReactNode } from 'react';
import cn from 'clsx';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTER_PATHS } from 'src/shared/consts/router';
import { formatNumberToLocal } from 'src/shared/lib/utils/formatNumberToLocal';
import { PicWrapper } from 'src/shared/ui/PicWrapper';
import { CartProductFull } from '../../model/types/cartTypes';
import s from './CartItem.module.scss';

export interface CartItemProps
  extends Pick<
    CartProductFull,
    'id' | 'name' | 'desc' | 'quantity' | 'price' | 'oldPrice' | 'photo'
  > {
  removeButton: ReactNode;
  className?: string;
}

export const CartItem = memo(
  ({
    id,
    name,
    desc,
    quantity,
    price,
    oldPrice,
    photo,
    removeButton,
    className,
  }: CartItemProps) => {
    const { t } = useTranslation();

    return (
      <div className={cn(s.outer, className)}>
        <Link className={s.about} to={ROUTER_PATHS.PRODUCT(id)}>
          <PicWrapper className={s.pic} pic={photo} />
          <div className={s.info}>
            <p className={s.title}>{name}</p>
            {desc && <p className={s.desc}>{desc}</p>}
          </div>
        </Link>
        <div className={s.count}>{quantity}</div>
        <div className={s.prices}>
          {!!oldPrice && (
            <div className={s.oldPrice}>
              {formatNumberToLocal(oldPrice * quantity)} {t('руб')}.
            </div>
          )}
          <div className={s.price}>
            {formatNumberToLocal(price * quantity)} {t('руб')}.
          </div>
        </div>
        {removeButton}
      </div>
    );
  }
);

CartItem.displayName = 'CartItem';
