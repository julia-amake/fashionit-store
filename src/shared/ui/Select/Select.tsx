import React, { OptionHTMLAttributes, ReactNode, SelectHTMLAttributes, useId } from 'react';
import cn from 'clsx';
import { typedMemo } from 'src/shared/lib/utils/typedMemo';
import s from './Select.module.scss';

export interface SelectOption<T extends string = string>
  extends OptionHTMLAttributes<HTMLOptionElement> {
  value: T;
  content: string;
}

export interface SelectProps<T extends string> extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption<T>[];
  value?: T;
  disabled?: boolean;
  className?: string;
  errorMessage?: ReactNode;
}

export const Select = typedMemo(
  <T extends string>({
    label,
    value,
    options,
    errorMessage,
    disabled,
    className,
    onChange,
    ...otherProps
  }: SelectProps<T>) => {
    const selectId = useId();

    return (
      <div className={cn(s.outer, className)}>
        <div className={cn(s.fieldWrapper, { [s.fieldWrapper_error]: errorMessage })}>
          {label && (
            <label className={s.label} htmlFor={selectId}>
              {label}
            </label>
          )}
          <select
            className={cn(s.select, { [s.select_disabled]: disabled })}
            onChange={onChange}
            disabled={disabled}
            value={value}
            {...otherProps}
          >
            {options.map((opt) => (
              <option key={opt.value} {...opt}>
                {opt.content}
              </option>
            ))}
          </select>
        </div>
        {errorMessage && <div className={s.error}>{errorMessage}</div>}
      </div>
    );
  }
);
