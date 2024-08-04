import type { Meta } from '@storybook/react';
import Icon from 'src/shared/assets/icons/Heart.svg';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'shared/Button',
  tags: ['autodocs'],
  component: Button,
  args: {
    label: 'Кнопка',
  },
};

export default meta;

export const Primary = { args: { variant: 'primary' } };
export const Secondary = { args: { variant: 'secondary' } };
export const Clean = { args: { variant: 'clean' } };

export const SizeXS = { args: { size: 'xs' } };
export const SizeS = { args: { size: 's' } };
export const SizeM = { args: { size: 'm' } };

export const IconLeft = {
  args: { icon: Icon, iconPosition: 'left' },
};
export const IconRight = {
  args: { icon: Icon, iconPosition: 'right' },
};
export const IconOnly = {
  args: { label: undefined, icon: Icon },
};

export const Rounded = { args: { rounded: true } };

export const FullWidth = { args: { full: true, icon: Icon } };
export const FullWidthTextLeft = { args: { full: true, textPosition: 'left', icon: Icon } };
export const FullWidthTextRight = { args: { full: true, textPosition: 'right', icon: Icon } };

export const PrimaryDisabled = { args: { variant: 'primary', disabled: true } };
export const SecondaryDisabled = { args: { variant: 'secondary', disabled: true } };
