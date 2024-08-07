import React, { memo } from 'react';
import cn from 'clsx';
import { getValidates } from 'src/shared/lib/utils/validation';
import { TextField, TextFieldProps } from 'src/shared/ui/TextField/TextField';
import s from './ProductField.module.scss';

interface ProductFieldProps extends TextFieldProps {
  errorMessage?: string;
  submitCount: number;
  touched: boolean;
}

export const ProductField = memo(
  ({ className, errorMessage = '', touched, submitCount, ...otherProps }: ProductFieldProps) => {
    const { help } = getValidates(errorMessage, touched, submitCount);

    return <TextField className={cn(s.outer, className)} errorMessage={help} {...otherProps} />;
  }
);

ProductField.displayName = 'ProductField';
