import { useCallback, useEffect } from 'react';
import { type SerializedError } from '@reduxjs/toolkit';
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useFormik } from 'formik';
import { useAppDispatch } from 'src/shared/lib/hooks/redux';
import { useSignInMutation, useSignUpRTKMutation } from '../../api/authApi';
import { login } from '../../model/slices/userSlice';
import { AuthFormValues } from '../../ui/AuthForm/AuthForm';
import { UserBarAuthMode } from '../../ui/UserBarAuth/UserBarAuthWithQuery';

const initialValues: AuthFormValues = {
  email: '',
  password: '',
};

export const useUserBarAuthWithQuery = (mode: UserBarAuthMode, onSubmit?: () => void) => {
  const [signIn, { data: signInData, error: signInError, isLoading: signInIsLoading }] =
    useSignInMutation();
  const [signUpRTK, { data: signUpData, error: signUpError, isLoading: signUpIsLoading }] =
    useSignUpRTKMutation();
  const dispatch = useAppDispatch();

  const isSignInMode = mode === 'signIn';

  const handleSubmit = useCallback(
    async (values: AuthFormValues) => {
      if (isSignInMode) {
        if (signInIsLoading) return;
        signIn(values);
        return;
      }

      if (signUpIsLoading) return;
      signUpRTK(values);
    },
    [isSignInMode, signInIsLoading, signIn, signUpIsLoading, signUpRTK]
  );

  const manager = useFormik<AuthFormValues>({
    initialValues,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    const formAction = (
      isLoading: boolean,
      err?: FetchBaseQueryError | SerializedError | undefined,
      token?: string
    ) => {
      if (isLoading) return;

      if (err) {
        manager.setStatus(err);
        return;
      }

      if (!token) return;

      dispatch(login(token));
      manager.resetForm({ values: initialValues });
      onSubmit?.();
    };

    isSignInMode
      ? formAction(signInIsLoading, signInError, signInData?.token)
      : formAction(signUpIsLoading, signUpError, signUpData?.token);

    // manager в зависимости вызовет переполнение стека
    // eslint-disable-next-line
  }, [isSignInMode, onSubmit, signInError, signInIsLoading, signUpError, signUpIsLoading]);

  return manager;
};
