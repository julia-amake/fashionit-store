import React, { ElementType } from 'react';
import cn from 'clsx';
import s from './Heading.module.scss';

type HeadingSizes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingFontWeight = 'light' | 'normal' | 'bold';

export interface HeadingProps {
  as?: ElementType;
  size?: HeadingSizes;
  weight?: HeadingFontWeight;
  uppercase?: boolean;
  children: string | string[];
  className?: string;
}

export const Heading = ({
  as: Elem = 'p',
  size = 'h1',
  weight = 'bold',
  uppercase = false,
  children,
  className,
}: HeadingProps) => {
  return (
    <Elem
      className={cn(s.outer, className, s[`size-${size}`], s[`weight-${weight}`], {
        [s.upper]: uppercase,
      })}
    >
      {children}
    </Elem>
  );
};
