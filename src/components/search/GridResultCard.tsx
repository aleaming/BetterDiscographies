import { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/Button';
import { ButtonGroup } from '../ui/ButtonGroup';
import { DetailModal } from './DetailModal';
import { cn } from '@/lib/utils';

interface GridResultCardProps {
  result: any;
  size: 'medium' | 'large';
}

const typeChipStyles = {
  master: 'bg-green-100 text-green-800',
  release: 'bg-blue-100 text-blue-800',
  artist: 'bg-purple-100 text-purple-800',
  label: 'bg-amber-100 text-amber-800',
};

export function GridResultCard({ result, size }: GridResultCardProps) {
  const [showModal, setShowModal] = useState(false);
  const isSquareAspect =
    result.type?.toLowerCase() === 'master' ||
    result.type?.toLowerCase() === 'release';

  const sizeClasses = {
    medium: isSquareAspect ? 'aspect-square' : 'aspect-[1/1.2]',
    large: isSquareAspect ? 'aspect-square' : 'aspect-[1/1.4]',
  };

  const getArtistAndTitle = () => {
    const parts = result.title.split(' - ');
    if (parts.length > 1) {
      return { artist: parts[0], title: parts.slice(1).join(' - ') };
    }
    return { artist: '', title: result.title };
  };

  const { artist, title } = getArtistAndTitle();

  return (
    <>
      <div className="group relative flex flex-col rounded-xl bg-white p-3 shadow-sm ring-1 ring-gray-200 transition-shadow hover:shadow-md">
        <div
          className={cn(
            'relative overflow-hidden rounded-lg bg-gray-100',
            sizeClasses[size]
          )}
        >
          <img
            src={
              result.cover_image ||
              result.thumb ||
              'https://via.placeholder.com/300'
            }
            alt={result.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-2 opacity-0 p-3 transition-opacity duration-300 group-hover:opacity-100 bg-white/80 hover:bg-white"
            onClick={() => setShowModal(true)}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
          {result.type && (
            <span
              className={cn(
                'absolute left-2 top-2 rounded-full px-2 py-1 text-xs font-medium',
                typeChipStyles[result.type.toLowerCase()] ||
                  'bg-gray-100 text-gray-800'
              )}
            >
              {result.type}
            </span>
          )}
        </div>

        <div className="mt-3 flex flex-col flex-1">
          <div className="flex-1 space-y-2">
            <h3 className="font-bold text-gray-900 line-clamp-2">{title}</h3>
            {artist && (
              <p className="text-sm text-gray-600 line-clamp-1">{artist}</p>
            )}
            {result.label && (
              <p className="text-sm text-gray-600">
                Label:{' '}
                {Array.isArray(result.label) ? result.label[0] : result.label}
              </p>
            )}
            {result.year && (
              <p className="text-sm text-gray-600">Year: {result.year}</p>
            )}
            {result.format && (
              <p className="text-sm text-gray-600">
                Format:{' '}
                {Array.isArray(result.format)
                  ? result.format.join(', ')
                  : result.format}
              </p>
            )}
            {result.genre && (
              <p className="text-sm text-gray-600">
                Genre:{' '}
                {Array.isArray(result.genre)
                  ? result.genre.join(', ')
                  : result.genre}
              </p>
            )}
            {result.style && (
              <p className="text-sm text-gray-600">
                Style:{' '}
                {Array.isArray(result.style)
                  ? result.style.join(', ')
                  : result.style}
              </p>
            )}
          </div>
          <ButtonGroup
            className="mt-4"
            onShopClick={() => window.open(result.uri, '_blank')}
            result={result}
          />
        </div>
      </div>
      <DetailModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        result={result}
      />
    </>
  );
}
