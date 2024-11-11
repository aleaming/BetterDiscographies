import { useDiscogsStore } from '@/lib/discogs';
import { DiscogsLogin } from '@/components/auth/DiscogsLogin';

export function Profile() {
  const { accessToken } = useDiscogsStore();

  if (!accessToken) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h2 className="text-2xl font-semibold text-gray-900">Connect Your Account</h2>
        <p className="text-gray-600 max-w-md text-center mb-4">
          Connect your Discogs account to manage your collection, track your wantlist, and more.
        </p>
        <DiscogsLogin />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900">Profile</h2>
        <p className="mt-2 text-gray-600">
          Your Discogs account is connected. You can now manage your collection and wantlist.
        </p>
      </div>
    </div>
  );
}