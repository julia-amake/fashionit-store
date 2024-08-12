import React from 'react';
import type { Meta } from '@storybook/react';
import { StoryFn } from '@storybook/react';
import { ProductForm } from './ProductForm';

const meta: Meta<typeof ProductForm> = {
  title: 'features/forms/ProductForm',
  component: ProductForm,
  args: {},
};

export default meta;

const Template: StoryFn<typeof ProductForm> = (args) => {
  return (
    <div style={{ maxWidth: 480 }}>
      <ProductForm {...args} />
    </div>
  );
};

export const Create = Template.bind({});
export const Edit = Template.bind({});
Edit.args = { id: '2' };
