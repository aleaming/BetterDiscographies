import React from 'react';
import { Button } from '../ui/Button';
import { ListResultCard } from './ListResultCard';
import { GridResultCard } from './GridResultCard';
import { cn } from '@/lib/utils';

interface SearchResult {
  id: string;
  title: string;
  type: string;
  thumb: string;
  format?: string[];
  label?: string[];
  year?: string;
  genre?: string[];
  style?: string[];
  country?: string;
  barcode?: string[];
  uri: string;
  resource_url: string;
  master_url?: string;
  master_id?: number;
}

interface SearchResultsProps {
  results: SearchResult[];
  viewMode: 'list' | 'medium' | 'large';
  isLoading: boolean;
  onLoadMore: () => void;
  hasMore: boolean;
}

const generateUniqueKey = (result: SearchResult): string => {
  return `${result.type}-${result.id}-${Math.random()}`;
};

export function SearchResults({
  results,
  viewMode,
  isLoading,
  onLoadMore,
  hasMore,
}: SearchResultsProps) {
  if (results.length === 0 && !isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No results found. Try adjusting your search or filters.</p>
      </div>
    );
  }

  const gridClasses = {
    medium: "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
    large: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
  };

  return (
    <div className="space-y-8">
      {viewMode === 'list' ? (
        <div className="space-y-4">
          {results.map((result) => (
            <ListResultCard key={generateUniqueKey(result)} result={result} />
          ))}
        </div>
      ) : (
        <div className={gridClasses[viewMode as keyof typeof gridClasses]}>
          {results.map((result) => (
            <GridResultCard 
              key={generateUniqueKey(result)} 
              result={result} 
              size={viewMode} 
            />
          ))}
        </div>
      )}

      {(hasMore || isLoading) && (
        <div className="flex justify-center pt-4">
          <Button
            variant="secondary"
            onClick={onLoadMore}
            disabled={isLoading}
            className="min-w-[200px]"
          >
            {isLoading ? "Loading..." : "Load More Results"}
          </Button>
        </div>
      )}
    </div>
  );
}