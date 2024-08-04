import React from 'react';
import type { Meta } from '@storybook/react';
import { StoryFn } from '@storybook/react';
import { FormikConfig, useFormik } from 'formik/dist';
import { validate as formValidate } from 'src/features/Auth/lib/utils/validate';
import { AuthForm, AuthFormValues } from './AuthForm';

const meta: Meta<typeof AuthForm> = {
  title: 'features/forms/AuthForm',
  component: AuthForm,
  args: {},
};

export default meta;

const {
  onSubmit,
  validate,
  initialValues,
}: Pick<FormikConfig<AuthFormValues>, 'onSubmit' | 'validate' | 'initialValues'> = {
  initialValues: {
    email: '',
    password: '',
  },
  onSubmit: (values, { resetForm }) => {
    console.log(values);
    resetForm({ values: initialValues });
  },
  validate: formValidate,
};

const Template: StoryFn<typeof AuthForm> = (args) => {
  const formManager = useFormik<AuthFormValues>({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <div style={{ maxWidth: 480 }}>
      <AuthForm {...args} formManager={formManager} />
    </div>
  );
};

export const SingIn = Template.bind({});
SingIn.args = { title: 'Войти' };
export const SignUp = Template.bind({});
SignUp.args = { title: 'Зарегистрироваться' };
