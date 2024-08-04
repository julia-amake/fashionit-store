import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  elementId?: string;
}

export const Portal: React.FC<PortalProps> = (props) => {
  const { children, elementId = 'root' } = props;

  return createPortal(children, document.getElementById(elementId) || document.body);
};
