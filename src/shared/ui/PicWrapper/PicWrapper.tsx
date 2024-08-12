import React, { memo } from 'react';
import cn from 'clsx';
import imageSkeleton from '../../assets/img/imageSkeleton.svg?url';
import noProduct from '../../assets/img/no-product.svg?url';
import { useImageLoading } from '../../lib/hooks/useImageLoading';
import s from './PicWrapper.module.scss';

interface ProductPicWrapperProps {
  pic?: string;
  defaultPic?: string;
  alt?: string;
  className?: string;
}

export const PicWrapper = memo(
  ({ pic, defaultPic, alt = '', className }: ProductPicWrapperProps) => {
    const [isLoading, isError] = useImageLoading(pic || '');

    const image = (() => {
      if (isLoading) return imageSkeleton;
      if (isError) return defaultPic || noProduct;
      return pic || noProduct;
    })();

    return (
      <div className={cn(s.outer, className)}>
        <img className={s.pic} src={image} alt={alt} />
      </div>
    );
  }
);

PicWrapper.displayName = 'PicWrapper';
