import React from 'react';
import type { Meta } from '@storybook/react';
import { StoryFn } from '@storybook/react';
import { CroppedText } from './CroppedText';

const meta: Meta<typeof CroppedText> = {
  title: 'shared/CroppedText',
  component: CroppedText,
  args: {
    rows: 4,
    opened: false,
    children:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A culpa doloribus illo libero maxime       non quia velit voluptate. Accusamus ad commodi deserunt doloribus dolorum ea enim esse eveniet       expedita illo, laboriosam maiores minima nemo odit, perferendis praesentium quasi quia       recusandae repellat sint, sit vitae voluptate. Aliquam, corporis delectus eveniet facere       fugiat illo illum impedit incidunt ipsam iste iure, iusto modi nesciunt nobis nostrum nulla       obcaecati odit pariatur provident rem repellat repellendus rerum sequi sunt tempore veritatis       voluptate? Asperiores assumenda dolor est hic natus possimus quaerat quas quidem sed       veritatis? Consequatur ea illum incidunt inventore modi odio rem sunt ut voluptates!',
  },
};

export default meta;

const Template: StoryFn<typeof CroppedText> = (args) => (
  <div style={{ maxWidth: 700 }}>
    <CroppedText {...args} />
  </div>
);

export const Default = Template.bind({});
