import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/lib/theme';
import { Button } from '../ui/Button';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="w-full justify-start text-muted-foreground hover:text-foreground"
    >
      {theme === 'light' ? (
        <>
          <Moon className="mr-2 h-4 w-4" />
          Dark Mode
        </>
      ) : (
        <>
          <Sun className="mr-2 h-4 w-4" />
          Light Mode
        </>
      )}
    </Button>
  );
}