import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';

type Theme = 'light' | 'dark';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
  isSystemTheme: boolean;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderComponentProps {
  children: ReactNode;
}

export const ThemeProviderComponent: React.FC<ThemeProviderComponentProps> = ({ children }) => {
  const systemTheme = useSystemColorScheme();
  const [theme, setTheme] = useState<Theme>(systemTheme || 'light');
  const [isSystemTheme, setIsSystemTheme] = useState(true); // To track if we are using user's choice or system

  useEffect(() => {
    if (isSystemTheme) {
      setTheme(systemTheme || 'light');
    }
  }, [systemTheme, isSystemTheme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setIsSystemTheme(false); // User has made a choice
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isSystemTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProviderComponent');
  }
  return context;
}; 