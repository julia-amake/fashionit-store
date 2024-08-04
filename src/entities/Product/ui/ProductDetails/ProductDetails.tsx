import React, { ReactElement } from 'react';
import cn from 'clsx';
import { Link } from 'react-router-dom';
import { Category } from 'src/entities/Product';
import { getRouteCategory } from 'src/shared/consts/router';
import { formatNumberToLocal } from 'src/shared/lib/utils';
import { Heading } from 'src/shared/ui/Heading';
import noImage from 'src/shared/assets/img/no-product.svg?url';
import s from './ProductDetails.module.scss';

interface ProductDetailsProps {
  title: string;
  desc?: string;
  price: number;
  pics?: string[];
  category: Category | null;
  cartBtn: ReactElement;
}

export const ProductDetails = ({
  title,
  desc,
  price,
  category,
  pics = [],
  cartBtn,
}: ProductDetailsProps) => {
  const renderImages = (() =>
    pics.map((pic, idx) => (
      <img className={cn(s.pic, idx < 2 ? s.pic_l : s.pic_s)} src={pic} alt="" key={pic} />
    )))();

  const renderPlaceholders = (() =>
    [1, 2].map((pic) => <img className={cn(s.pic, s.pic_l)} src={noImage} alt="" key={pic} />))();

  return (
    <div className={s.outer}>
      <div className={s.pics}>{pics?.length ? renderImages : renderPlaceholders}</div>
      <div className={s.info}>
        {category && (
          <Link to={getRouteCategory(category.id)} className={s.category}>
            {category.name}
          </Link>
        )}
        <Heading className={s.title} as="h1" size="h5">
          {title}
        </Heading>
        {desc && <p className={s.desc}>{desc}</p>}
        <div className={s.price}>{formatNumberToLocal(price)} руб.</div>
        <div className={s.cart}>{cartBtn}</div>
      </div>
    </div>
  );
};
