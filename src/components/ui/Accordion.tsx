import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
}

export function Accordion({ title, children, icon, defaultOpen = false }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
      <button
        className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="font-medium text-gray-900">{title}</h3>
        </div>
        <ChevronDown
          className={cn('h-5 w-5 text-gray-500 transition-transform', {
            'transform rotate-180': isOpen,
          })}
        />
      </button>
      <div
        className={cn('transition-all duration-200 ease-in-out', {
          'max-h-0 opacity-0': !isOpen,
          'max-h-[2000px] opacity-100': isOpen,
        })}
      >
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}