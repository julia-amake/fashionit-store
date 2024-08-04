import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchProductByIdQuery } from 'src/entities/Product';
import { ProductDetails } from 'src/entities/Product/ui/ProductDetails';
import { CartButton } from 'src/features/Cart';
import { ProductActionsPanel } from 'src/widgets/ProductActionsPanel';
import s from './ProductDetailsPage.module.scss';

export const ProductDetailsPage = memo(() => {
  const { id } = useParams();
  const { data: product, isLoading, error } = useFetchProductByIdQuery(id || '', { skip: !id });

  if (isLoading) return 'Загружаем данные о товаре...';
  if (error) return error as string;
  if (!product) return 'Нет такого товара';

  const { name, price, category, desc, photo } = product;

  return (
    <div className={s.outer}>
      <ProductActionsPanel className={s.actions} id={id} />
      <ProductDetails
        title={name}
        price={price}
        category={category}
        desc={desc}
        {...(photo ? { pics: [photo] } : {})}
        cartBtn={<CartButton id={product.id} />}
      />
    </div>
  );
});

ProductDetailsPage.displayName = 'ProductDetailsPage';
