import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, Filter } from 'lucide-react';
import { DiscogsClient } from '@/lib/discogs';
import { ViewToggle } from '@/components/search/ViewToggle';
import { SearchResults } from '@/components/search/SearchResults';
import { FilterDrawer, SearchFilters, SortOption } from '@/components/search/FilterDrawer';
import { filterAndSortResults } from '@/lib/filters';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearchHistory } from '@/lib/searchHistory';
import { RecentSearches } from '../components/search/RecentSearches';
import { SearchTypeSelect, type SearchType } from '../components/search/SearchTypeSelect';

export function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [searchType, setSearchType] = useState<SearchType>(
    (searchParams.get('type') as SearchType) || 'all'
  );
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
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
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { addSearch } = useSearchHistory();

  const handleSearch = async (searchQuery: string, searchType: SearchType, pageNum = 1) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setHasMore(false);
      return;
    }

    setLoading(true);
    try {
      const client = DiscogsClient.getInstance();
      const typeFilter = searchType !== 'all' ? `type:${searchType}` : '';
      const searchString = `${searchQuery} ${typeFilter}`.trim();
      const data = await client.search(searchString, pageNum);
      
      if (pageNum === 1) {
        setResults(data.results || []);
        if (data.results?.length > 0) {
          addSearch(searchQuery.trim());
        }
      } else {
        setResults((prev) => [...prev, ...(data.results || [])]);
      }
      
      setHasMore(data.pagination?.pages > pageNum);
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      handleSearch(query, searchType, nextPage);
    }
  };

  const debouncedSearch = useDebounce((value: string, type: SearchType) => {
    setSearchParams({ q: value, type });
    setPage(1);
    handleSearch(value, type, 1);
  }, 300);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedSearch(newQuery, searchType);
  };

  const handleTypeChange = (type: SearchType) => {
    setSearchType(type);
    debouncedSearch(query, type);
  };

  const handleRecentSearchClick = (search: string) => {
    setQuery(search);
    setPage(1);
    handleSearch(search, searchType, 1);
  };

  useEffect(() => {
    const initialQuery = searchParams.get('q');
    const initialType = searchParams.get('type') as SearchType;
    if (initialQuery) {
      handleSearch(initialQuery, initialType || 'all', 1);
    }
  }, []);

  const filteredResults = filterAndSortResults(results, filters, sort);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-2xl">
          <div className="flex">
            <SearchTypeSelect value={searchType} onChange={handleTypeChange} />
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={handleQueryChange}
                placeholder="Search for artists, albums, labels, or tracks..."
                className="w-full rounded-r-lg border border-input bg-white px-10 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
          {!query && (
            <div className="absolute left-0 right-0 top-full mt-2">
              <RecentSearches onSearchClick={handleRecentSearchClick} />
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <ViewToggle value={viewMode} onChange={setViewMode} />
          <button
            onClick={() => setShowFilters(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-input bg-white px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>
      </div>

      <SearchResults
        results={filteredResults}
        viewMode={viewMode}
        isLoading={loading}
        onLoadMore={loadMore}
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