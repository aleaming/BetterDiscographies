import { useState } from 'react';
import { ViewToggle } from '../search/ViewToggle';
import { SearchResults } from '../search/SearchResults';
import { FilterDrawer, SearchFilters, SortOption } from '../search/FilterDrawer';
import { Filter } from 'lucide-react';
import { Button } from '../ui/Button';
import { filterAndSortResults } from '@/lib/filters';

interface BrowseResultsProps {
  title: string;
  results: any[];
  isLoading: boolean;
  onLoadMore: () => void;
  hasMore: boolean;
}

export function BrowseResults({ 
  title,
  results,
  isLoading,
  onLoadMore,
  hasMore
}: BrowseResultsProps) {
  const [viewMode, setViewMode] = useState<'medium' | 'large' | 'list'>('medium');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    type: [],
    year: { from: '', to: '' },
    format: [],
    style: [],
  });
  const [sort, setSort] = useState<SortOption>({
    field: 'year',
    direction: 'desc',
  });

  const filteredResults = filterAndSortResults(results, filters, sort);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <div className="flex items-center gap-4">
          <ViewToggle value={viewMode} onChange={setViewMode} />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(true)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <SearchResults
        results={filteredResults}
        viewMode={viewMode}
        isLoading={isLoading}
        onLoadMore={onLoadMore}
        hasMore={hasMore}
      />

      <FilterDrawer
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        sort={sort}
        onFilterChange={setFilters}
        onSortChange={setSort}
      />
    </div>
  );
}