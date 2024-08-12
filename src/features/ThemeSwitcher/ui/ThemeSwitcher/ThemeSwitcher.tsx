import React, { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { THEME, Theme } from 'src/shared/consts/theme';
import { ThemeContext } from 'src/shared/lib/context/ThemeContext';
import { ToggleSwitch } from 'src/shared/ui/ToggleSwitch/ToggleSwitch';
import IconMoon from 'src/shared/assets/icons/Moon.svg';
import IconMoonFilled from 'src/shared/assets/icons/MoonFilled.svg';
import IconSun from 'src/shared/assets/icons/Sun.svg';
import IconSunFilled from 'src/shared/assets/icons/SunFilled.svg';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const handleClick = (curr: Theme) => () => {
    if (theme === curr) return;
    setTheme?.(curr);
  };

  return (
    <ToggleSwitch className={className}>
      <ToggleSwitch.Item
        title={t('Светлая')}
        icon={IconSun}
        iconFilled={IconSunFilled}
        isActive={theme === THEME.LIGHT}
        onClick={handleClick(THEME.LIGHT)}
      />
      <ToggleSwitch.Item
        title={t('Темная')}
        icon={IconMoon}
        iconFilled={IconMoonFilled}
        isActive={theme === THEME.DARK}
        onClick={handleClick(THEME.DARK)}
      />
    </ToggleSwitch>
  );
});

ThemeSwitcher.displayName = 'ThemeSwitcher';
