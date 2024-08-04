import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { CartButton } from 'src/features/Cart';
import { getCategory } from 'src/homeworks/ts1/3_write';
import { ProductDetails } from './ProductDetails';

const meta: Meta<typeof ProductDetails> = {
  title: 'entities/ProductDetails',
  component: ProductDetails,
  args: {
    title: 'Название товара',
    desc:
      'Стая серебристых рыбок скользила в\u00A0глубоководной синеве океана, ' +
      'их\u00A0чешуйки переливались в\u00A0лучах пробившегося сквозь толщу воды солнца.',
    pics: [
      'https://amake.ru/assets/img/abs/rain-1.jpg',
      'https://amake.ru/assets/img/abs/rain-2.jpg',
      'https://amake.ru/assets/img/abs/rain-1.jpg',
      'https://amake.ru/assets/img/abs/rain-2.jpg',
      'https://amake.ru/assets/img/abs/rain-1.jpg',
      'https://amake.ru/assets/img/abs/rain-2.jpg',
      'https://amake.ru/assets/img/abs/rain-1.jpg',
    ],
    price: 5600,
    category: getCategory(),
    cartBtn: <CartButton id="1" />,
  },
};

export default meta;

const Template: StoryFn<typeof ProductDetails> = (args) => (
  <div style={{ maxWidth: 1144, width: '96%', margin: '0 auto' }}>
    <ProductDetails {...args} />
  </div>
);

export const Default = Template.bind({});
export const NoImages = Template.bind({});
export const NoDescription = Template.bind({});

Default.args = {};
NoImages.args = { pics: undefined };
NoDescription.args = { desc: undefined };
