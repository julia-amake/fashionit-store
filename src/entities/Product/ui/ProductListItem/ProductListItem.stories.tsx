import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { Product } from 'src/entities/Product';
import { fakeProduct } from 'src/entities/Product/mocks/productsMocks';
import { CartButton } from 'src/features/Cart';
import { ProductListItem } from './ProductListItem';

const product: Product = fakeProduct;

const meta: Meta<typeof ProductListItem> = {
  title: 'entities/ProductListItem',
  component: ProductListItem,
  args: {
    product,
    renderCartButton: () => <CartButton id="1" size={'s'} />,
  },
};

export default meta;

const Template: StoryFn<typeof ProductListItem> = (args) => (
  <div style={{ width: 270 }}>
    <ProductListItem {...args} />
  </div>
);

export const Default = Template.bind({});
export const NoImage = Template.bind({});
export const NoDescription = Template.bind({});

Default.args = {};
NoImage.args = {
  product: {
    ...product,
    photo: undefined,
  },
};

NoDescription.args = {
  product: {
    ...product,
    desc: undefined,
  },
};
