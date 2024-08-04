import React, { memo } from 'react';
import cn from 'clsx';
import { Button } from 'src/shared/ui/Button';
import s from './ToggleSwitch.module.scss';

export interface SwitcherElem {
  /**
   * Текст на кнопке
   */
  label?: string;
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
  const button = ({ label, title, isActive, icon, iconFilled = icon, onClick }: SwitcherElem) => {
    return (
      <div className={cn(s.btnWrapper, { [s.btnWrapper_active]: isActive })}>
        <Button
          className={s.btn}
          rounded
          variant="clean"
          size="xs"
          title={title}
          label={label}
          {...(icon ? { icon: isActive ? iconFilled : icon } : {})}
          onClick={onClick}
        />
      </div>
    );
  };

  return (
    <div className={cn(s.outer, className)}>
      {button(firstElem)}
      {button(lastElem)}
    </div>
  );
});

ToggleSwitch.displayName = 'ToggleSwitch';
