import { useCallback, useEffect } from 'react';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks/redux';
import { isNotDefinedString } from 'src/shared/lib/utils/validation';
import { login } from '../../model/services/authThunks';
import { selectAuthError, selectAuthIsLoading, selectIsAuth } from '../../model/slices/authSlice';
import { AuthMode } from '../../model/types/authTypes';
import { AuthFormValues } from '../../ui/AuthForm/AuthForm';

const initialValues: AuthFormValues = {
  email: '',
  password: '',
};

type AuthFormErrors = Record<keyof AuthFormValues, string>;

const validate = (values: AuthFormValues) => {
  const errors = {} as AuthFormErrors;
  if (isNotDefinedString(values.email)) {
    errors.email = 'Обязательное поле';
  }
  if (isNotDefinedString(values.password)) {
    errors.password = 'Обязательное поле';
  }
  return errors;
};

export const useAuthFormManager = (mode: AuthMode, onSubmit?: () => void) => {
  const isLoading = useAppSelector(selectAuthIsLoading);
  const error = useAppSelector(selectAuthError);
  const isAuth = useAppSelector(selectIsAuth);
  const dispatch = useAppDispatch();

  const handleSubmit = useCallback(
    (values: AuthFormValues) => {
      if (isLoading) return;
      dispatch(login({ values, mode }));
    },
    [dispatch, isLoading, mode]
  );

  const manager = useFormik<AuthFormValues>({
    initialValues,
    onSubmit: handleSubmit,
    validate,
  });
  const { setStatus, resetForm } = manager;

  useEffect(() => {
    if (isLoading) return;

    if (error) {
      setStatus(error);
      return;
    }

    if (!isAuth) return;

    resetForm({ values: initialValues });
    onSubmit?.();
  }, [onSubmit, error, isLoading, setStatus, resetForm, dispatch, isAuth]);

  return manager;
};
