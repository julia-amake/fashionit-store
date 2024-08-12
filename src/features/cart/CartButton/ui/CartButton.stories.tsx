import React from 'react';
import type { Meta } from '@storybook/react';
import { StoryFn } from '@storybook/react';
import { CartButton } from './CartButton';

const meta: Meta<typeof CartButton> = {
  title: 'widgets/CartButton',
  component: CartButton,
  args: {
    id: '1',
  },
};

export default meta;

const Template: StoryFn<typeof CartButton> = (args) => (
  <div style={{ width: 220 }}>
    <CartButton {...args} />
  </div>
);

export const Default = Template.bind({});
export const SizeXS = Template.bind({});
export const SizeS = Template.bind({});
export const SizeM = Template.bind({});

Default.args = {};
SizeXS.args = { size: 'xs' };
SizeS.args = { size: 's' };
SizeM.args = { size: 'm' };
