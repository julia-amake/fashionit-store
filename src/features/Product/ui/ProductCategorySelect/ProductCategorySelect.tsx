import React, { memo } from 'react';
import { useFetchCategoriesQuery } from 'src/entities/Category';
import { Category } from 'src/entities/Product';
import { getValidates } from 'src/shared/lib/utils/validation/common';
import { Select, SelectOption, SelectProps } from 'src/shared/ui/Select/Select';

interface ProductCategorySelectProps extends Omit<SelectProps<string>, 'options'> {
  title?: string;
  errorMessage?: string;
  submitCount: number;
  touched: boolean;
}

const getOptions = (categories: Category[]): SelectOption[] =>
  categories.map(({ id, name }) => ({
    value: id,
    content: name,
  }));

export const ProductCategorySelect = memo(
  ({ errorMessage = '', touched, submitCount, ...otherProps }: ProductCategorySelectProps) => {
    const { data, isLoading, error } = useFetchCategoriesQuery();
    const { help } = getValidates(errorMessage, touched, submitCount);

    const options = data ? getOptions(data) : [];

    if (isLoading) return 'Загружаем категории...';
    if (error) return error as string;

    return (
      <Select
        errorMessage={help}
        options={[
          {
            value: '',
            content: options.length ? 'Выберите категорию' : 'Нет категорий',
            disabled: true,
          },
          ...options,
        ]}
        {...otherProps}
      />
    );
  }
);

ProductCategorySelect.displayName = 'ProductCategorySelect';
