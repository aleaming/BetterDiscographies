import { X } from 'lucide-react';
import { Button } from '../ui/Button';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onFilterChange: (filters: SearchFilters) => void;
  onSortChange: (sort: SortOption) => void;
  filters: SearchFilters;
  sort: SortOption;
}

export interface SearchFilters {
  type: string[];
  year: {
    from: string;
    to: string;
  };
  format: string[];
  style: string[];
}

export type SortOption = {
  field: 'year' | 'title' | 'format';
  direction: 'asc' | 'desc';
};

const types = ['release', 'master', 'artist', 'label'];
const formats = ['Vinyl', 'CD', 'Cassette', 'Digital'];
const styles = ['Rock', 'Electronic', 'Jazz', 'Classical', 'Hip Hop', 'Pop', 'Folk'];

export function FilterDrawer({
  isOpen,
  onClose,
  onFilterChange,
  onSortChange,
  filters,
  sort,
}: FilterDrawerProps) {
  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-80 transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex h-16 items-center justify-between border-b px-4">
        <h2 className="text-lg font-semibold">Filters & Sort</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="overflow-y-auto p-4 space-y-6">
        {/* Sort Options */}
        <div className="space-y-2">
          <h3 className="font-medium text-gray-900">Sort By</h3>
          <select
            className="w-full rounded-md border border-gray-300 p-2"
            value={`${sort.field}-${sort.direction}`}
            onChange={(e) => {
              const [field, direction] = e.target.value.split('-') as [
                SortOption['field'],
                SortOption['direction']
              ];
              onSortChange({ field, direction });
            }}
          >
            <option value="year-desc">Year (Newest)</option>
            <option value="year-asc">Year (Oldest)</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
          </select>
        </div>

        {/* Type Filter */}
        <div className="space-y-2">
          <h3 className="font-medium text-gray-900">Type</h3>
          <div className="space-y-2">
            {types.map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.type.includes(type)}
                  onChange={(e) => {
                    const newTypes = e.target.checked
                      ? [...filters.type, type]
                      : filters.type.filter((t) => t !== type);
                    handleFilterChange('type', newTypes);
                  }}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Year Range */}
        <div className="space-y-2">
          <h3 className="font-medium text-gray-900">Year Range</h3>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="From"
              value={filters.year.from}
              onChange={(e) =>
                handleFilterChange('year', {
                  ...filters.year,
                  from: e.target.value,
                })
              }
              className="rounded-md border border-gray-300 p-2"
            />
            <input
              type="number"
              placeholder="To"
              value={filters.year.to}
              onChange={(e) =>
                handleFilterChange('year', { ...filters.year, to: e.target.value })
              }
              className="rounded-md border border-gray-300 p-2"
            />
          </div>
        </div>

        {/* Format Filter */}
        <div className="space-y-2">
          <h3 className="font-medium text-gray-900">Format</h3>
          <div className="space-y-2">
            {formats.map((format) => (
              <label key={format} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.format.includes(format)}
                  onChange={(e) => {
                    const newFormats = e.target.checked
                      ? [...filters.format, format]
                      : filters.format.filter((f) => f !== format);
                    handleFilterChange('format', newFormats);
                  }}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">{format}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Style Filter */}
        <div className="space-y-2">
          <h3 className="font-medium text-gray-900">Style</h3>
          <div className="space-y-2">
            {styles.map((style) => (
              <label key={style} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.style.includes(style)}
                  onChange={(e) => {
                    const newStyles = e.target.checked
                      ? [...filters.style, style]
                      : filters.style.filter((s) => s !== style);
                    handleFilterChange('style', newStyles);
                  }}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">{style}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Reset Filters Button */}
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => {
            onFilterChange({
              type: [],
              year: { from: '', to: '' },
              format: [],
              style: [],
            });
            onSortChange({ field: 'year', direction: 'desc' });
          }}
        >
          Reset All Filters
        </Button>
      </div>
    </div>
  );
}