import React from 'react';
import cn from 'clsx';
import s from './Preloader.module.scss';

interface PreloaderProps {
  className?: string;
}

export const Preloader = (props: PreloaderProps) => {
  const { className = '' } = props;

  return <span className={cn(s.preloader, className)} />;
};
