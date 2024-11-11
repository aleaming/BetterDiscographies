import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DiscogsClient } from '@/lib/discogs';
import { Button } from '@/components/ui/Button';
import { Store } from 'lucide-react';
import { MarketStats } from '@/components/market/MarketStats';

export function ReleasePage() {
  const { id } = useParams();
  const [release, setRelease] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelease = async () => {
      try {
        const client = DiscogsClient.getInstance();
        const data = await client.getRelease(Number(id));
        setRelease(data);
      } catch (error) {
        console.error('Failed to fetch release:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRelease();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!release) {
    return <div>Release not found</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex gap-8">
        <div className="w-96">
          <img
            src={release.images?.[0]?.uri || 'https://via.placeholder.com/400'}
            alt={release.title}
            className="w-full rounded-xl shadow-lg"
          />
          <div className="mt-4 flex gap-3">
            <Button className="flex-1" onClick={() => window.open(release.uri, '_blank')}>
              <Store className="mr-2 h-4 w-4" />
              Shop this version
            </Button>
          </div>
        </div>
        <div className="flex-1 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{release.title}</h1>
            <p className="mt-2 text-xl text-gray-600">{release.artists?.[0]?.name}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {release.year && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Year</h3>
                <p className="mt-1 text-gray-900">{release.year}</p>
              </div>
            )}
            {release.labels?.[0] && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Label</h3>
                <p className="mt-1 text-gray-900">{release.labels[0].name}</p>
              </div>
            )}
            {release.formats?.[0] && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Format</h3>
                <p className="mt-1 text-gray-900">
                  {release.formats[0].name}
                  {release.formats[0].descriptions?.length > 0 && 
                    ` (${release.formats[0].descriptions.join(', ')})`}
                </p>
              </div>
            )}
            {release.country && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Country</h3>
                <p className="mt-1 text-gray-900">{release.country}</p>
              </div>
            )}
          </div>

          {/* Market Statistics */}
          <MarketStats id={Number(id)} />

          {release.tracklist?.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Tracklist</h2>
              <div className="space-y-2">
                {release.tracklist.map((track: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 py-2 border-b border-gray-100"
                  >
                    <span className="text-sm font-medium text-gray-400 w-8">
                      {track.position || index + 1}
                    </span>
                    <span className="flex-1 text-gray-900">{track.title}</span>
                    {track.duration && (
                      <span className="text-sm text-gray-500">{track.duration}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}