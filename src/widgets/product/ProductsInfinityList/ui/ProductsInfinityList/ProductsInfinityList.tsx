import React, { memo, useCallback, useRef } from 'react';
import {
  ProductsList,
  selectCatalogFilter,
  selectCatalogHasMore,
  selectCatalogProducts,
  setCurrentPage,
  useFetchProductsQuery,
} from 'src/entities/Product';
import { CartButton } from 'src/features/Cart';
import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks/redux';
import { useInfiniteScroll } from 'src/shared/lib/hooks/useInfiniteScroll';
import { Button } from 'src/shared/ui/Button';
import s from '../../styles/ProductsInfinityList.module.scss';

interface ProductsInfinityListProps {
  className?: string;
}

export const ProductsInfinityList = memo(({ className }: ProductsInfinityListProps) => {
  const products = useAppSelector(selectCatalogProducts);
  const filter = useAppSelector(selectCatalogFilter);
  const { error, isFetching } = useFetchProductsQuery(filter);
  const hasMore = useAppSelector(selectCatalogHasMore);
  const dispatch = useAppDispatch();

  const handleLoadMore = useCallback(() => dispatch(setCurrentPage()), [dispatch]);

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useInfiniteScroll({ triggerRef, wrapperRef, action: handleLoadMore });

  if (error) return error as string;

  return (
    <div className={className} ref={wrapperRef}>
      <ProductsList
        className={s.list}
        products={products}
        isLoading={isFetching}
        renderCartButton={(id: string) => <CartButton id={id} />}
      />
      {hasMore && !isFetching && products && (
        <Button
          className={s.button}
          variant="secondary"
          size="m"
          disabled={isFetching}
          ref={triggerRef}
          onClick={handleLoadMore}
        >
          Показать еще
        </Button>
      )}
    </div>
  );
});

ProductsInfinityList.displayName = 'ProductsInfinityList';
