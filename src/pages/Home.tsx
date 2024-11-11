import { useTheme } from '@/lib/theme';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold">
          Welcome to Better Discogs
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Your ultimate music collection manager and player. Explore, collect, and enjoy your music in a whole new way.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={toggleTheme}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            {theme === 'light' ? (
              <>
                <Moon className="h-5 w-5" />
                Switch to Dark Mode
              </>
            ) : (
              <>
                <Sun className="h-5 w-5" />
                Switch to Light Mode
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}