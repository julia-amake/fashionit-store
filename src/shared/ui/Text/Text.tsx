import React, { memo, ReactNode } from 'react';
import cn from 'clsx';
import s from './Text.module.scss';

type TextSize = 's' | 'm' | 'l';
type TextColor = 'primary' | 'error';

interface TextProps {
  size?: TextSize;
  color?: TextColor;
  weight?: 'light' | 'normal' | 'bold';
  className?: string;
  children: ReactNode;
}

export const Text = memo(
  ({ children, className, size = 'm', weight = 'normal', color = 'primary' }: TextProps) => {
    const classNames = cn(
      s.text,
      className,
      s[`color_${color}`],
      s[`size_${size}`],
      s[`weight_${weight}`]
    );

    return <div className={cn(classNames)}>{children}</div>;
  }
);

Text.displayName = 'Text';
