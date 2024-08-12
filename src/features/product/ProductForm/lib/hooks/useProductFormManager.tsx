import { useCallback, useEffect, useMemo } from 'react';
import { useFormik } from 'formik';
import { updateCartProduct } from 'src/entities/Cart';
import { Product, ProductParams, useCreateUpdateProductMutation } from 'src/entities/Product';
import { useAppDispatch } from 'src/shared/lib/hooks/redux';
import { validate } from '../utils/validateProductForm';

export const useProductFormManager = (id?: string, product?: Product, action?: () => void) => {
  const [editProduct, { data: updatedProduct, error }] = useCreateUpdateProductMutation();
  const dispatch = useAppDispatch();

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

  const onSubmit = useCallback(
    (values: ProductParams) => {
      editProduct({ values, id });
    },
    [editProduct, id]
  );

  const formManager = useFormik<ProductParams>({
    initialValues,
    onSubmit,
    validate,
    enableReinitialize: true,
  });
  const { setStatus, resetForm } = formManager;

  useEffect(() => {
    if (error) setStatus(error);
  }, [error, setStatus]);

  useEffect(() => {
    if (!updatedProduct) return;

    resetForm({ values: initialValues });
    action?.();
    dispatch(updateCartProduct(updatedProduct));
  }, [action, dispatch, initialValues, resetForm, updatedProduct]);

  return formManager;
};
