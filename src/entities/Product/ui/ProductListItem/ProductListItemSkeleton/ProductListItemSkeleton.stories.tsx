import React from 'react';
import type { Meta } from '@storybook/react';
import { StoryFn } from '@storybook/react';
import { ProductListItemSkeleton } from './ProductListItemSkeleton';

const meta: Meta<typeof ProductListItemSkeleton> = {
  title: 'entities/ProductListItem/Skeleton',
  component: ProductListItemSkeleton,
  args: {},
};

export default meta;

const Template: StoryFn<typeof ProductListItemSkeleton> = (args) => (
  <div style={{ width: 270 }}>
    <ProductListItemSkeleton {...args} />
  </div>
);

export const Default = Template.bind({});
