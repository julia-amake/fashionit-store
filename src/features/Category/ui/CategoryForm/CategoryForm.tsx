import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { useFormik } from 'formik';
import { FormikHelpers } from 'formik/dist';
import { useFetchCategoryByIdQuery } from 'src/entities/Category/api/categoriesApi';
import { CategoryParams } from 'src/entities/Category/model/types/categoriesTypes';
import {
  useCreateCategoryMutation,
  useEditCategoryMutation,
} from 'src/features/Category/api/categoryMutationApi';
import { getValidates } from 'src/shared/lib/utils/validation/common';
import { Button } from 'src/shared/ui/Button';
import { FileUploader } from 'src/shared/ui/FileUploader';
import { Form } from 'src/shared/ui/Form';
import { Heading } from 'src/shared/ui/Heading';
import { Text } from 'src/shared/ui/Text';
import { TextField } from 'src/shared/ui/TextField';

type CategoryFormErrors = Record<keyof CategoryParams, string>;

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
  const [editCategory, { isLoading: editCategoryLoading, error: editCategoryError }] =
    useEditCategoryMutation();
  const [createCategory, { isLoading: createCategoryLoading, error: createCategoryError }] =
    useCreateCategoryMutation();

  const initialValues = useMemo(
    () => ({
      name: category?.name || '',
      photo: category?.photo || '',
    }),
    [category]
  );

  const onSubmit = useCallback(
    (values: CategoryParams, { resetForm }: FormikHelpers<CategoryParams>) => {
      console.log(values);
      id ? editCategory({ values, id }) : createCategory(values);
      resetForm({ values: initialValues });
      onSubmitAction?.();
    },
    [createCategory, editCategory, id, initialValues, onSubmitAction]
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
    submitForm,
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

  const { help: helpName } = getValidates(errors.name, touched.name, submitCount);

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
        {category ? `Редактировать ${category.name}` : 'Создать категорию'}
      </Heading>
      <TextField
        value={values.name}
        name="name"
        label="Название"
        required
        errorMessage={helpName}
        onBlur={handleBlur}
        onChange={handleChange}
        {...(category ? { defaultValue: category.name } : { autoFocus: true })}
      />
      <FileUploader pic={values.photo} picProportion="885/375" onUpload={handlePhotoUpdate} />
      {status && (
        <Text size="s" color="error">
          {status}
        </Text>
      )}
      <Button
        label="Сохранить"
        onClick={submitForm}
        disabled={categoryLoading || createCategoryLoading || editCategoryLoading}
      />
    </Form>
  );
});

CategoryForm.displayName = 'CategoryForm';
