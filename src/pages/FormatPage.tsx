import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DiscogsClient } from '@/lib/discogs';
import { BrowseResults } from '@/components/browse/BrowseResults';

const formatTitles: Record<string, string> = {
  vinyl: 'Vinyl Records',
  cd: 'Compact Discs',
  cassette: 'Cassette Tapes',
  digital: 'Digital Releases',
};

export function FormatPage() {
  const { format } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchReleases = async () => {
      if (!format) return;
      
      setLoading(true);
      try {
        const client = DiscogsClient.getInstance();
        const data = await client.search(`format:${format}`, page);
        
        if (page === 1) {
          setResults(data.results || []);
        } else {
          setResults((prev) => [...prev, ...(data.results || [])]);
        }
        
        setHasMore(data.pagination?.pages > page);
      } catch (error) {
        console.error('Failed to fetch releases:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReleases();
  }, [format, page]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  if (!format || !formatTitles[format]) {
    return <div>Format not found</div>;
  }

  return (
    <BrowseResults
      title={formatTitles[format]}
      results={results}
      isLoading={loading}
      onLoadMore={loadMore}
      hasMore={hasMore}
    />
  );
}