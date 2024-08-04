import { isNotDefinedString } from 'src/shared/lib/utils/validation/common';
import { AuthFormValues } from '../../ui/AuthForm/AuthForm';

export type AuthFormErrors = Record<keyof AuthFormValues, string>;

export const validate = (values: AuthFormValues) => {
  const errors = {} as AuthFormErrors;
  if (isNotDefinedString(values.email)) {
    errors.email = 'Обязательное поле';
  }
  if (values.email && !values.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i)?.length) {
    errors.email = 'Некорректный email';
  }
  if (!values.password.match(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/)?.length) {
    errors.password =
      'Пароль должен быть не короче 8 символов и содержать хотя бы одну цифру, заглавную и строчную буквы';
  }
  if (isNotDefinedString(values.password)) {
    errors.password = 'Обязательное поле';
  }
  return errors;
};
