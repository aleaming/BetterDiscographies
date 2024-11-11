import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DiscogsLogin } from '../auth/DiscogsLogin';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Search', href: '/search' },
  { name: 'Formats', href: '/formats' },
  { name: 'Genres', href: '/genres' },
  { name: 'Styles', href: '/styles' },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
              <div className="flex px-4 pb-2 pt-5">
                <button
                  type="button"
                  className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                  onClick={onClose}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                {navigation.map((item) => (
                  <div key={item.name} className="flow-root">
                    <Link
                      to={item.href}
                      className="-m-2 block p-2 font-medium text-gray-900"
                      onClick={onClose}
                    >
                      {item.name}
                    </Link>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 px-4 py-6">
                <DiscogsLogin />
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}