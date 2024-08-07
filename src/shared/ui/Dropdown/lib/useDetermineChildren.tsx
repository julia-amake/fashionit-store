import { Children, ReactElement, useEffect, useMemo, useState } from 'react';
import { DropdownItem } from '../ui/DropdownItem';
import { DropdownTrigger } from '../ui/DropdownTrigger';

interface Result {
  trigger: ReactElement | null;
  items: ReactElement[];
}

export const useDetermineChildren = (children: ReactElement[]): Result => {
  const [trigger, setTrigger] = useState<ReactElement | null>(null);
  const [items, setItems] = useState<ReactElement[]>([]);

  useEffect(() => {
    let currTrigger: ReactElement | null = null;
    const currItems: ReactElement[] = [];

    Children.forEach(children, (child) => {
      switch (child.type) {
        case DropdownTrigger:
          if (!currTrigger) currTrigger = child;
          return;
        case DropdownItem:
          currItems.push(child);
      }
    });

    setTrigger(currTrigger);
    setItems(currItems);
  }, [children]);

  return useMemo(
    () => ({
      trigger,
      items,
    }),
    [items, trigger]
  );
};
