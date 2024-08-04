import React from 'react';
import type { Meta } from '@storybook/react';
import { StoryFn } from '@storybook/react';
import { Heading } from './Heading';
import s from './Storybook.module.scss';

const meta: Meta<typeof Heading> = {
  title: 'shared/Heading',
  component: Heading,
  args: {},
};

export default meta;

const Template: StoryFn<typeof Heading> = (args) => (
  <Heading className={s.heading} {...args}>
    Заголовок
  </Heading>
);

export const H1 = Template.bind({});
export const H2 = Template.bind({});
export const H3 = Template.bind({});
export const H4 = Template.bind({});
export const H5 = Template.bind({});
export const H6 = Template.bind({});

export const Light = Template.bind({});
export const Normal = Template.bind({});
export const Bold = Template.bind({});

export const Uppercase = Template.bind({});

H1.args = { size: 'h1' };
H2.args = { size: 'h2' };
H3.args = { size: 'h3' };
H4.args = { size: 'h4' };
H5.args = { size: 'h5' };
H6.args = { size: 'h6' };

Light.args = { weight: 'light' };
Normal.args = { weight: 'normal' };
Bold.args = { weight: 'bold' };

Uppercase.args = { uppercase: true };
