import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dim' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('touchef_theme') as Theme;
      if (saved === 'dark' || saved === 'light' || saved === 'dim') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dim', 'dark');

    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'dim') {
      root.classList.add('dark', 'dim'); // 'dark' ensures Tailwind dark: variants work, 'dim' applies warm slate overrides
    } else {
      root.classList.add('light');
    }

    localStorage.setItem('touchef_theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const cycleTheme = () => {
    setTheme(prev => {
      if (prev === 'light') return 'dim';
      if (prev === 'dim') return 'dark';
      return 'light';
    });
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme, cycleTheme, setTheme };
}
