import { Grid, List, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

type ViewMode = 'medium' | 'large' | 'list';

interface ViewToggleProps {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-200 p-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onChange('medium')}
        className={cn('px-2', {
          'bg-gray-100': value === 'medium',
        })}
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onChange('large')}
        className={cn('px-2', {
          'bg-gray-100': value === 'large',
        })}
      >
        <Grid className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onChange('list')}
        className={cn('px-2', {
          'bg-gray-100': value === 'list',
        })}
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
}