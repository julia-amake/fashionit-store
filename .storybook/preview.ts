import type { Preview } from '@storybook/react';
import { StyleDecorator } from 'src/app/config/storybook/StyleDecorator';
import { TranslationsDecorator } from 'src/app/config/storybook/TranslationsDecorator';
import { THEME } from 'src/shared/consts/theme';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['shared', 'entities', 'features', 'widgets', 'pages', 'app'],
      },
    },
    themes: {
      default: 'light',
      list: [
        { name: 'light', class: [THEME.LIGHT], color: '#ffffff' },
        { name: 'dark', class: [THEME.DARK], color: '#000000' },
      ],
    },
    backgrounds: {
      disable: true,
    },
  },
  decorators: [StyleDecorator, TranslationsDecorator],
};

export default preview;
