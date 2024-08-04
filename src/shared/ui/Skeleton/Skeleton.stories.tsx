import type { Meta } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'shared/Skeleton',
  component: Skeleton,
  args: {
    width: 270,
    height: 320,
  },
};

export default meta;

export const Default = {};
export const RoundedCorners = {
  args: {
    borderRadius: 24,
  },
};

export const Circle = {
  args: {
    width: 100,
    height: 100,
    borderRadius: '50%',
  },
};
