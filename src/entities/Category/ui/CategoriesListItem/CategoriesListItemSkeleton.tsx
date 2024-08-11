import React from 'react';
import cn from 'clsx';
import { Skeleton } from 'src/shared/ui/Skeleton/Skeleton';
import s from './CategoriesListItem.module.scss';

export const CategoriesListItemSkeleton = () => <Skeleton className={cn(s.skeleton)} />;
