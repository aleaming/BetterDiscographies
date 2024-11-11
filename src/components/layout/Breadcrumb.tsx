import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  path: string;
}

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const paths = pathname.split('/').filter(Boolean);
  return paths.map((path, index) => {
    const url = `/${paths.slice(0, index + 1).join('/')}`;
    const label = path.charAt(0).toUpperCase() + path.slice(1);
    return { label, path: url };
  });
}

export function Breadcrumb() {
  const location = useLocation();
  const items = generateBreadcrumbs(location.pathname);

  if (location.pathname === '/') return null;

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
      <Link
        to="/"
        className="flex items-center hover:text-foreground transition-colors"
      >
        <Home className="h-4 w-4" />
        <span className="sr-only">Home</span>
      </Link>
      {items.map((item, index) => (
        <div key={item.path} className="flex items-center">
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link
            to={item.path}
            className={cn(
              'hover:text-foreground transition-colors',
              index === items.length - 1 && 'text-foreground font-medium'
            )}
          >
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}