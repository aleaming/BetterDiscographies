import { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/Button';
import { DetailModal } from './DetailModal';

interface ListResultCardProps {
  result: any;
}

export function ListResultCard({ result }: ListResultCardProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="group flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 hover:border-gray-300">
        <img
          src={result.thumb || 'https://via.placeholder.com/150'}
          alt={result.title}
          className="h-16 w-16 rounded-md object-cover"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 truncate">{result.title}</h3>
          <p className="text-sm text-gray-500">
            {result.type} • {result.year}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          onClick={() => setShowModal(true)}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
      <DetailModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        result={result}
      />
    </>
  );
}