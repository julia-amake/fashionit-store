import React from 'react';
import type { Meta } from '@storybook/react';
import { Header } from 'src/widgets/Header';
import { BaseLayout } from './BaseLayout';

const meta: Meta<typeof BaseLayout> = {
  title: 'shared/BaseLayout',
  component: BaseLayout,
  args: {
    header: <Header />,
  },
};

export default meta;

export const Default = {};
