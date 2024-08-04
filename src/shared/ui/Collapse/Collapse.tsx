import React, { memo, ReactNode, useLayoutEffect, useRef, useState } from 'react';
import cn from 'clsx';
import { useCollapsedReducer } from './lib/hooks/useCollapsedReducer';
import s from './Collapse.module.scss';

interface CollapseProps {
  opened?: boolean;
  children: ReactNode;
}

export const Collapse = memo(({ opened = false, children }: CollapseProps) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const [inited, setInited] = useState(false);
  const { isOpen, isMounted, open, close, mount, unmount } = useCollapsedReducer(outerRef.current);

  useLayoutEffect(() => {
    if (opened) {
      mount();
      open();
      return;
    }

    close();
    setInited(true);
  }, [close, mount, open, opened]);

  const handleTransitionEnd = () => {
    !opened && unmount();
  };

  return (
    <div
      className={cn(s.outer, { [s.outer_animate]: inited })}
      ref={outerRef}
      onTransitionEnd={handleTransitionEnd}
    >
      {isMounted && (
        <div className={cn(s.content, { [s.content_animate]: inited, [s.content_open]: isOpen })}>
          {children}
        </div>
      )}
    </div>
  );
});

Collapse.displayName = 'Collapse';
