import { useState } from 'react';
import { DiscogsClient } from '@/lib/discogs';
import { Button } from '@/components/ui/Button';
import { ChevronRight } from 'lucide-react';

const GENRES = [
  {
    name: 'Electronic',
    image: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?w=800&auto=format&fit=crop&q=60',
    color: 'from-purple-500 to-blue-500',
  },
  {
    name: 'Rock',
    image: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=800&auto=format&fit=crop&q=60',
    color: 'from-red-500 to-orange-500',
  },
  {
    name: 'Jazz',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&auto=format&fit=crop&q=60',
    color: 'from-amber-500 to-yellow-500',
  },
  {
    name: 'Hip Hop',
    image: 'https://images.unsplash.com/photo-1571609860754-01493a63a9f2?w=800&auto=format&fit=crop&q=60',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    name: 'Classical',
    image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&auto=format&fit=crop&q=60',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    name: 'Folk',
    image: 'https://images.unsplash.com/photo-1485579149621-3123dd979885?w=800&auto=format&fit=crop&q=60',
    color: 'from-orange-500 to-amber-500',
  },
];

interface GenreResults {
  [key: string]: any[];
}

export function Genres() {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [results, setResults] = useState<GenreResults>({});
  const [loading, setLoading] = useState<string | null>(null);

  const loadGenreReleases = async (genre: string) => {
    if (results[genre]?.length > 0) {
      setSelectedGenre(genre);
      return;
    }

    setLoading(genre);
    try {
      const client = DiscogsClient.getInstance();
      const data = await client.search(`genre:"${genre}"`, 1, 20);
      setResults((prev) => ({ ...prev, [genre]: data.results }));
      setSelectedGenre(genre);
    } catch (error) {
      console.error('Failed to load genre releases:', error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GENRES.map((genre) => (
          <button
            key={genre.name}
            onClick={() => loadGenreReleases(genre.name)}
            className="group relative h-64 overflow-hidden rounded-2xl"
          >
            <img
              src={genre.image}
              alt={genre.name}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${genre.color} opacity-60`} />
            <div className="absolute inset-0 flex items-center justify-between p-6">
              <h3 className="text-2xl font-bold text-white">{genre.name}</h3>
              <ChevronRight className="h-6 w-6 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          </button>
        ))}
      </div>

      {selectedGenre && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Top {selectedGenre} Releases
          </h2>
          {loading === selectedGenre ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse space-y-4"
                >
                  <div className="aspect-square bg-gray-200 rounded-lg" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {results[selectedGenre]?.map((release) => (
                <div key={release.id} className="group space-y-3">
                  <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={release.cover_image || release.thumb}
                      alt={release.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 line-clamp-2">
                      {release.title}
                    </h3>
                    <p className="text-sm text-gray-500">{release.year}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      onClick={() => window.open(release.uri, '_blank')}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}