import React, { ChangeEvent, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { getTouchedError } from 'src/shared/lib/utils/validation';
import { FormProps } from 'src/shared/types/formTypes';
import { Button } from 'src/shared/ui/Button';
import { Form } from 'src/shared/ui/Form';
import { Heading } from 'src/shared/ui/Heading';
import { Text } from 'src/shared/ui/Text/Text';
import { TextField } from 'src/shared/ui/TextField/TextField';
import { useChangePasswordForm } from '../lib/hooks/useChangePasswordForm';

export interface ChangePasswordFormValues {
  password: string;
  newPassword: string;
  repeatPassword: string;
}

type ChangePasswordFormProps = FormProps<ChangePasswordFormValues>;

export const ChangePasswordForm = memo(({ className }: ChangePasswordFormProps) => {
  const {
    values,
    touched,
    errors,
    submitCount,
    handleBlur,
    handleSubmit,
    handleChange,
    status,
    setStatus,
    isLoading,
  } = useChangePasswordForm();

  const { t } = useTranslation();

  const handleInputChange = useCallback(
    (e: ChangeEvent) => {
      setStatus('');
      handleChange(e);
    },
    [handleChange, setStatus]
  );

  return (
    <Form className={className} onSubmit={handleSubmit}>
      <Heading as="h2" size="h5">
        {t('Изменить пароль')}
      </Heading>
      <TextField
        value={values.password}
        name="password"
        onChange={handleInputChange}
        onBlur={handleBlur}
        label={`${t('Введите текущий пароль')}*`}
        required
        errorMessage={getTouchedError(submitCount, errors.password, touched.password)}
        type="password"
      />
      <TextField
        value={values.newPassword}
        name="newPassword"
        onChange={handleInputChange}
        onBlur={handleBlur}
        label={`${t('Придумайте новый пароль')}*`}
        required
        errorMessage={getTouchedError(submitCount, errors.newPassword, touched.newPassword)}
        type="password"
      />
      <TextField
        value={values.repeatPassword}
        name="repeatPassword"
        onChange={handleInputChange}
        onBlur={handleBlur}
        label={`${t('Повторите пароль')}*`}
        required
        errorMessage={getTouchedError(submitCount, errors.repeatPassword, touched.repeatPassword)}
        type="password"
      />
      {status && (
        <Text size="xs" color="error">
          {status}
        </Text>
      )}
      <Button type="submit" disabled={isLoading}>
        {t('Сохранить изменения')}
      </Button>
    </Form>
  );
});

ChangePasswordForm.displayName = 'ChangePasswordForm';
