import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetchCategoriesQuery } from 'src/entities/Category';
import { Category } from 'src/shared/api/common';
import { getTouchedError } from 'src/shared/lib/utils/validation';
import { Preloader } from 'src/shared/ui/Preloader/Preloader';
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
    const { t } = useTranslation();

    const options = useMemo(() => {
      const rawOptions = data ? getOptions(data) : [];

      return [
        {
          value: '',
          content: rawOptions.length ? `${t('Выберите категорию')}*` : t('Нет категорий'),
          disabled: true,
        },
        ...rawOptions,
      ];
    }, [data, t]);

    if (isLoading) return <Preloader />;
    if (error) return error as string;

    return (
      <Select
        errorMessage={getTouchedError(submitCount, errorMessage, touched)}
        options={options}
        {...otherProps}
      />
    );
  }
);

ProductCategorySelect.displayName = 'ProductCategorySelect';
