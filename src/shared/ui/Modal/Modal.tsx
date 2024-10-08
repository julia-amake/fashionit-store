import React, { ReactNode } from 'react';
import cn from 'clsx';
import CloseIcon from '../../assets/icons/Close.svg';
import { usePreventPageScrolling } from '../../lib/hooks/usePreventPageScrolling';
import { Button } from '../Button';
import { Portal } from '../Portal/Portal';
import s from './Modal.module.scss';

interface ModalProps {
  children: ReactNode;
  visible?: boolean;
  lazy?: boolean;
  onClose?: () => void;
}

export const Modal = ({ children, visible = false, lazy = true, onClose }: ModalProps) => {
  usePreventPageScrolling(visible);

  const handleInnerClick = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation();

  if (lazy && !visible) return null;

  return (
    <Portal>
      <div className={cn(s.outer, { [s.outer_visible]: visible })} onClick={onClose}>
        <div className={s.inner} onClick={handleInnerClick}>
          {children}
        </div>
        <Button
          className={s.close}
          icon={CloseIcon}
          iconClassName={s.closeIcon}
          variant="clean"
          size="m"
          title="Закрыть"
        />
      </div>
    </Portal>
  );
};
