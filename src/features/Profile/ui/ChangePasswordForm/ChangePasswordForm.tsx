import React, { ChangeEvent, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { getValidates } from 'src/shared/lib/utils/validation/common';
import { FormProps } from 'src/shared/types/formTypes';
import { Button } from 'src/shared/ui/Button';
import { Form } from 'src/shared/ui/Form';
import { Heading } from 'src/shared/ui/Heading';
import { Text } from 'src/shared/ui/Text';
import { TextField } from 'src/shared/ui/TextField';
import { useChangePasswordForm } from '../../lib/hooks/useChangePasswordForm';

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
    submitForm,
    status,
    setStatus,
    isLoading,
  } = useChangePasswordForm();

  const { t } = useTranslation();

  const { help: helpPassword } = getValidates(errors.password, touched.password, submitCount);
  const { help: helpNewPassword } = getValidates(
    errors.newPassword,
    touched.newPassword,
    submitCount
  );
  const { help: helpRepeatPassword } = getValidates(
    errors.repeatPassword,
    touched.repeatPassword,
    submitCount
  );

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
        label={t('Введите текущий пароль')}
        required
        errorMessage={helpPassword}
        type="password"
      />
      <TextField
        value={values.newPassword}
        name="newPassword"
        onChange={handleInputChange}
        onBlur={handleBlur}
        label={t('Придумайте новый пароль')}
        required
        errorMessage={helpNewPassword}
        type="password"
      />
      <TextField
        value={values.repeatPassword}
        name="repeatPassword"
        onChange={handleInputChange}
        onBlur={handleBlur}
        label={t('Повторите пароль')}
        required
        errorMessage={helpRepeatPassword}
        type="password"
      />
      {status && (
        <Text size="s" color="error">
          {status}
        </Text>
      )}
      <Button label={t('Сохранить изменения')} onClick={submitForm} disabled={isLoading} />
    </Form>
  );
});

ChangePasswordForm.displayName = 'ChangePasswordForm';
