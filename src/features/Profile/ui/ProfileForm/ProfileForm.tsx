import React, { ChangeEvent, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ProfileRequest } from 'src/entities/Profile';
import { getValidates } from 'src/shared/lib/utils/validation/common';
import { FormProps } from 'src/shared/types/formTypes';
import { Button } from 'src/shared/ui/Button';
import { Form } from 'src/shared/ui/Form';
import { Heading } from 'src/shared/ui/Heading';
import { Text } from 'src/shared/ui/Text';
import { TextField } from 'src/shared/ui/TextField';
import { useProfileForm } from '../../lib/hooks/useProfileForm';

type ProfileFormProps = FormProps<ProfileRequest>;

export const ProfileForm = memo(({ className }: ProfileFormProps) => {
  const {
    values,
    submitForm,
    touched,
    errors,
    submitCount,
    handleBlur,
    handleSubmit,
    handleChange,
    status,
    setStatus,
    isLoading,
    isSaving,
  } = useProfileForm();
  const { t } = useTranslation();

  const { help } = getValidates(errors.name, touched.name, submitCount);

  const handleInputChange = useCallback(
    (e: ChangeEvent) => {
      setStatus('');
      handleChange(e);
    },
    [handleChange, setStatus]
  );

  return (
    <Form className={className} onSubmit={handleSubmit}>
      <Heading as="h1" size="h5">
        {t('Изменить профиль')}
      </Heading>
      <TextField
        value={values.name}
        name="name"
        onChange={handleInputChange}
        onBlur={handleBlur}
        label={t('Ваш псевдоним')}
        required
        errorMessage={help}
      />
      {status && (
        <Text color="error" size="s">
          {status}
        </Text>
      )}
      <Button
        label={t('Сохранить изменения')}
        onClick={submitForm}
        full={false}
        disabled={isSaving || isLoading}
      />
    </Form>
  );
});

ProfileForm.displayName = 'ProfileForm';
