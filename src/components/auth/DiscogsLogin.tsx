import { useEffect, useState } from 'react';
import { Button } from '../ui/Button';
import { Disc, Loader2 } from 'lucide-react';
import { useDiscogsStore } from '@/lib/discogs';
import { DiscogsClient } from '@/lib/discogs';

export function DiscogsLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const { accessToken, username, setCredentials, setRequestToken, clearCredentials } = useDiscogsStore();

  useEffect(() => {
    // Handle OAuth callback
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const oauthToken = params.get('oauth_token');
      const oauthVerifier = params.get('oauth_verifier');

      if (oauthToken && oauthVerifier) {
        try {
          setIsLoading(true);
          const client = DiscogsClient.getInstance();
          const { access_token, username } = await client.getAccessToken(oauthToken, oauthVerifier);
          setCredentials(access_token, username);
          // Clean up URL
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (error) {
          console.error('Failed to get access token:', error);
          clearCredentials();
        } finally {
          setIsLoading(false);
        }
      }
    };

    handleCallback();
  }, [setCredentials, clearCredentials]);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const client = DiscogsClient.getInstance();
      const { oauth_token } = await client.getRequestToken();
      setRequestToken(oauth_token);

      // Redirect to Discogs authorization page
      const authUrl = `https://www.discogs.com/oauth/authorize?oauth_token=${oauth_token}&oauth_callback=${window.location.origin}`;
      window.location.href = authUrl;
    } catch (error) {
      console.error('Failed to initiate OAuth flow:', error);
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    clearCredentials();
  };

  if (isLoading) {
    return (
      <Button disabled className="flex items-center gap-2">
        <Loader2 className="h-4 w-4 animate-spin" />
        Connecting...
      </Button>
    );
  }

  if (accessToken && username) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <Disc className="h-4 w-4" />
          <span>{username}</span>
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={handleLogin} className="flex items-center gap-2">
      <Disc className="h-4 w-4" />
      Connect to Discogs
    </Button>
  );
}