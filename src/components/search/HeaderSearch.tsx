import { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SearchTypeSelect, type SearchType } from './SearchTypeSelect';

export function HeaderSearch() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const searchParams = new URLSearchParams({
        q: query,
        type: searchType,
      });
      navigate(`/search?${searchParams.toString()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex max-w-lg flex-1">
      <div className="flex w-full items-center">
        <SearchTypeSelect value={searchType} onChange={setSearchType} />
        <div className="relative flex flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for music..."
            className="w-full rounded-r-lg border border-input bg-white px-10 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>
    </form>
  );
}