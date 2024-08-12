import React, { ReactNode } from 'react';
import cn from 'clsx';
import { ToggleSwitchButton } from './ToggleSwitchButton/ToggleSwitchButton';
import s from './ToggleSwitch.module.scss';

interface SwitcherProps {
  children: ReactNode[];
  className?: string;
}

export const ToggleSwitch = ({ children, className }: SwitcherProps) => {
  return <div className={cn(className, s.outer)}>{children}</div>;
};

ToggleSwitch.displayName = 'ToggleSwitch';
ToggleSwitch.Item = ToggleSwitchButton;
