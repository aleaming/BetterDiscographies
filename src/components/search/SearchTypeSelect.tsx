import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export type SearchType = 'all' | 'release' | 'artist' | 'label';

interface SearchTypeSelectProps {
  value: SearchType;
  onChange: (type: SearchType) => void;
}

const searchTypes = [
  { value: 'all', label: 'All' },
  { value: 'release', label: 'Releases' },
  { value: 'artist', label: 'Artists' },
  { value: 'label', label: 'Labels' },
];

export function SearchTypeSelect({ value, onChange }: SearchTypeSelectProps) {
  const selectedType = searchTypes.find((type) => type.value === value);

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-1 rounded-l-lg border border-r-0 border-input bg-white px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
        {selectedType?.label}
        <ChevronDown className="h-4 w-4" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 z-10 mt-1 w-40 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {searchTypes.map((type) => (
              <Menu.Item key={type.value}>
                {({ active }) => (
                  <button
                    onClick={() => onChange(type.value as SearchType)}
                    className={cn(
                      'block w-full px-4 py-2 text-left text-sm',
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                    )}
                  >
                    {type.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}