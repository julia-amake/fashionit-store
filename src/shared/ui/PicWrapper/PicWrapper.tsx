import React from 'react';
import cn from 'clsx';
import { useImageLoading } from 'src/shared/lib/hooks';
import noProduct from 'src/shared/assets/img/no-product.svg?url';
import s from './PicWrapper.module.scss';

interface ProductPicWrapperProps {
  pic?: string;
  defaultPic?: string;
  alt?: string;
  className?: string;
}

export const PicWrapper = ({ pic, defaultPic, alt = '', className }: ProductPicWrapperProps) => {
  const [isPicLoading, isPicError] = useImageLoading(pic || '');

  return (
    <div className={cn(s.outer, className)}>
      <img
        className={s.pic}
        src={isPicError || isPicLoading ? defaultPic || noProduct : pic}
        alt={alt}
      />
    </div>
  );
};
