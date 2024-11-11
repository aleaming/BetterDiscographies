import { Button } from '@/components/ui/Button';
import { ChevronDown } from 'lucide-react';
import { type Release } from '@/types/discogs';

interface ReleaseGridProps {
  title: string;
  releases: Release[];
}

export function ReleaseGrid({ title, releases }: ReleaseGridProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <Button variant="ghost" size="sm">
          View All <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {releases.map((release) => (
          <div key={release.id} className="group space-y-2">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img
                src={release.thumb}
                alt={release.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 line-clamp-2">{release.title}</h3>
              <p className="text-sm text-gray-500">{release.year}</p>
              <p className="text-sm text-gray-500">{release.format[0]}</p>
              <p className="text-sm font-medium text-gray-900">{release.price}</p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              className="w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              Shop Now
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}