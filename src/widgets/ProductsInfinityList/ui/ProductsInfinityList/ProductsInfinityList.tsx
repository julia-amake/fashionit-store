import React, { memo, useCallback, useRef } from 'react';
import {
  Product,
  ProductsList,
  selectCatalogError,
  selectCatalogFilter,
  selectCatalogHasMore,
  selectCatalogProducts,
  setCurrentPage,
  useFetchProductsQuery,
} from 'src/entities/Product';
import { CartButton } from 'src/features/cart/CartButton';
import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks/redux';
import { useInfiniteScroll } from 'src/shared/lib/hooks/useInfiniteScroll';
import { Text } from 'src/shared/ui/Text/Text';
import s from './ProductsInfinityList.module.scss';

interface ProductsInfinityListProps {
  className?: string;
}

export const ProductsInfinityList = memo(({ className }: ProductsInfinityListProps) => {
  const products = useAppSelector(selectCatalogProducts);
  const error = useAppSelector(selectCatalogError);
  const filter = useAppSelector(selectCatalogFilter);
  const hasMore = useAppSelector(selectCatalogHasMore);
  const dispatch = useAppDispatch();

  const { isFetching } = useFetchProductsQuery(filter);

  const handleLoadMore = useCallback(() => dispatch(setCurrentPage()), [dispatch]);

  const triggerRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useInfiniteScroll({ triggerRef, wrapperRef, action: handleLoadMore });

  const renderCartButton = useCallback((product: Product) => <CartButton product={product} />, []);

  if (error && !products?.length)
    return (
      <Text className={className} color="error">
        {error}
      </Text>
    );

  return (
    <div className={className} ref={wrapperRef}>
      <ProductsList
        className={s.list}
        products={products}
        isLoading={isFetching}
        renderCartButton={renderCartButton}
      />
      {error && <Text color="error">{error}</Text>}

      {hasMore && !isFetching && !error && <div ref={triggerRef} className={s.trigger} />}
    </div>
  );
});

ProductsInfinityList.displayName = 'ProductsInfinityList';
