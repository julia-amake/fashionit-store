import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { useFormik } from 'formik';
import { FormikHelpers } from 'formik/dist';
import { useTranslation } from 'react-i18next';
import {
  CategoryParams,
  useCreateCategoryMutation,
  useEditCategoryMutation,
  useFetchCategoryByIdQuery,
} from 'src/entities/Category';
import { resetCatalog } from 'src/entities/Product';
import { useAppDispatch } from 'src/shared/lib/hooks/redux';
import { getTouchedError } from 'src/shared/lib/utils/validation';
import { Button } from 'src/shared/ui/Button';
import { FileUploader } from 'src/shared/ui/FileUploader';
import { Form } from 'src/shared/ui/Form';
import { Heading } from 'src/shared/ui/Heading';
import { Text } from 'src/shared/ui/Text/Text';
import { TextField } from 'src/shared/ui/TextField/TextField';

interface CategoryFormProps {
  id?: string;
  onSubmitAction?: () => void;
  className?: string;
}

export const CategoryForm = memo(({ onSubmitAction, id, className }: CategoryFormProps) => {
  const {
    data: category,
    isLoading: categoryLoading,
    error: categoryError,
  } = useFetchCategoryByIdQuery(id || '', { skip: !id });

  const [createCategory, { isLoading: createCategoryLoading, error: createCategoryError }] =
    useCreateCategoryMutation();

  const [editCategory, { isLoading: editCategoryLoading }] = useEditCategoryMutation();

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const initialValues = useMemo(
    () => ({
      name: category?.name || '',
      photo: category?.photo || '',
    }),
    [category]
  );

  const onSubmit = useCallback(
    (values: CategoryParams, { resetForm }: FormikHelpers<CategoryParams>) => {
      id ? editCategory({ values, id }) : createCategory(values);
      resetForm({ values: initialValues });
      dispatch(resetCatalog());
      onSubmitAction?.();
    },
    [createCategory, dispatch, editCategory, id, initialValues, onSubmitAction]
  );

  const formManager = useFormik<CategoryParams>({
    initialValues,
    onSubmit,
    enableReinitialize: true,
  });

  const {
    values,
    status,
    setStatus,
    touched,
    errors,
    submitCount,
    handleBlur,
    handleSubmit,
    handleChange,
    setFieldValue,
  } = formManager;

  useEffect(() => {
    if (createCategoryError) setStatus(createCategoryError);
  }, [createCategoryError, setStatus]);

  const handlePhotoUpdate = useCallback(
    (photo: string) => {
      setFieldValue('photo', photo);
    },
    [setFieldValue]
  );

  if (categoryLoading) return <Text>Загружаем данные категории...</Text>;
  if (categoryError) return <Text>{categoryError as string}</Text>;

  return (
    <Form onSubmit={handleSubmit} className={className}>
      <Heading as="h1" size="h5">
        {category ? `${t('Редактировать')} ${category.name}` : t('Добавить категорию')}
      </Heading>
      <TextField
        value={values.name}
        name="name"
        label={t('Название*')}
        required
        errorMessage={getTouchedError(submitCount, errors.name, touched.name)}
        onBlur={handleBlur}
        onChange={handleChange}
        {...(category ? { defaultValue: category.name } : { autoFocus: true })}
      />
      <FileUploader pic={values.photo} picProportion="885/375" onUpload={handlePhotoUpdate} />
      {status && (
        <Text size="xs" color="error">
          {status}
        </Text>
      )}
      <Button
        type="submit"
        disabled={categoryLoading || createCategoryLoading || editCategoryLoading}
      >
        {t('Сохранить')}
      </Button>
    </Form>
  );
});

CategoryForm.displayName = 'CategoryForm';
