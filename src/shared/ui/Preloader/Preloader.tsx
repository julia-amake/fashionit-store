import React from 'react';
import cn from 'clsx';
import s from './Preloader.module.scss';

interface PreloaderProps {
  className?: string;
}

export const Preloader = ({ className = '' }: PreloaderProps) => (
  <span className={cn(s.preloader, className)} />
);
