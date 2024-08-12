import React, { ElementType, memo, ReactNode } from 'react';
import cn from 'clsx';
import s from './Text.module.scss';

type TextSize = 'xs' | 's' | 'm' | 'l';
type TextColor = 'primary' | 'error';

interface TextProps {
  as?: ElementType;
  size?: TextSize;
  color?: TextColor;
  weight?: 'light' | 'normal' | 'bold';
  className?: string;
  children: ReactNode;
}

export const Text = memo(
  ({
    as: Elem = 'div',
    children,
    className,
    size = 'm',
    weight = 'normal',
    color = 'primary',
  }: TextProps) => {
    const classNames = cn(
      s.text,
      className,
      s[`color_${color}`],
      s[`size_${size}`],
      s[`weight_${weight}`]
    );

    return <Elem className={cn(classNames)}>{children}</Elem>;
  }
);

Text.displayName = 'Text';
