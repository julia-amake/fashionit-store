import React, { memo } from 'react';
import cn from 'clsx';
import { ToggleSwitchButton } from './ToggleSwitchButton/ToggleSwitchButton';
import s from './ToggleSwitch.module.scss';

export interface SwitcherElem {
  children?: string | string[];
  /**
   * Текст при наведении
   */
  title?: string;
  isActive?: boolean;
  icon?: SVGType;
  iconFilled?: SVGType;
  onClick?: () => void;
}

interface SwitcherProps {
  firstElem: SwitcherElem;
  lastElem: SwitcherElem;
  className?: string;
}

export type SwitcherElems = { firstElem: SwitcherElem; lastElem: SwitcherElem };

export const ToggleSwitch = memo(({ firstElem, lastElem, className }: SwitcherProps) => {
  return (
    <div className={cn(s.outer, className)}>
      <ToggleSwitchButton {...firstElem} />
      <ToggleSwitchButton {...lastElem} />
    </div>
  );
});

ToggleSwitch.displayName = 'ToggleSwitch';
