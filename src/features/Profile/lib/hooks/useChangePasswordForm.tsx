import { useEffect } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { isNotDefinedString } from 'src/shared/lib/utils/validation/common';
import { useChangePasswordMutation } from '../../api/changePasswordApi';
import { ChangePasswordFormValues } from '../../ui/ChangePasswordForm/ChangePasswordForm';

export type ChangePasswordFormErrors = Record<keyof ChangePasswordFormValues, string>;

const initialValues = {
  password: '',
  newPassword: '',
  repeatPassword: '',
};

export const useChangePasswordForm = () => {
  const [changePassword, { data, error, isLoading }] = useChangePasswordMutation();
  const { t } = useTranslation();

  const validate = (values: ChangePasswordFormValues) => {
    const errors = {} as ChangePasswordFormErrors;
    if (isNotDefinedString(values.password)) {
      errors.password = t('Обязательное поле');
    }
    if (isNotDefinedString(values.newPassword)) {
      errors.newPassword = t('Обязательное поле');
    }
    if (isNotDefinedString(values.repeatPassword)) {
      errors.repeatPassword = t('Обязательное поле');
    }
    if (values.repeatPassword !== values.newPassword) {
      errors.newPassword = t('Пароли не совпадают');
      errors.repeatPassword = t('Пароли не совпадают');
    }
    return errors;
  };

  const onSubmit = ({ password, newPassword }: ChangePasswordFormValues) => {
    changePassword({ password, newPassword });
  };

  const manager = useFormik<ChangePasswordFormValues>({
    initialValues,
    onSubmit,
    validate,
  });

  const { setStatus, resetForm } = manager;

  useEffect(() => {
    if (data?.success) resetForm({ values: initialValues });
  }, [data?.success, resetForm]);

  useEffect(() => {
    if (error) setStatus(error);
  }, [error, setStatus]);

  return { ...manager, isLoading };
};
