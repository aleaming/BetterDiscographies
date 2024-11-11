import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DiscogsClient } from '@/lib/discogs';
import { BrowseResults } from '@/components/browse/BrowseResults';

const genreTitles: Record<string, string> = {
  electronic: 'Electronic Music',
  rock: 'Rock Music',
  'hip-hop': 'Hip Hop',
  jazz: 'Jazz',
  classical: 'Classical Music',
  folk: 'Folk Music',
};

export function GenrePage() {
  const { genre } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchReleases = async () => {
      if (!genre) return;
      
      setLoading(true);
      try {
        const client = DiscogsClient.getInstance();
        const data = await client.search(`genre:${genre}`, page);
        
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
  }, [genre, page]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  if (!genre || !genreTitles[genre]) {
    return <div>Genre not found</div>;
  }

  return (
    <BrowseResults
      title={genreTitles[genre]}
      results={results}
      isLoading={loading}
      onLoadMore={loadMore}
      hasMore={hasMore}
    />
  );
}