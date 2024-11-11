import { type Artist } from '@/types/discogs';
import { Users, Link as LinkIcon, Award, Store } from 'lucide-react';
import { Accordion } from '../ui/Accordion';
import { Button } from '../ui/Button';

interface ArtistHeroProps {
  artist: Artist;
}

export function ArtistHero({ artist }: ArtistHeroProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Artist Image */}
      <div className="lg:col-span-1 space-y-6">
        <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100">
          <img
            src={artist.images?.[0]?.uri || 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?w=1200&auto=format&fit=crop&q=60'}
            alt={artist.name}
            className="h-full w-full object-cover"
          />
        </div>

        <Button
          className="w-full"
          onClick={() => window.open(artist.uri, '_blank')}
        >
          <Store className="mr-2 h-4 w-4" />
          View on Discogs
        </Button>
      </div>

      {/* Artist Info */}
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">{artist.name}</h1>
          {artist.realname && (
            <p className="mt-2 text-xl text-gray-600">Real Name: {artist.realname}</p>
          )}
        </div>

        <div className="prose prose-gray max-w-none">
          <p className="whitespace-pre-line">{artist.profile}</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {artist.members && artist.members.length > 0 && (
            <Accordion title="Members" icon={<Users className="h-5 w-5" />} defaultOpen>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {artist.members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-full bg-gray-200" />
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Accordion>
          )}

          {artist.urls && artist.urls.length > 0 && (
            <Accordion title="Links" icon={<LinkIcon className="h-5 w-5" />}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {artist.urls.map((url, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-left"
                    onClick={() => window.open(url, '_blank')}
                  >
                    <LinkIcon className="mr-2 h-4 w-4" />
                    {new URL(url).hostname}
                  </Button>
                ))}
              </div>
            </Accordion>
          )}

          <Accordion title="Credits & Recognition" icon={<Award className="h-5 w-5" />}>
            <div className="prose prose-gray max-w-none">
              <p>Coming soon...</p>
            </div>
          </Accordion>
        </div>
      </div>
    </div>
  );
}