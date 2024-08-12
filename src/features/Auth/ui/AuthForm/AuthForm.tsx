import React, { memo } from 'react';
import { getTouchedError } from 'src/shared/lib/utils/validation';
import { FormProps } from 'src/shared/types/formTypes';
import { Button } from 'src/shared/ui/Button';
import { Form } from 'src/shared/ui/Form';
import { Heading } from 'src/shared/ui/Heading';
import { Text } from 'src/shared/ui/Text/Text';
import { TextField } from 'src/shared/ui/TextField/TextField';

export type AuthFormValues = {
  email: string;
  password: string;
};

export interface AuthFormProps extends FormProps<AuthFormValues> {
  title: string;
}

export const AuthForm = memo(({ formManager, title, className }: AuthFormProps) => {
  if (!formManager) return null;

  const { touched, errors, submitCount, handleBlur, handleSubmit, handleChange, values, status } =
    formManager;

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
        errorMessage={getTouchedError(submitCount, errors.email, touched.email)}
      />
      <TextField
        value={values.password}
        name="password"
        type="password"
        required
        onChange={handleChange}
        onBlur={handleBlur}
        label="Пароль"
        errorMessage={getTouchedError(submitCount, errors.password, touched.password)}
      />
      {status && (
        <Text size="xs" color="error">
          {status}
        </Text>
      )}
      <Button type="submit">{title}</Button>
    </Form>
  );
});

AuthForm.displayName = 'AuthForm';
