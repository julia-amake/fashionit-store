import type { Meta } from '@storybook/react';
import IconMoon from 'src/shared/assets/icons/Moon.svg';
import IconMoonFilled from 'src/shared/assets/icons/MoonFilled.svg';
import IconSun from 'src/shared/assets/icons/Sun.svg';
import IconSunFilled from 'src/shared/assets/icons/SunFilled.svg';
import { ToggleSwitch } from './ToggleSwitch';

const meta: Meta<typeof ToggleSwitch> = {
  title: 'shared/ToggleSwitch',
  component: ToggleSwitch,
  args: {},
};

export default meta;

export const Icon = {
  args: {
    firstElem: { title: 'Светлая', icon: IconSun, iconFilled: IconSunFilled, isActive: true },
    lastElem: {
      title: 'Темная',
      icon: IconMoon,
      iconFilled: IconMoonFilled,
    },
  },
};

export const TextIcon = {
  args: {
    firstElem: { label: 'Светлая', icon: IconSun, iconFilled: IconSunFilled, isActive: true },
    lastElem: {
      label: 'Темная длинная',
      icon: IconMoon,
      iconFilled: IconMoonFilled,
    },
  },
};

export const Text = {
  args: {
    firstElem: { label: 'Светлая', isActive: true },
    lastElem: {
      label: 'Темная длинная',
    },
  },
};
