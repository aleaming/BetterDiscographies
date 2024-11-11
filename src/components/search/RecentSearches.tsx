import { X } from 'lucide-react';
import { useSearchHistory } from '@/lib/searchHistory';
import { Button } from '@/components/ui/Button';

interface RecentSearchesProps {
  onSearchClick: (search: string) => void;
}

export function RecentSearches({ onSearchClick }: RecentSearchesProps) {
  const { searches, removeSearch, clearSearches } = useSearchHistory();

  if (searches.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">Recent Searches</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearSearches}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Clear All
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {searches.map((search) => (
          <div
            key={search}
            className="group flex items-center gap-2 rounded-full border border-input bg-background px-3 py-1 text-sm hover:border-primary/20 hover:bg-accent"
          >
            <button
              onClick={() => onSearchClick(search)}
              className="text-muted-foreground group-hover:text-foreground"
            >
              {search}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeSearch(search);
              }}
              className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}