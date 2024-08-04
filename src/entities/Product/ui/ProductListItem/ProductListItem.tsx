import React, { memo, ReactElement } from 'react';
import cn from 'clsx';
import { Link } from 'react-router-dom';
import { Product } from 'src/entities/Product';
import { getRouteProduct } from 'src/shared/consts/router';
import { formatNumberToLocal } from 'src/shared/lib/utils';
import { PicWrapper } from 'src/shared/ui/PicWrapper';
import s from './ProductListItem.module.scss';

export interface ProductListItemProps {
  product: Product;
  className?: string;
  renderCartButton: (id: string) => ReactElement;
}

export const ProductListItem = memo(
  ({ product, className, renderCartButton }: ProductListItemProps) => {
    const { name, desc, photo, price, oldPrice } = product;

    return (
      <article className={cn(s.outer, className)}>
        <div className={s.picWrapper}>
          <Link to={getRouteProduct(product.id)}>
            <PicWrapper className={s.pic} pic={photo} alt={name} />
          </Link>
        </div>
        <div className={s.content}>
          <div className={s.prices}>
            <ins className={s.price}>{formatNumberToLocal(price)} руб.</ins>
            {oldPrice && <del className={s.oldPrice}>{formatNumberToLocal(oldPrice)} руб.</del>}
          </div>
          <div className={s.about}>
            <h3 className={s.title}>{name}</h3>
            {desc && <p className={s.desc}>&nbsp;— {desc}</p>}
          </div>
        </div>
        <div className={s.cart}>{renderCartButton(product.id)}</div>
      </article>
    );
  }
);

ProductListItem.displayName = 'ProductListItem';
