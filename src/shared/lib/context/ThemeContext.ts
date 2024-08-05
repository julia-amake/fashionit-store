import { createContext } from 'react';
import { Theme } from '../../consts/theme';

export interface ThemeContextType {
  theme?: Theme;
  setTheme?: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType>({});
