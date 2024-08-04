import React, { memo, ReactNode, useContext } from 'react';
import cn from 'clsx';
import { DropdownContext } from 'src/shared/ui/Dropdown/Dropdown';
import s from './Dropdown.module.scss';

interface DropdownTriggerProps {
  children: ReactNode;
}

export const DropdownTrigger = memo(({ children }: DropdownTriggerProps) => {
  const { isOpen } = useContext(DropdownContext);

  return <div className={cn(s.trigger, { [s.trigger_active]: isOpen })}>{children}</div>;
});

DropdownTrigger.displayName = 'DropdownTrigger';
