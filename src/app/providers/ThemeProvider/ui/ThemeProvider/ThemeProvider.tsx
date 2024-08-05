import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { LOCAL_STORAGE_THEME_KEY } from 'src/shared/consts/localStorage';
import { Theme, THEME } from 'src/shared/consts/theme';
import { ThemeContext, ThemeContextType } from 'src/shared/lib/context/ThemeContext';
import { containsValue } from 'src/shared/lib/predicates';

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: Theme;
}

export const ThemeProvider = ({ initialTheme, children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    const storageTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme;
    setTheme(containsValue(THEME, storageTheme) ? storageTheme : THEME.LIGHT);
  }, []);

  useEffect(() => {
    if (!theme) return;
    const bodyClassNames = document.body.classList;
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
    bodyClassNames.remove(...Object.values(THEME));
    bodyClassNames.add(theme);
  }, [theme]);

  const themeValue: ThemeContextType = useMemo(() => ({ theme, setTheme }), [theme]);

  return <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>;
};
