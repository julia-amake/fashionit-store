import React from 'react';
import cn from 'clsx';
import { Skeleton } from 'src/shared/ui/Skeleton';
import s from './PicWrapper.module.scss';

interface PicWrapperSkeletonProps {
  className: string;
}

export const PicWrapperSkeleton = ({ className }: PicWrapperSkeletonProps) => {
  return <Skeleton className={cn(s.outer, className)} />;
};
