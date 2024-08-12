import React from 'react';
import cn from 'clsx';
import { Skeleton } from 'src/shared/ui/Skeleton/Skeleton';
import s from './ProductDetails.module.scss';

export const ProductDetailsSkeleton = () => {
  return (
    <div className={s.outer}>
      <div className={s.pics}>
        {[1, 2].map((pic) => (
          <Skeleton className={cn(s.pic, s.pic_l)} key={pic} width={404} height={505} />
        ))}
      </div>
      <div className={s.info}>
        <Skeleton width="30%" height={12} marginBottom={13} />
        <Skeleton width="100%" height={24} marginBottom={7} />
        <Skeleton width="60%" height={24} marginBottom={12} />
        <Skeleton width="100%" height={14} marginBottom={14} />
        <Skeleton width="30%" height={16} marginBottom={21} />
        <Skeleton width="100%" height={44} />
      </div>
    </div>
  );
};
