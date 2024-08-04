import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { CartItem } from './CartItem';

const meta: Meta<typeof CartItem> = {
  title: 'entities/ProductCartItem',
  component: CartItem,
  args: {
    id: '1',
    title: 'Название товара',
    desc: 'Короткое описание товара в\u00A0две строки приходит обрезан...',
    count: 1,
    pic: 'https://amake.ru/assets/img/abs/rain-1.jpg',
    price: 5600,
  },
};

export default meta;

const Template: StoryFn<typeof CartItem> = (args) => (
  <div style={{ width: 560 }}>
    <CartItem {...args} />
  </div>
);

export const Default = Template.bind({});
export const NoImage = Template.bind({});
export const NoDescription = Template.bind({});

Default.args = {};
NoImage.args = { pic: undefined };
NoDescription.args = { desc: undefined };
