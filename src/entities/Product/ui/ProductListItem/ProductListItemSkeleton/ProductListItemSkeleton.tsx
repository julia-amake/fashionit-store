import React, { memo } from 'react';
import cn from 'clsx';
import { PicWrapperSkeleton } from 'src/shared/ui/PicWrapper';
import { Skeleton } from 'src/shared/ui/Skeleton';
import s from '../ProductListItem.module.scss';

interface ProductListItemSkeletonProps {
  className?: string;
}

export const ProductListItemSkeleton = memo((props: ProductListItemSkeletonProps) => {
  const { className } = props;

  return (
    <div className={cn(s.outer, className)}>
      <div className={s.picWrapper}>
        <PicWrapperSkeleton className={s.pic} />
      </div>
      <div className={s.content}>
        <div className={s.prices}>
          <Skeleton width={62} height={14} marginTop={2} marginBottom={4} className={s.price} />
        </div>
        <div className={s.about}>
          <Skeleton display="block" className={s.title} height={14} marginBottom={3} />
          <Skeleton display="block" className={s.title} height={14} />
        </div>
      </div>
      <Skeleton height={44} className={s.cart} />
    </div>
  );
});

ProductListItemSkeleton.displayName = 'ProductListItemSkeleton';
