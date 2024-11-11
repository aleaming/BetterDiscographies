import { Disc, Users, Link, Award, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Discography } from './Discography';

interface ArtistTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  releases: any[];
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

const tabs = [
  { id: 'overview', label: 'Overview', icon: Info },
  { id: 'discography', label: 'Discography', icon: Disc },
  { id: 'members', label: 'Members', icon: Users },
  { id: 'aliases', label: 'Aliases', icon: Link },
  { id: 'credits', label: 'Credits', icon: Award },
];

export function ArtistTabs({ 
  activeTab, 
  onTabChange, 
  releases,
  isLoading,
  hasMore,
  onLoadMore
}: ArtistTabsProps) {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  'flex items-center gap-2 border-b-2 py-4 px-1 text-sm font-medium transition-colors',
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:border-gray-300 hover:text-foreground'
                )}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'discography' && (
          <Discography 
            releases={releases} 
            isLoading={isLoading}
            hasMore={hasMore}
            onLoadMore={onLoadMore}
          />
        )}
      </div>
    </div>
  );
}