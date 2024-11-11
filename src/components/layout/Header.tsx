import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Disc, Menu as MenuIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { DiscogsLogin } from '../auth/DiscogsLogin';
import { HeaderSearch } from '../search/HeaderSearch';
import { cn } from '@/lib/utils';

const FORMATS = [
  { name: 'Vinyl', description: 'Browse vinyl records', href: '/format/vinyl' },
  { name: 'CD', description: 'Explore CD releases', href: '/format/cd' },
  { name: 'Cassette', description: 'Discover cassette tapes', href: '/format/cassette' },
  { name: 'Digital', description: 'Find digital releases', href: '/format/digital' },
];

const GENRES = [
  { name: 'Electronic', href: '/genre/electronic' },
  { name: 'Rock', href: '/genre/rock' },
  { name: 'Hip Hop', href: '/genre/hip-hop' },
  { name: 'Jazz', href: '/genre/jazz' },
  { name: 'Classical', href: '/genre/classical' },
  { name: 'Folk', href: '/genre/folk' },
];

const STYLES = [
  { name: 'House', href: '/style/house' },
  { name: 'Techno', href: '/style/techno' },
  { name: 'Alternative', href: '/style/alternative' },
  { name: 'Indie Rock', href: '/style/indie-rock' },
  { name: 'Ambient', href: '/style/ambient' },
  { name: 'Metal', href: '/style/metal' },
];

export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <header className="bg-white border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Disc className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Better Discogs</span>
            </Link>
          </div>

          {/* Search */}
          <div className="hidden md:block">
            <HeaderSearch />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Formats */}
            <div className="relative">
              <button
                className={cn(
                  "flex items-center text-sm font-medium text-muted-foreground hover:text-foreground",
                  openMenu === 'formats' && "text-foreground"
                )}
                onMouseEnter={() => setOpenMenu('formats')}
                onClick={() => setOpenMenu(openMenu === 'formats' ? null : 'formats')}
              >
                Formats
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              {openMenu === 'formats' && (
                <div
                  className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 transform px-2"
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative grid gap-6 bg-white p-6 sm:gap-8">
                      {FORMATS.map((format) => (
                        <Link
                          key={format.name}
                          to={format.href}
                          className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
                        >
                          <div>
                            <p className="text-base font-medium text-gray-900">{format.name}</p>
                            <p className="mt-1 text-sm text-gray-500">{format.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Genres */}
            <div className="relative">
              <button
                className={cn(
                  "flex items-center text-sm font-medium text-muted-foreground hover:text-foreground",
                  openMenu === 'genres' && "text-foreground"
                )}
                onMouseEnter={() => setOpenMenu('genres')}
                onClick={() => setOpenMenu(openMenu === 'genres' ? null : 'genres')}
              >
                Genres
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              {openMenu === 'genres' && (
                <div
                  className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-2"
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative grid grid-cols-2 gap-6 bg-white p-6">
                      {GENRES.map((genre) => (
                        <Link
                          key={genre.name}
                          to={genre.href}
                          className="text-sm font-medium text-gray-900 hover:text-primary"
                        >
                          {genre.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Styles */}
            <div className="relative">
              <button
                className={cn(
                  "flex items-center text-sm font-medium text-muted-foreground hover:text-foreground",
                  openMenu === 'styles' && "text-foreground"
                )}
                onMouseEnter={() => setOpenMenu('styles')}
                onClick={() => setOpenMenu(openMenu === 'styles' ? null : 'styles')}
              >
                Styles
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              {openMenu === 'styles' && (
                <div
                  className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-2"
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative grid grid-cols-2 gap-6 bg-white p-6">
                      {STYLES.map((style) => (
                        <Link
                          key={style.name}
                          to={style.href}
                          className="text-sm font-medium text-gray-900 hover:text-primary"
                        >
                          {style.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Button variant="ghost" size="sm">
              <MenuIcon className="h-5 w-5" />
            </Button>
          </div>

          {/* Auth */}
          <div className="hidden md:block">
            <DiscogsLogin />
          </div>
        </div>
      </div>
    </header>
  );
}