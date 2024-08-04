import React, {
  Children,
  createContext,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import cn from 'clsx';
import { DropdownItem } from './DropdownItem';
import { DropdownTrigger } from './DropdownTrigger';
import s from './Dropdown.module.scss';

interface DropdownContextProps {
  isOpen: boolean;
  toggle?: (isOpen?: boolean | null) => void;
}

export const DropdownContext = createContext<DropdownContextProps>({ isOpen: false });

interface DropdownProps {
  children: ReactElement[];
  position?: 'left' | 'right';
  className?: string;
}

export const Dropdown = ({ children, position = 'left', className }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [trigger, setTrigger] = useState<ReactElement | null>(null);
  const [items, setItems] = useState<ReactElement[]>([]);

  useEffect(() => {
    let currTrigger: ReactElement | null = null;
    const currItems: ReactElement[] = [];

    Children.forEach(children, (child) => {
      if (child.type === DropdownTrigger && !currTrigger) {
        currTrigger = child;
      } else if (child.type === DropdownItem) {
        currItems.push(child);
      }
    });

    setTrigger(currTrigger);
    setItems(currItems);
  }, [children]);

  const toggle = useCallback((isOpen: boolean | null = null) => {
    setIsOpen((prev) => (isOpen === null ? !prev : isOpen));
  }, []);

  const handleOpen = () => toggle?.(true);
  const handleClose = () => toggle?.(false);

  if (!items.length || !trigger) return null;

  return (
    <DropdownContext.Provider value={{ isOpen, toggle }}>
      <div className={cn(s.outer, className)} onMouseEnter={handleOpen} onMouseLeave={handleClose}>
        {trigger}
        <div className={cn(s.content, s[`content_${position}`], { [s.content_open]: isOpen })}>
          {items}
        </div>
      </div>
    </DropdownContext.Provider>
  );
};

Dropdown.displayName = 'Dropdown';
Dropdown.Item = DropdownItem;
Dropdown.Trigger = DropdownTrigger;
