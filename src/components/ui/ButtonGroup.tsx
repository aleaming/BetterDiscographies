import { cn } from '@/lib/utils';
import { ChevronRight, Store } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ButtonGroupProps {
  onShopClick: () => void;
  result: {
    type: string;
    id: string | number;
    master_id?: string | number;
  };
  className?: string;
}

export function ButtonGroup({
  onShopClick,
  result,
  className,
}: ButtonGroupProps) {
  const navigate = useNavigate();

  const handleViewClick = () => {
    const type = result.type.toLowerCase();
    switch (type) {
      case 'master':
        navigate(`/master/${result.id}`);
        break;
      case 'release':
        navigate(
          result.master_id
            ? `/master/${result.master_id}`
            : `/release/${result.id}`
        );
        break;
      case 'artist':
        navigate(`/artist/${result.id}`);
        break;
      case 'label':
        navigate(`/label/${result.id}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className={cn('flex gap-3', className)}>
      <button
        onClick={onShopClick}
        className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-full bg-teal-600 text-white font-medium hover:bg-teal-700 transition-colors"
      >
        <Store className="mr-2 h-4 w-4" />
        Shop
      </button>
      <button
        onClick={handleViewClick}
        className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-full bg-white text-teal-600 font-medium border border-gray-200 hover:border-teal-600 transition-colors"
      >
        View
        <ChevronRight className="ml-1 h-4 w-4" />
      </button>
    </div>
  );
}
