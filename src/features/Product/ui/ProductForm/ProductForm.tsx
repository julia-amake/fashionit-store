import React, { memo, useEffect, useMemo } from 'react';
import { useFormik } from 'formik/dist';
import { useFetchProductByIdQuery } from 'src/entities/Product';
import { ProductParams } from 'src/entities/Product/model/types/productTypes';
import { Button } from 'src/shared/ui/Button';
import { Form } from 'src/shared/ui/Form';
import { Heading } from 'src/shared/ui/Heading';
import { Text } from 'src/shared/ui/Text';
import { useCreateUpdateProductMutation } from '../../api/productMutationApi';
import { validate } from '../../lib/utils/validateProductForm';
import { ProductCategorySelect } from '../ProductCategorySelect';
import { ProductField } from '../ProductField';

interface ProductFormProps {
  id?: string;
  onSubmitAction?: () => void;
  className?: string;
}

export const ProductForm = memo(({ onSubmitAction, id, className }: ProductFormProps) => {
  const {
    data: product,
    isLoading: productIsLoading,
    error: productError,
  } = useFetchProductByIdQuery(id || '', { skip: !id });
  const [
    editProduct,
    { data: editProductData, isLoading: editProductIsLoading, error: editProductError },
  ] = useCreateUpdateProductMutation();

  const initialValues: ProductParams = useMemo(
    () => ({
      name: product?.name || '',
      desc: product?.desc || '',
      photo: product?.photo || '',
      price: product?.price || 0,
      oldPrice: product?.oldPrice || undefined,
      categoryId: product?.category?.id || '',
    }),
    [product]
  );

  const onSubmit = (values: ProductParams) => {
    editProduct({ values, id });
  };

  const formManager = useFormik<ProductParams>({
    initialValues,
    onSubmit,
    validate,
    enableReinitialize: true,
  });

  const {
    values,
    submitForm,
    touched,
    errors,
    submitCount,
    handleBlur,
    handleSubmit,
    handleChange,
    setStatus,
    status,
    resetForm,
  } = formManager;

  useEffect(() => {
    if (editProductError) setStatus(editProductError);
  }, [editProductError, setStatus]);

  useEffect(() => {
    if (editProductData) {
      resetForm({ values: initialValues });
      onSubmitAction?.();
    }
  }, [editProductData, initialValues, onSubmitAction, resetForm]);

  if (productIsLoading) return null;
  if (productError) return <Text>{productError as string}</Text>;

  return (
    <Form onSubmit={handleSubmit} className={className}>
      <Heading as="h1" size="h5">
        {product ? `Редактировать ${product.name}` : 'Создать товар'}
      </Heading>
      <ProductField
        value={values.name}
        name="name"
        label="Название"
        required
        touched={!!touched.name}
        errorMessage={errors.name}
        submitCount={submitCount}
        onBlur={handleBlur}
        onChange={handleChange}
        {...(product ? { defaultValue: product.name } : { autoFocus: true })}
      />
      <ProductField
        value={values.desc}
        name="desc"
        label="Описание"
        required
        touched={!!touched.desc}
        errorMessage={errors.desc}
        submitCount={submitCount}
        onBlur={handleBlur}
        onChange={handleChange}
        {...(product ? { defaultValue: product.desc } : {})}
      />
      <ProductField
        value={values.photo}
        name="photo"
        label="Изображение"
        required
        touched={!!touched.photo}
        errorMessage={errors.photo}
        submitCount={submitCount}
        onBlur={handleBlur}
        onChange={handleChange}
        {...(product ? { defaultValue: product.photo } : {})}
      />
      <ProductCategorySelect
        name="categoryId"
        required
        touched={!!touched.categoryId}
        errorMessage={errors.categoryId}
        submitCount={submitCount}
        onChange={handleChange}
        value={values.categoryId}
      />
      <ProductField
        value={values.price || ''}
        name="price"
        label="Цена"
        type="number"
        required
        touched={!!touched.price}
        errorMessage={errors.price}
        submitCount={submitCount}
        onBlur={handleBlur}
        onChange={handleChange}
        {...(product ? { defaultValue: String(product.price || '') } : {})}
      />
      <ProductField
        value={values.oldPrice || ''}
        name="oldPrice"
        label="Старая цена"
        type="number"
        required
        touched={!!touched.oldPrice}
        errorMessage={errors.oldPrice}
        submitCount={submitCount}
        onBlur={handleBlur}
        onChange={handleChange}
        {...(product ? { defaultValue: String(product.oldPrice || '') } : {})}
      />
      {status && (
        <Text size="s" color="error">
          {status}
        </Text>
      )}
      <Button
        label="Сохранить"
        onClick={submitForm}
        disabled={productIsLoading || editProductIsLoading}
      />
    </Form>
  );
});

ProductForm.displayName = 'ProductForm';
