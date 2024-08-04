import React, { memo, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { THEME, Theme } from 'src/shared/consts/theme';
import { ThemeContext } from 'src/shared/lib/context';
import { SwitcherElem, SwitcherElems, ToggleSwitch } from 'src/shared/ui/ToggleSwitch';
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

  const elems = useMemo((): SwitcherElems => {
    const getElem = (
      itemTheme: Theme,
      title: string,
      icon: SVGType,
      iconFilled: SVGType
    ): SwitcherElem => {
      const handleClick = (curr: Theme) => () => {
        if (theme === curr) return;
        setTheme?.(curr);
      };

      return {
        title,
        icon,
        iconFilled,
        isActive: theme === itemTheme,
        onClick: handleClick(itemTheme),
      };
    };

    return {
      firstElem: getElem(THEME.LIGHT, t('Светлая'), IconSun, IconSunFilled),
      lastElem: getElem(THEME.DARK, t('Темная'), IconMoon, IconMoonFilled),
    };
  }, [setTheme, t, theme]);

  return <ToggleSwitch {...elems} className={className} />;
});

ThemeSwitcher.displayName = 'ThemeSwitcher';
