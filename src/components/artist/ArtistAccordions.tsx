import { Accordion } from '../ui/Accordion';
import { Users, Link as LinkIcon, Award } from 'lucide-react';
import { type Artist } from '@/types/discogs';
import { Button } from '../ui/Button';

interface ArtistAccordionsProps {
  artist: Artist;
}

export function ArtistAccordions({ artist }: ArtistAccordionsProps) {
  return (
    <div className="space-y-4">
      {artist.members && artist.members.length > 0 && (
        <Accordion title="Members" icon={<Users className="h-5 w-5" />}>
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
          <div className="space-y-2">
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
  );
}