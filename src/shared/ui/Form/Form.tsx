import React, { FormHTMLAttributes } from 'react';
import cn from 'clsx';
import s from './Form.module.scss';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  className?: string;
}

export const Form = ({ className, children, ...otherProps }: FormProps) => {
  return (
    <form className={cn(s.form, className)} {...otherProps}>
      {children}
    </form>
  );
};

Form.displayName = 'Form';
