import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Album, Disc, Users } from 'lucide-react';
import { Button } from '../ui/Button';

interface Album {
  id: number;
  title: string;
  year: string;
  artwork: string;
  collectionCount: number;
  rating: number;
  format: string;
  masterUrl: string;
}

interface TopCollectedAlbumsProps {
  albums: Album[];
}

export function TopCollectedAlbums({ albums }: TopCollectedAlbumsProps) {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Album className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Top Collected Albums</h2>
        </div>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {albums.map((album) => (
          <div
            key={album.id}
            className="group relative"
            onMouseEnter={() => setHoveredId(album.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img
                src={album.artwork}
                alt={album.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {hoveredId === album.id && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-2 transition-opacity duration-300">
                  <Button
                    size="sm"
                    onClick={() => navigate(`/master/${album.id}`)}
                    className="bg-white/90 hover:bg-white text-black"
                  >
                    View Details
                  </Button>
                </div>
              )}
            </div>

            <div className="mt-3 space-y-1">
              <h3 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
                {album.title}
              </h3>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{album.collectionCount.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Disc className="h-4 w-4" />
                  <span>{album.format}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{album.year}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}