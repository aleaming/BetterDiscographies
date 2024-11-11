import { cn } from '@/lib/utils';

interface BrowseHeroProps {
  title: string;
  description: string;
  image: string;
  className?: string;
}

export function BrowseHero({ title, description, image, className }: BrowseHeroProps) {
  return (
    <div className={cn("relative h-[300px] rounded-xl overflow-hidden", className)}>
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <h1 className="text-4xl font-bold text-white">{title}</h1>
        <p className="mt-2 text-xl text-gray-200">{description}</p>
      </div>
    </div>
  );
}