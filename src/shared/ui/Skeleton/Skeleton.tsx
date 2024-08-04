import React, { CSSProperties } from 'react';
import cn from 'clsx';
import s from './Skeleton.module.scss';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  marginTop?: string | number;
  marginBottom?: string | number;
  marginRight?: string | number;
  marginLeft?: string | number;
  display?: string;
}

export const Skeleton = ({
  width,
  height,
  marginRight,
  marginLeft,
  marginTop,
  marginBottom,
  borderRadius,
  display,
  className,
}: SkeletonProps) => {
  const styles: CSSProperties = {
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
    ...(marginBottom ? { marginBottom } : {}),
    ...(marginTop ? { marginTop } : {}),
    ...(marginRight ? { marginRight } : {}),
    ...(marginLeft ? { marginLeft } : {}),
    ...(borderRadius ? { borderRadius } : {}),
    ...(display ? { display } : {}),
  };

  return <div className={cn(s.outer, className)} style={styles} />;
};
