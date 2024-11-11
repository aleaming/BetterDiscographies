import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DiscogsClient } from '@/lib/discogs';
import { type Artist } from '@/types/discogs';
import { ArtistHero } from '@/components/artist/ArtistHero';
import { ArtistTabs } from '@/components/artist/ArtistTabs';

export function ArtistPage() {
  const { id } = useParams();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [releases, setReleases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [releasesLoading, setReleasesLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const client = DiscogsClient.getInstance();
        const data = await client.getArtist(Number(id));
        setArtist(data);
      } catch (error) {
        console.error('Failed to fetch artist:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArtist();
    }
  }, [id]);

  useEffect(() => {
    const fetchReleases = async () => {
      if (!id || !hasMore) return;

      setReleasesLoading(true);
      try {
        const client = DiscogsClient.getInstance();
        const data = await client.getArtistReleases(Number(id), page);
        
        setReleases(prev => [...prev, ...data.releases]);
        setHasMore(data.pagination.pages > page);
      } catch (error) {
        console.error('Failed to fetch releases:', error);
        setHasMore(false);
      } finally {
        setReleasesLoading(false);
      }
    };

    fetchReleases();
  }, [id, page]);

  const loadMoreReleases = () => {
    setPage(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="aspect-[3/4] rounded-2xl bg-gray-200" />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <div className="h-10 bg-gray-200 rounded w-2/3" />
              <div className="h-6 bg-gray-200 rounded w-1/2" />
            </div>
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900">Artist not found</h2>
        <p className="mt-2 text-gray-600">The requested artist could not be found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ArtistHero artist={artist} />
      
      <ArtistTabs 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        releases={releases}
        isLoading={releasesLoading}
        hasMore={hasMore}
        onLoadMore={loadMoreReleases}
      />
    </div>
  );
}