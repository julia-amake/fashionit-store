import '../../styles/index.scss';
import React, { FC } from 'react';
import { ThemeProvider } from '../../providers/ThemeProvider';

export const StyleDecorator = (Story: FC) => {
  return (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  );
};
