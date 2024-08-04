import React, { memo, useCallback, useContext } from 'react';
import cn from 'clsx';
import { Button } from 'src/shared/ui/Button';
import { DropdownContext } from 'src/shared/ui/Dropdown/Dropdown';
import s from './Dropdown.module.scss';

export interface DropdownItemProps {
  children: string | string[];
  icon?: SVGType;
  action: () => void;
}

export const DropdownItem = memo(({ children, icon, action }: DropdownItemProps) => {
  const { toggle } = useContext(DropdownContext);

  const handleClick = useCallback(() => {
    toggle?.(false);
    action();
  }, [action, toggle]);

  return (
    <Button
      className={cn(s.item)}
      label={children}
      icon={icon}
      variant="clean"
      textPosition="left"
      onClick={handleClick}
    />
  );
});

DropdownItem.displayName = 'DropdownItem';
