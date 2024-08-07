import React, { ButtonHTMLAttributes, forwardRef, memo } from 'react';
import cn from 'clsx';
import s from './Button.module.scss';

export type ButtonSize = 'xs' | 's' | 'm';
type ButtonVariant = 'primary' | 'secondary' | 'clean';
type IconPosition = 'left' | 'right';
type TextPosition = 'center' | 'left' | 'right';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: SVGType;
  iconPosition?: IconPosition;
  iconClassName?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
  textPosition?: TextPosition;
  rounded?: boolean;
  full?: boolean;
  className?: string;
  children?: string | string[];
}

export const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>((props: ButtonProps, ref) => {
    const {
      children,
      icon: Icon,
      iconPosition = 'left',
      iconClassName,
      textPosition = 'center',
      size = 'm',
      variant = 'primary',
      rounded = false,
      full = false,
      disabled,
      className,
      type = 'button',
      ...otherProps
    } = props;

    if (!children && !Icon) return null;

    const buttonClassNames = cn(
      s.outer,
      className,
      s[`outer_size-${size}`],
      s[`outer_variant-${variant}`],
      s[`outer_text-${textPosition}`],
      {
        [s[`outer_noLabel-${size}`]]: !children,
        [s.outer_rounded]: rounded,
        [s.outer_disabled]: disabled,
        [s.outer_full]: full,
      }
    );

    const iconClassNames = cn(
      s.icon,
      iconClassName,
      s[`icon_variant-${variant}`],
      s[`icon_size-${size}`],
      {
        [s.icon_right]: iconPosition === 'right',
        [s.icon_withLabel]: children,
        [s.icon_noLabel]: !children,
      }
    );

    return (
      <button
        className={buttonClassNames}
        type={type}
        disabled={disabled}
        ref={ref}
        {...otherProps}
      >
        {!Icon && children}
        {Icon && <Icon className={iconClassNames} />}
        {Icon && children && <span>{children}</span>}
      </button>
    );
  })
);

Button.displayName = 'Button';
