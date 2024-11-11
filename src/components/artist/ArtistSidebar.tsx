import { Button } from '@/components/ui/Button';
import { Store, ExternalLink, ChevronDown } from 'lucide-react';
import { type Artist } from '@/types/discogs';

interface ArtistSidebarProps {
  artist: Artist;
}

export function ArtistSidebar({ artist }: ArtistSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-500">Members</h3>
          <Button variant="ghost" size="sm">
            View All <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
        {artist.members?.slice(0, 3).map((member) => (
          <div key={member.id} className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-gray-200" />
            <span className="text-sm text-gray-900">{member.name}</span>
          </div>
        ))}
      </div>

      {/* External Links */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Links</h3>
        <div className="space-y-3">
          <Button
            variant="secondary"
            className="w-full justify-start"
            onClick={() => window.open(artist.uri, '_blank')}
          >
            <Store className="mr-2 h-4 w-4" />
            View on Discogs
          </Button>
          {artist.urls?.map((url, index) => (
            <Button
              key={index}
              variant="secondary"
              className="w-full justify-start"
              onClick={() => window.open(url, '_blank')}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              {new URL(url).hostname}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}