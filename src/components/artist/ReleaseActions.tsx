import { Button } from '@/components/ui/Button';
import { Menu } from '@headlessui/react';
import { 
  Store, 
  Share2, 
  ListPlus, 
  DollarSign,
  MoreVertical,
  ExternalLink 
} from 'lucide-react';

interface ReleaseActionsProps {
  onShopClick: () => void;
}

export function ReleaseActions({ onShopClick }: ReleaseActionsProps) {
  return (
    <div className="flex gap-2">
      <Button
        onClick={onShopClick}
        className="flex-1 bg-indigo-600 text-white hover:bg-indigo-700"
      >
        <Store className="mr-2 h-4 w-4" />
        Shop All Versions
      </Button>

      <Menu as="div" className="relative">
        <Menu.Button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
          <MoreVertical className="h-5 w-5" />
        </Menu.Button>
        <Menu.Items className="absolute right-0 mt-2 w-56 rounded-lg bg-white shadow-lg border border-gray-200 focus:outline-none">
          <div className="p-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-gray-50' : ''
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-700`}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View on Discogs
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-gray-50' : ''
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-700`}
                >
                  <ListPlus className="mr-2 h-4 w-4" />
                  Add to Collection
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-gray-50' : ''
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-700`}
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  Sell a Copy
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-gray-50' : ''
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-700`}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
}