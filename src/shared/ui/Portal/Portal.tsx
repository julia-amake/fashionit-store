import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  elementId?: string;
}

export const Portal = ({ children, elementId = 'root' }: PortalProps) => {
  return createPortal(children, document.getElementById(elementId) || document.body);
};
