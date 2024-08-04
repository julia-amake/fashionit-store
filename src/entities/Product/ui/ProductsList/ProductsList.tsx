import React, { memo, ReactElement } from 'react';
import cn from 'clsx';
import { Product } from 'src/entities/Product';
import { ProductListItem, ProductListItemSkeleton } from '../ProductListItem';
import s from './ProductsList.module.scss';

interface ProductsListProps {
  products: Product[] | null;
  isLoading?: boolean;
  className?: string;
  renderCartButton: (id: string) => ReactElement;
}

export const ProductsList = memo(
  ({ products, isLoading = false, className, renderCartButton }: ProductsListProps) => {
    if (!products?.length && !isLoading) return 'Товары не найдены';

    return (
      <div className={cn(s.outer, className)}>
        {products?.map((product) => (
          <ProductListItem product={product} renderCartButton={renderCartButton} key={product.id} />
        ))}
        {isLoading &&
          Array.from({ length: 8 }).map((_, idx) => <ProductListItemSkeleton key={idx} />)}
      </div>
    );
  }
);

ProductsList.displayName = 'ProductList';
