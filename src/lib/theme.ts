import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const updateThemeClass = (theme: Theme) => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

export const useTheme = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () => 
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          updateThemeClass(newTheme);
          return { theme: newTheme };
        }),
      setTheme: (theme) => {
        updateThemeClass(theme);
        set({ theme });
      },
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          updateThemeClass(state.theme);
        }
      },
    }
  )
);