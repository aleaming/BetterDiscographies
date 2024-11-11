import type { SearchFilters, SortOption } from '@/components/search/FilterDrawer';

export interface DiscogsResult {
  id: number;
  type: string;
  title: string;
  year?: string;
  label?: string[];
  format?: string[];
  genre?: string[];
  style?: string[];
  thumb?: string;
  cover_image?: string;
}

export function filterAndSortResults(
  results: DiscogsResult[],
  filters: SearchFilters,
  sort: SortOption
): DiscogsResult[] {
  let filteredResults = [...results];

  // Apply type filter
  if (filters.type.length > 0) {
    filteredResults = filteredResults.filter((result) =>
      filters.type.includes(result.type.toLowerCase())
    );
  }

  // Apply year range filter
  if (filters.year.from || filters.year.to) {
    filteredResults = filteredResults.filter((result) => {
      if (!result.year) return false;
      const year = parseInt(result.year);
      const from = filters.year.from ? parseInt(filters.year.from) : -Infinity;
      const to = filters.year.to ? parseInt(filters.year.to) : Infinity;
      return year >= from && year <= to;
    });
  }

  // Apply format filter
  if (filters.format.length > 0) {
    filteredResults = filteredResults.filter((result) =>
      result.format?.some((format) =>
        filters.format.some((f) => format.toLowerCase().includes(f.toLowerCase()))
      )
    );
  }

  // Apply style filter
  if (filters.style.length > 0) {
    filteredResults = filteredResults.filter((result) =>
      result.style?.some((style) =>
        filters.style.some((s) => style.toLowerCase().includes(s.toLowerCase()))
      ) ||
      result.genre?.some((genre) =>
        filters.style.some((s) => genre.toLowerCase().includes(s.toLowerCase()))
      )
    );
  }

  // Apply sorting
  filteredResults.sort((a, b) => {
    const direction = sort.direction === 'asc' ? 1 : -1;

    switch (sort.field) {
      case 'year':
        const yearA = a.year ? parseInt(a.year) : 0;
        const yearB = b.year ? parseInt(b.year) : 0;
        return (yearA - yearB) * direction;

      case 'title':
        return a.title.localeCompare(b.title) * direction;

      case 'format':
        const formatA = a.format?.[0] || '';
        const formatB = b.format?.[0] || '';
        return formatA.localeCompare(formatB) * direction;

      default:
        return 0;
    }
  });

  return filteredResults;
}