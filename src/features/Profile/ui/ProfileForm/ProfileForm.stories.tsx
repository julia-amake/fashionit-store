import React from 'react';
import type { Meta } from '@storybook/react';
import { StoryFn } from '@storybook/react';
import { ProfileForm } from './ProfileForm';

const meta: Meta<typeof ProfileForm> = {
  title: 'features/forms/ProfileForm',
  component: ProfileForm,
  args: {},
};

export default meta;

const Template: StoryFn<typeof ProfileForm> = () => {
  return (
    <div style={{ maxWidth: 480 }}>
      <ProfileForm />
    </div>
  );
};

export const Default = Template.bind({});
