import React, {
  ChangeEvent,
  forwardRef,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  memo,
  ReactNode,
  useId,
  useState,
} from 'react';
import cn from 'clsx';
import { Text } from '../Text/Text';
import s from './TextField.module.scss';

type TextFieldType = Extract<
  HTMLInputTypeAttribute,
  'text' | 'password' | 'email' | 'number' | 'tel' | 'url'
>;

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  type?: TextFieldType;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
  errorMessage?: ReactNode;
  className?: string;
  fieldClassName?: string;
  children?: never;
}

export const TextField = memo(
  forwardRef<HTMLInputElement, TextFieldProps>(
    (
      {
        value,
        type = 'text',
        label,
        defaultValue,
        placeholder,
        errorMessage,
        className,
        fieldClassName,
        onChange,
        onFocus,
        onBlur,
        ...other
      }: TextFieldProps,
      ref
    ) => {
      const [isFocused, setIsFocused] = useState(false);
      const inputId = useId();

      const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);
      };

      const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        onFocus?.(e);
      };

      const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        onBlur?.(e);
      };

      return (
        <div className={className}>
          <div className={cn(s.fieldWrapper, { [s.fieldWrapper_error]: errorMessage })}>
            {label && (
              <label
                className={cn(s.label, { [s.label_top]: isFocused || value || defaultValue })}
                htmlFor={inputId}
              >
                {label}
              </label>
            )}
            <input
              ref={ref}
              className={cn(s.field, fieldClassName)}
              id={inputId}
              type={type}
              value={value}
              {...(!label && placeholder ? { placeholder } : {})}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              {...other}
            />
          </div>
          {errorMessage && (
            <Text className={s.error} size="xs" color="error">
              {String(errorMessage)}
            </Text>
          )}
        </div>
      );
    }
  )
);
