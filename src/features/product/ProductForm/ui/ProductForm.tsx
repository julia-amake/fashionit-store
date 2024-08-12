import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetchProductByIdQuery } from 'src/entities/Product';
import { getTouchedError } from 'src/shared/lib/utils/validation';
import { Button } from 'src/shared/ui/Button';
import { FileUploader } from 'src/shared/ui/FileUploader';
import { Form } from 'src/shared/ui/Form';
import { Heading } from 'src/shared/ui/Heading';
import { Text } from 'src/shared/ui/Text/Text';
import { TextField } from 'src/shared/ui/TextField/TextField';
import { useProductFormManager } from '../lib/hooks/useProductFormManager';
import { ProductCategorySelect } from './ProductCategorySelect';

interface ProductFormProps {
  id?: string;
  onSubmitAction?: () => void;
  className?: string;
}

export const ProductForm = memo(({ onSubmitAction, id, className }: ProductFormProps) => {
  const { data: product, isLoading, error } = useFetchProductByIdQuery(id || '', { skip: !id });

  const {
    values,
    setFieldValue,
    isSubmitting,
    touched,
    errors,
    submitCount,
    handleBlur,
    handleSubmit,
    handleChange,
    status,
  } = useProductFormManager(id, product, onSubmitAction);

  const { t } = useTranslation();

  const handlePhotoUpdate = useCallback(
    (photo: string) => {
      setFieldValue('photo', photo);
    },
    [setFieldValue]
  );

  if (isLoading) return null;
  if (error) return <Text>{error as string}</Text>;

  return (
    <Form className={className} onSubmit={handleSubmit}>
      <Heading as="h1" size="h5">
        {product ? `${t('Редактировать')} ${product.name}` : t('Добавить товар')}
      </Heading>
      <TextField
        value={values.name}
        name="name"
        label={`${t('Название')}*`}
        required
        onBlur={handleBlur}
        onChange={handleChange}
        errorMessage={getTouchedError(submitCount, errors.name, touched.name)}
        autoFocus={!product}
      />
      <TextField
        value={values.desc}
        name="desc"
        label={t('Описание')}
        onBlur={handleBlur}
        onChange={handleChange}
        errorMessage={getTouchedError(submitCount, errors.desc, touched.desc)}
      />
      <FileUploader pic={values.photo} picProportion="922/1154" onUpload={handlePhotoUpdate} />
      <ProductCategorySelect
        name="categoryId"
        required
        touched={!!touched.categoryId}
        errorMessage={errors.categoryId}
        submitCount={submitCount}
        onChange={handleChange}
        value={values.categoryId}
      />
      <TextField
        value={values.price || ''}
        name="price"
        label={`${t('Цена')}*`}
        type="number"
        required
        onBlur={handleBlur}
        onChange={handleChange}
        errorMessage={getTouchedError(submitCount, errors.price, touched.price)}
      />
      <TextField
        value={values.oldPrice || ''}
        name="oldPrice"
        label={t('Старая цена')}
        type="number"
        onBlur={handleBlur}
        onChange={handleChange}
        errorMessage={getTouchedError(submitCount, errors.oldPrice, touched.oldPrice)}
      />
      {status && (
        <Text size="xs" color="error">
          {status}
        </Text>
      )}
      <Button type="submit" disabled={isLoading || isSubmitting}>
        {t('Сохранить')}
      </Button>
    </Form>
  );
});

ProductForm.displayName = 'ProductForm';
