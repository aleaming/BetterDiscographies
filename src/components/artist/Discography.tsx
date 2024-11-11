import { useState } from 'react';
import { Filter, ListFilter, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { ViewToggle } from '../search/ViewToggle';

interface Release {
  id: number;
  title: string;
  year: string;
  thumb: string;
  format: string | string[];
  type: string;
  trackCount?: number;
  artist: string;
  role: string;
}

interface DiscographyProps {
  releases: Release[];
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

type ReleaseType = 'all' | 'album' | 'single' | 'ep' | 'compilation';
type SortOrder = 'desc' | 'asc';
type ViewMode = 'medium' | 'large' | 'list';

const getReleaseType = (format: string | string[], role: string): ReleaseType => {
  const formatStr = Array.isArray(format) ? format.join(' ') : format || '';
  const formatLower = formatStr.toLowerCase();
  
  if (role !== 'Main') return 'compilation';
  if (formatLower.includes('single')) return 'single';
  if (formatLower.includes('ep')) return 'ep';
  return 'album';
};

const formatToString = (format: string | string[]): string => {
  if (Array.isArray(format)) {
    return format.join(', ');
  }
  return format || '';
};

export function Discography({ releases, isLoading, hasMore, onLoadMore }: DiscographyProps) {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<ReleaseType>('all');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [viewMode, setViewMode] = useState<ViewMode>('medium');

  const processedReleases = releases.map(release => ({
    ...release,
    type: getReleaseType(release.format, release.role)
  }));

  const filteredReleases = processedReleases
    .filter((release) => selectedType === 'all' || release.type === selectedType)
    .sort((a, b) => {
      const yearA = parseInt(a.year) || 0;
      const yearB = parseInt(b.year) || 0;
      return sortOrder === 'desc' ? yearB - yearA : yearA - yearB;
    });

  const releaseTypes: { value: ReleaseType; label: string }[] = [
    { value: 'all', label: 'All Releases' },
    { value: 'album', label: 'Albums' },
    { value: 'single', label: 'Singles' },
    { value: 'ep', label: 'EPs' },
    { value: 'compilation', label: 'Compilations' },
  ];

  const gridClasses = {
    medium: "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
    large: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
  };

  return (
    <div className="space-y-6">
      {/* Filters and View Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <ListFilter className="h-5 w-5 text-gray-500" />
            <div className="flex flex-wrap gap-2">
              {releaseTypes.map((type) => (
                <Button
                  key={type.value}
                  variant={selectedType === type.value ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedType(type.value)}
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
          </Button>
        </div>
        <ViewToggle value={viewMode} onChange={setViewMode} />
      </div>

      {/* Results */}
      {viewMode === 'list' ? (
        <div className="space-y-3">
          {filteredReleases.map((release) => (
            <div
              key={release.id}
              className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={release.thumb || 'https://via.placeholder.com/150'}
                alt={release.title}
                className="h-16 w-16 rounded-md object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">{release.title}</h3>
                <div className="flex items-center gap-4 mt-1">
                  <span className={cn(
                    'rounded-full px-2 py-1 text-xs font-medium',
                    {
                      'bg-blue-100 text-blue-800': release.type === 'album',
                      'bg-green-100 text-green-800': release.type === 'single',
                      'bg-purple-100 text-purple-800': release.type === 'ep',
                      'bg-amber-100 text-amber-800': release.type === 'compilation',
                    }
                  )}>
                    {release.type.charAt(0).toUpperCase() + release.type.slice(1)}
                  </span>
                  <span className="text-sm text-gray-500">{release.year}</span>
                  <span className="text-sm text-gray-500">{formatToString(release.format)}</span>
                </div>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate(`/release/${release.id}`)}
              >
                View Details
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className={gridClasses[viewMode]}>
          {filteredReleases.map((release) => (
            <div
              key={release.id}
              className="group relative flex flex-col rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={release.thumb || 'https://via.placeholder.com/400'}
                  alt={release.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button 
                      className="bg-white/90 text-black hover:bg-white"
                      onClick={() => navigate(`/release/${release.id}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex-1 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-gray-900 line-clamp-2">
                    {release.title}
                  </h3>
                  <span className="shrink-0 text-sm text-gray-500">{release.year}</span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className={cn(
                    'rounded-full px-2 py-1 text-xs font-medium',
                    {
                      'bg-blue-100 text-blue-800': release.type === 'album',
                      'bg-green-100 text-green-800': release.type === 'single',
                      'bg-purple-100 text-purple-800': release.type === 'ep',
                      'bg-amber-100 text-amber-800': release.type === 'compilation',
                    }
                  )}>
                    {release.type.charAt(0).toUpperCase() + release.type.slice(1)}
                  </span>
                  <span>{formatToString(release.format)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      )}

      {!isLoading && hasMore && (
        <div className="flex justify-center pt-4">
          <Button variant="secondary" onClick={onLoadMore}>
            Load More Releases
          </Button>
        </div>
      )}

      {!isLoading && filteredReleases.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No releases found matching your filters.</p>
        </div>
      )}
    </div>
  );
}