import React, { ChangeEvent, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { UpdateProfileBody } from 'src/entities/Profile';
import { getTouchedError } from 'src/shared/lib/utils/validation';
import { FormProps } from 'src/shared/types/formTypes';
import { Button } from 'src/shared/ui/Button';
import { Form } from 'src/shared/ui/Form';
import { Heading } from 'src/shared/ui/Heading';
import { Text } from 'src/shared/ui/Text/Text';
import { TextField } from 'src/shared/ui/TextField/TextField';
import { useProfileForm } from '../lib/hooks/useProfileForm';

type ProfileFormProps = FormProps<UpdateProfileBody>;

export const ProfileForm = memo(({ className }: ProfileFormProps) => {
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
    isSaving,
  } = useProfileForm();
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
      <Heading as="h1" size="h5">
        {t('Изменить профиль')}
      </Heading>
      <TextField
        value={values.name}
        name="name"
        onChange={handleInputChange}
        onBlur={handleBlur}
        label={`${t('Ваш псевдоним')}*`}
        required
        errorMessage={getTouchedError(submitCount, errors.name, touched.name)}
      />
      {status && (
        <Text color="error" size="xs">
          {status}
        </Text>
      )}
      <Button type="submit" full={false} disabled={isSaving || isLoading}>
        {t('Сохранить изменения')}
      </Button>
    </Form>
  );
});

ProfileForm.displayName = 'ProfileForm';
