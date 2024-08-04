import type { Meta } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'shared/Select',
  component: Select,
  args: {
    options: [
      { value: '1', content: 'Значение 1' },
      { value: '2', content: 'Значение 2' },
      { value: '3', content: 'Значение 3' },
    ],
  },
};

export default meta;

export const Default = {};
export const Label = { args: { label: 'Заголовок' } };
export const Disabled = { args: { disabled: true } };
export const Error = { args: { errorMessage: 'Текст ошибки' } };
