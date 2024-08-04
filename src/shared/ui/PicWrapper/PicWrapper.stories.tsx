import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { PicWrapper } from './PicWrapper';

const meta: Meta<typeof PicWrapper> = {
  title: 'shared/PicWrapper',
  component: PicWrapper,
  args: {},
};

export default meta;

const Template: StoryFn<typeof PicWrapper> = (args) => (
  <div style={{ width: 270 }}>
    <PicWrapper {...args} />
  </div>
);

export const Default = Template.bind({});
export const BrokenImage = Template.bind({});

Default.args = { pic: 'https://amake.ru/assets/img/abs/rain-1.jpg' };
BrokenImage.args = { pic: '' };
