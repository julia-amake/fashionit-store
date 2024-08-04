import { ProductParams } from 'src/entities/Product/model/types/productTypes';
import { isNotDefinedString } from 'src/shared/lib/utils/validation/common';

type ProductFormErrors = Record<keyof ProductParams, string>;

export const validate = (values: ProductParams) => {
  const errors = {} as ProductFormErrors;
  if (isNotDefinedString(values.name)) {
    errors.name = 'Обязательное поле';
  }
  if (isNotDefinedString(values.categoryId)) {
    errors.categoryId = 'Обязательное поле';
  }
  if (values.photo && !values.photo?.match(/.+\.(png|jpg|jpeg|gif|woff)/)?.length) {
    errors.photo = 'Допустимые форматы изображений: jpg, jpeg, woff, png, gif';
  }
  if (isNotDefinedString(String(values.price || ''))) {
    errors.price = 'Обязательное поле';
  }
  if (values.oldPrice && values.oldPrice <= values.price) {
    errors.oldPrice = 'Старая цена должна быть больше текущей';
  }
  return errors;
};
