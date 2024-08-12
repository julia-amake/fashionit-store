import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ProductDetails, useFetchProductByIdQuery } from 'src/entities/Product';
import { ProductDetailsSkeleton } from 'src/entities/Product/ui/ProductDetails/ProductDetailsSkeleton';
import { CartButton } from 'src/features/cart/CartButton';
import { useAppearanceDelay } from 'src/shared/lib/hooks/useAppearanceDelay';
import { ProductActionsPanel } from 'src/widgets/ProductActionsPanel';
import s from './ProductDetailsPage.module.scss';

export const ProductDetailsPage = memo(() => {
  const { id } = useParams();
  const { data: product, isLoading, error } = useFetchProductByIdQuery(id || '', { skip: !id });
  const showSkeleton = useAppearanceDelay(isLoading, { defaultValue: true });
  const { t } = useTranslation();

  if (showSkeleton) return <ProductDetailsSkeleton />;
  if (error) return error as string;
  if (!product) return t('Такого товара не существует');

  const { name, price, category, desc, photo } = product;

  return (
    <div>
      <ProductActionsPanel className={s.actions} id={id} />
      <ProductDetails
        title={name}
        price={price}
        category={category}
        desc={desc}
        {...(photo ? { pics: [photo] } : {})}
        cartBtn={<CartButton product={product} />}
      />
    </div>
  );
});

ProductDetailsPage.displayName = 'ProductDetailsPage';
