import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DiscogsClient } from '@/lib/discogs';
import { BrowseResults } from '@/components/browse/BrowseResults';

const styleTitles: Record<string, string> = {
  house: 'House Music',
  techno: 'Techno',
  alternative: 'Alternative',
  'indie-rock': 'Indie Rock',
  ambient: 'Ambient',
  metal: 'Metal',
};

export function StylePage() {
  const { style } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchReleases = async () => {
      if (!style) return;
      
      setLoading(true);
      try {
        const client = DiscogsClient.getInstance();
        const data = await client.search(`style:${style}`, page);
        
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
  }, [style, page]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  if (!style || !styleTitles[style]) {
    return <div>Style not found</div>;
  }

  return (
    <BrowseResults
      title={styleTitles[style]}
      results={results}
      isLoading={loading}
      onLoadMore={loadMore}
      hasMore={hasMore}
    />
  );
}