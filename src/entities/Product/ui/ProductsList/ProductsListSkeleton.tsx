import React, { memo } from 'react';
import { ProductListItemSkeleton } from '../ProductListItem';

interface ProductsListSkeletonProps {
  count: number;
}

export const ProductsListSkeleton = memo(({ count }: ProductsListSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <ProductListItemSkeleton key={idx} />
      ))}
    </>
  );
});

ProductsListSkeleton.displayName = 'ProductsListSkeleton';
