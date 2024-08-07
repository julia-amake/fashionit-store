import React, { memo } from 'react';
import cn from 'clsx';
import { Button } from '../../Button';
import { SwitcherElem } from '../ToggleSwitch';
import s from './ToggleSwitchButton.module.scss';

export const ToggleSwitchButton = memo(
  ({ children, title, isActive, icon, iconFilled = icon, onClick }: SwitcherElem) => {
    return (
      <div className={cn(s.outer, { [s.outer_active]: isActive })}>
        <Button
          className={s.btn}
          rounded
          variant="clean"
          size="xs"
          title={title}
          {...(icon ? { icon: isActive ? iconFilled : icon } : {})}
          onClick={onClick}
        >
          {children}
        </Button>
      </div>
    );
  }
);

ToggleSwitchButton.displayName = 'ToggleSwitchButton';
