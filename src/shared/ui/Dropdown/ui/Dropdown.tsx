import React, { ReactElement } from 'react';
import cn from 'clsx';
import { useDetermineChildren } from '../lib/useDetermineChildren';
import { DropdownContext, useDropdownContext } from '../lib/useDropdownContext';
import { DropdownItem } from './DropdownItem';
import { DropdownTrigger } from './DropdownTrigger';
import s from './Dropdown.module.scss';

interface DropdownProps {
  children: ReactElement[];
  position?: 'left' | 'right';
  className?: string;
}

export const Dropdown = ({ children, position = 'left', className }: DropdownProps) => {
  const { isOpen, open, close } = useDropdownContext();
  const { trigger, items } = useDetermineChildren(children);

  if (!trigger) return null;

  return (
    <DropdownContext.Provider value={{ isOpen, open, close }}>
      <div className={cn(s.outer, className)} onMouseEnter={open} onMouseLeave={close}>
        {trigger}
        {items.length && isOpen && (
          <div className={cn(s.content, s[`content_${position}`], { [s.content_open]: isOpen })}>
            {items}
          </div>
        )}
      </div>
    </DropdownContext.Provider>
  );
};

Dropdown.displayName = 'Dropdown';
Dropdown.Item = DropdownItem;
Dropdown.Trigger = DropdownTrigger;
