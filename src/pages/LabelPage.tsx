import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DiscogsClient } from '@/lib/discogs';
import { Button } from '@/components/ui/Button';
import { Store } from 'lucide-react';

export function LabelPage() {
  const { id } = useParams();
  const [label, setLabel] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLabel = async () => {
      try {
        const client = DiscogsClient.getInstance();
        const data = await client.getLabel(Number(id));
        setLabel(data);
      } catch (error) {
        console.error('Failed to fetch label:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchLabel();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!label) {
    return <div>Label not found</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex gap-8">
        <div className="w-96">
          <img
            src={label.images?.[0]?.uri || 'https://via.placeholder.com/400'}
            alt={label.name}
            className="w-full rounded-xl shadow-lg"
          />
          <div className="mt-4 flex gap-3">
            <Button className="flex-1" onClick={() => window.open(label.uri, '_blank')}>
              <Store className="mr-2 h-4 w-4" />
              View on Discogs
            </Button>
          </div>
        </div>
        <div className="flex-1 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{label.name}</h1>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {label.profile && (
              <div className="col-span-2">
                <h3 className="text-sm font-medium text-gray-500">Profile</h3>
                <p className="mt-1 text-gray-900 whitespace-pre-line">{label.profile}</p>
              </div>
            )}
            {label.contact_info && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Contact Info</h3>
                <p className="mt-1 text-gray-900 whitespace-pre-line">{label.contact_info}</p>
              </div>
            )}
            {label.parent_label && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Parent Label</h3>
                <p className="mt-1 text-gray-900">{label.parent_label.name}</p>
              </div>
            )}
            {label.sublabels?.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Sublabels</h3>
                <ul className="mt-1 space-y-1">
                  {label.sublabels.map((sublabel: any) => (
                    <li key={sublabel.id} className="text-gray-900">{sublabel.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}