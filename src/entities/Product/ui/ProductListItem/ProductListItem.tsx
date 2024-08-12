import React, { memo, ReactElement } from 'react';
import cn from 'clsx';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTER_PATHS } from 'src/shared/consts/router';
import { formatNumberToLocal } from 'src/shared/lib/utils/formatNumberToLocal';
import { PicWrapper } from 'src/shared/ui/PicWrapper';
import { Product } from '../../model/types/productTypes';
import s from './ProductListItem.module.scss';

export interface ProductListItemProps {
  product: Product;
  className?: string;
  renderCartButton: (product: Product) => ReactElement;
}

export const ProductListItem = memo(
  ({ product, className, renderCartButton }: ProductListItemProps) => {
    const { name, desc, photo, price, oldPrice } = product;
    const { t } = useTranslation();

    return (
      <article className={cn(s.outer, className)}>
        <div className={s.picWrapper}>
          <Link to={ROUTER_PATHS.PRODUCT(product.id)}>
            <PicWrapper className={s.pic} pic={photo} alt={name} />
          </Link>
        </div>
        <div className={s.content}>
          <div className={s.prices}>
            <ins className={s.price}>
              {formatNumberToLocal(price)} {t('руб')}.
            </ins>
            {oldPrice && (
              <del className={s.oldPrice}>
                {formatNumberToLocal(oldPrice)} {t('руб')}.
              </del>
            )}
          </div>
          <div className={s.about}>
            <h3 className={s.title}>{name}</h3>
            {desc && <p className={s.desc}>&nbsp;— {desc}</p>}
          </div>
        </div>
        <div className={s.cart}>{renderCartButton(product)}</div>
      </article>
    );
  }
);

ProductListItem.displayName = 'ProductListItem';
