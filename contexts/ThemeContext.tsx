import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';
import { View, ActivityIndicator } from 'react-native'; // Import View and ActivityIndicator

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
  const [theme, setTheme] = useState<Theme>('light'); // Default to light theme
  const [isSystemTheme, setIsSystemTheme] = useState(true);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Handle system theme detection
    if (systemTheme) {
      setTheme(systemTheme);
    }
    setIsLoading(false);
  }, [systemTheme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setIsSystemTheme(false);
  };

  // Show loading indicator while theme is being determined
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isSystemTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    console.warn('useTheme called before theme initialization - using light theme as fallback');
    return { 
      theme: 'light' as Theme, 
      toggleTheme: () => {}, 
      isSystemTheme: false 
    };
  }
  return context;
};
