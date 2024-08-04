import React from 'react';
import cn from 'clsx';
import s from './ActionsPanel.module.scss';

interface ActionsPanelProps {
  children: React.ReactNode;
  className?: string;
}

export const ActionsPanel = ({ children, className }: ActionsPanelProps) => {
  return <div className={cn(s.outer, className)}>{children}</div>;
};

ActionsPanel.displayName = 'ActionsPanel';
