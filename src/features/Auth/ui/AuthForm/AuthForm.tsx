import React, { memo } from 'react';
import { getValidates } from 'src/shared/lib/utils/validation/common';
import { FormProps } from 'src/shared/types/formTypes';
import { Button } from 'src/shared/ui/Button';
import { Form } from 'src/shared/ui/Form';
import { Heading } from 'src/shared/ui/Heading';
import { Text } from 'src/shared/ui/Text';
import { TextField } from 'src/shared/ui/TextField';

export type AuthFormValues = {
  email: string;
  password: string;
};

export interface AuthFormProps extends FormProps<AuthFormValues> {
  title: string;
}

export const AuthForm = memo(({ formManager, title, className }: AuthFormProps) => {
  if (!formManager) return null;

  const {
    submitForm,
    touched,
    errors,
    submitCount,
    handleBlur,
    handleSubmit,
    handleChange,
    values,
    status,
  } = formManager;

  const { help: helpEmail } = getValidates(errors.email, touched.email, submitCount);
  const { help: helpPassword } = getValidates(errors.password, touched.password, submitCount);

  return (
    <Form className={className} onSubmit={handleSubmit}>
      <Heading as="h2" size="h5">
        {title}
      </Heading>
      <TextField
        value={values.email}
        autoFocus
        name="email"
        type="email"
        onChange={handleChange}
        onBlur={handleBlur}
        label="Email"
        required
        errorMessage={helpEmail}
      />
      <TextField
        value={values.password}
        name="password"
        type="password"
        required
        onChange={handleChange}
        onBlur={handleBlur}
        label="Пароль"
        errorMessage={helpPassword}
      />
      {status && (
        <Text size="s" color="error">
          {status}
        </Text>
      )}
      <Button label={title} onClick={submitForm} />
    </Form>
  );
});

AuthForm.displayName = 'AuthForm';
