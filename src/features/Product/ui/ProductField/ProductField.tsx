import React, { memo } from 'react';
import cn from 'clsx';
import { getValidates } from 'src/shared/lib/utils/validation/common';
import { TextField, TextFieldProps } from 'src/shared/ui/TextField';
import s from './ProductField.module.scss';

interface ProductFieldProps extends TextFieldProps {
  errorMessage?: string;
  submitCount: number;
  touched: boolean;
}

export const ProductField = memo(
  ({ className, errorMessage = '', touched, submitCount, ...otherProps }: ProductFieldProps) => {
    const { help } = getValidates(errorMessage, touched, submitCount);

    return (
      <TextField
        classNames={{ wrapper: cn(s.outer, className) }}
        errorMessage={help}
        {...otherProps}
      />
    );
  }
);

ProductField.displayName = 'ProductField';
