import { Home, Library, Search, User, Music2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';
import { useDiscogsStore } from '@/lib/discogs';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Collection', href: '/collection', icon: Library },
  { name: 'Wantlist', href: '/wantlist', icon: Music2 },
  { name: 'Profile', href: '/profile', icon: User },
];

export function Sidebar() {
  const { accessToken } = useDiscogsStore();

  if (!accessToken) {
    return null;
  }

  return (
    <div className="flex h-full w-[250px] flex-col bg-card border-r border-border">
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                {
                  'bg-accent text-accent-foreground': isActive,
                  'text-muted-foreground hover:bg-accent hover:text-accent-foreground': !isActive,
                }
              )
            }
          >
            <item.icon
              className={cn('mr-3 h-5 w-5 flex-shrink-0')}
              aria-hidden="true"
            />
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto p-4 border-t border-border">
        <ThemeToggle />
      </div>
    </div>
  );
}