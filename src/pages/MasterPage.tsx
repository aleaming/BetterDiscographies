import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DiscogsClient } from '@/lib/discogs';
import { Button } from '@/components/ui/Button';
import { Store } from 'lucide-react';
import { MarketStats } from '@/components/market/MarketStats';

export function MasterPage() {
  const { id } = useParams();
  const [master, setMaster] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaster = async () => {
      try {
        const client = DiscogsClient.getInstance();
        const data = await client.getMasterRelease(Number(id));
        setMaster(data);
      } catch (error) {
        console.error('Failed to fetch master:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMaster();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!master) {
    return <div>Master release not found</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex gap-8">
        <div className="w-96">
          <img
            src={master.images?.[0]?.uri || 'https://via.placeholder.com/400'}
            alt={master.title}
            className="w-full rounded-xl shadow-lg"
          />
          <div className="mt-4 flex gap-3">
            <Button className="flex-1" onClick={() => window.open(master.uri, '_blank')}>
              <Store className="mr-2 h-4 w-4" />
              Shop all versions
            </Button>
          </div>
        </div>
        <div className="flex-1 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{master.title}</h1>
            <p className="mt-2 text-xl text-gray-600">{master.artists?.[0]?.name}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {master.year && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Year</h3>
                <p className="mt-1 text-gray-900">{master.year}</p>
              </div>
            )}
            {master.genres?.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Genres</h3>
                <p className="mt-1 text-gray-900">{master.genres.join(', ')}</p>
              </div>
            )}
            {master.styles?.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Styles</h3>
                <p className="mt-1 text-gray-900">{master.styles.join(', ')}</p>
              </div>
            )}
          </div>

          {/* Market Statistics */}
          <MarketStats id={Number(id)} />

          {master.tracklist?.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Tracklist</h2>
              <div className="space-y-2">
                {master.tracklist.map((track: any, index: number) => (
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