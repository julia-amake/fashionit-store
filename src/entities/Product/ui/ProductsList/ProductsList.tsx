import React, { memo, ReactElement } from 'react';
import cn from 'clsx';
import { useTranslation } from 'react-i18next';
import { Text } from 'src/shared/ui/Text/Text';
import { Product } from '../../model/types/productTypes';
import { ProductListItem } from '../ProductListItem';
import { ProductsListSkeleton } from './ProductsListSkeleton';
import s from './ProductsList.module.scss';

interface ProductsListProps {
  products: Product[] | null;
  isLoading?: boolean;
  className?: string;
  renderCartButton: (product: Product) => ReactElement;
}

export const ProductsList = memo(
  ({ products, isLoading = false, className, renderCartButton }: ProductsListProps) => {
    const { t } = useTranslation();

    return (
      <div className={cn(s.outer, className)}>
        {!products && isLoading && <ProductsListSkeleton count={4} />}

        {!products?.length && !isLoading && <Text>{t('В каталоге пусто')}</Text>}

        {products?.map((product) => (
          <ProductListItem product={product} renderCartButton={renderCartButton} key={product.id} />
        ))}
        {products && isLoading && <ProductsListSkeleton count={2} />}
      </div>
    );
  }
);

ProductsList.displayName = 'ProductList';
