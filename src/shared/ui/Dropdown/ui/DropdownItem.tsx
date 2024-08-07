import React, { memo, useCallback, useContext } from 'react';
import cn from 'clsx';
import { Button } from '../../Button';
import { DropdownContext } from '../lib/useDropdownContext';
import s from './Dropdown.module.scss';

interface DropdownItemProps {
  children: string | string[];
  icon?: SVGType;
  action: () => void;
}

export const DropdownItem = memo(({ children, icon, action }: DropdownItemProps) => {
  const { close } = useContext(DropdownContext);

  const handleClick = useCallback(() => {
    close?.();
    action();
  }, [action, close]);

  return (
    <Button
      className={cn(s.item)}
      icon={icon}
      variant="clean"
      textPosition="left"
      onClick={handleClick}
    >
      {children}
    </Button>
  );
});

DropdownItem.displayName = 'DropdownItem';
