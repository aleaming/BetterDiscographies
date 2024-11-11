import { Dialog } from '@headlessui/react';
import { X, ListMusic, ShoppingCart, ListPlus, DollarSign, Share2, Star } from 'lucide-react';
import { Button } from '../ui/Button';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: any;
}

export function DetailModal({ isOpen, onClose, result }: DetailModalProps) {
  const formatList = (items?: string[]) => {
    if (!items?.length) return '';
    return items.join(', ');
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto w-full max-w-2xl bg-white rounded-2xl shadow-xl">
          {/* Header */}
          <div className="relative bg-zinc-900 text-white p-6 rounded-t-2xl">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute right-4 top-4 text-white hover:text-white/80"
            >
              <X className="h-5 w-5" />
            </Button>
            <div className="space-y-2">
              <p className="text-lg">{result.artist || 'Unknown Artist'}</p>
              <h2 className="text-2xl font-bold">{result.title}</h2>
              {result.type === 'master' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500/20 text-green-400">
                  Master Release
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 p-6">
            {/* Album Art */}
            <div>
              <img
                src={result.cover_image || result.thumb || 'https://via.placeholder.com/400'}
                alt={result.title}
                className="w-full aspect-square object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Actions */}
            <div className="col-span-2 space-y-2">
              <button className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <ListMusic className="h-5 w-5" />
                <span className="font-medium">Explore All Versions</span>
              </button>
              <button className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <ShoppingCart className="h-5 w-5" />
                <span className="font-medium">Shop All Versions</span>
              </button>
              <button className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <ListPlus className="h-5 w-5" />
                <span className="font-medium">Add to List</span>
              </button>
              <button className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <DollarSign className="h-5 w-5" />
                <span className="font-medium">Sell a copy</span>
              </button>
              <button className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <Share2 className="h-5 w-5" />
                <span className="font-medium">Share</span>
              </button>
            </div>
          </div>

          {/* Details */}
          <div className="px-6 pb-6">
            <div className="bg-gray-50 rounded-lg">
              <dl className="divide-y divide-gray-200">
                {result.format && (
                  <div className="grid grid-cols-3 gap-4 p-4">
                    <dt className="font-medium text-gray-900">Formats</dt>
                    <dd className="col-span-2 text-gray-700">{formatList(result.format)}</dd>
                  </div>
                )}
                {result.year && (
                  <div className="grid grid-cols-3 gap-4 p-4">
                    <dt className="font-medium text-gray-900">Released</dt>
                    <dd className="col-span-2 text-gray-700">{result.year}</dd>
                  </div>
                )}
                {result.genre && (
                  <div className="grid grid-cols-3 gap-4 p-4">
                    <dt className="font-medium text-gray-900">Genre</dt>
                    <dd className="col-span-2 text-gray-700">{formatList(result.genre)}</dd>
                  </div>
                )}
                {result.style && (
                  <div className="grid grid-cols-3 gap-4 p-4">
                    <dt className="font-medium text-gray-900">Style</dt>
                    <dd className="col-span-2 text-gray-700">{formatList(result.style)}</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-3 gap-6 text-center">
              <div>
                <dt className="text-sm font-medium text-gray-500">For sale</dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-900">1,428</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Collected</dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-900">1,001</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Rating</dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-900 flex items-center justify-center gap-1">
                  4.6 <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                </dd>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
              <div>Discogs ID: [{result.id}]</div>
              <div>Recently edited</div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}