import 'src/app/styles/index.scss';
import React, { FC } from 'react';
import { ThemeProvider } from 'src/app/providers';

export const StyleDecorator = (Story: FC) => {
  return (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  );
};
