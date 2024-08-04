import React from 'react';
import type { Meta } from '@storybook/react';
import { StoryFn } from '@storybook/react';
import { Button } from 'src/shared/ui/Button';
import { TextField } from 'src/shared/ui/TextField';
import { Form } from './Form';

const meta: Meta<typeof Form> = {
  title: 'shared/Form',
  component: Form,
  args: {},
};

export default meta;

const Template: StoryFn<typeof Form> = () => {
  return (
    <div style={{ maxWidth: 480 }}>
      <Form>
        <TextField label="Поле 1" />
        <TextField label="Поле 2" />
        <Button label="Сохранить" />
      </Form>
    </div>
  );
};

export const Default = Template.bind({});
