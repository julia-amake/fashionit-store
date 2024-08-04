import React from 'react';
import type { Meta } from '@storybook/react';
import { StoryFn } from '@storybook/react';
import { TextField } from './TextField';

const meta: Meta<typeof TextField> = {
  title: 'shared/TextField',
  component: TextField,
  args: {},
};

export default meta;

const Template: StoryFn<typeof TextField> = (args) => (
  <div style={{ width: 320 }}>
    <TextField {...args} />
  </div>
);

export const LabelAsPlaceholder = Template.bind({});
export const NoLabelWithPlaceholder = Template.bind({});
export const DefaultValue = Template.bind({});
export const Error = Template.bind({});

LabelAsPlaceholder.args = { label: 'Введите свой email' };
DefaultValue.args = { label: 'Введите свой email', defaultValue: '12345' };
Error.args = { label: 'Введите свой email', errorMessage: 'Текст ошибки' };
NoLabelWithPlaceholder.args = { placeholder: 'Введите свой email' };
