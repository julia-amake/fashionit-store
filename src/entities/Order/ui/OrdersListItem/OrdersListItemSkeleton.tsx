import React, { memo } from 'react';
import { Skeleton } from 'src/shared/ui/Skeleton/Skeleton';
import s from './OrdersListItem.module.scss';

interface OrdersListItemSkeletonProps {
  className?: string;
}

export const OrdersListItemSkeleton = memo(({ className }: OrdersListItemSkeletonProps) => {
  return (
    <div className={className}>
      <Skeleton className={s.title} width={450} height={22} />
      <Skeleton className={s.status} width={150} height={14} />
      <div className={s.products}>
        {Array.from({ length: 4 }).map((_, idx) => (
          <div className={s.product} key={idx}>
            <Skeleton className={s.pic} width={104} height={131} />
            <Skeleton width={104} height={13} marginBottom={8} />
            <Skeleton width={104} height={13} />
          </div>
        ))}
      </div>
    </div>
  );
});

OrdersListItemSkeleton.displayName = 'OrdersListItemSkeleton';
