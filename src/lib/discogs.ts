import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SAMPLE_MARKET_DATA } from './sampleData';

const DISCOGS_API_URL = 'https://api.discogs.com';
const DISCOGS_AUTH_URL = 'https://www.discogs.com/oauth';
const CONSUMER_KEY = 'vcxkKGgGbKjkvpnvDwRb';
const CONSUMER_SECRET = 'ILsORWHWTEezsarfZCseeyszlsbwmeQh';

interface DiscogsState {
  accessToken: string | null;
  username: string | null;
  requestToken: string | null;
  setCredentials: (accessToken: string, username: string) => void;
  setRequestToken: (token: string) => void;
  clearCredentials: () => void;
}

export const useDiscogsStore = create<DiscogsState>()(
  persist(
    (set) => ({
      accessToken: null,
      username: null,
      requestToken: null,
      setCredentials: (accessToken, username) => set({ accessToken, username }),
      setRequestToken: (requestToken) => set({ requestToken }),
      clearCredentials: () => set({ accessToken: null, username: null, requestToken: null }),
    }),
    {
      name: 'discogs-auth',
    }
  )
);

export class DiscogsClient {
  private static instance: DiscogsClient;
  private accessToken: string | null = null;
  private retryCount = 0;
  private maxRetries = 3;

  private constructor() {}

  static getInstance(): DiscogsClient {
    if (!DiscogsClient.instance) {
      DiscogsClient.instance = new DiscogsClient();
    }
    return DiscogsClient.instance;
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  async getRequestToken(): Promise<{ oauth_token: string; oauth_token_secret: string }> {
    const headers = new Headers({
      'Authorization': `Discogs key=${CONSUMER_KEY}, secret=${CONSUMER_SECRET}`,
      'User-Agent': 'BetterDiscogs/1.0',
    });

    const response = await fetch(`${DISCOGS_AUTH_URL}/request_token`, {
      headers,
    });

    if (!response.ok) {
      throw new Error('Failed to get request token');
    }

    const text = await response.text();
    const params = new URLSearchParams(text);
    
    return {
      oauth_token: params.get('oauth_token') || '',
      oauth_token_secret: params.get('oauth_token_secret') || '',
    };
  }

  async getAccessToken(
    oauthToken: string,
    oauthVerifier: string
  ): Promise<{ access_token: string; username: string }> {
    const headers = new Headers({
      'Authorization': `Discogs key=${CONSUMER_KEY}, secret=${CONSUMER_SECRET}`,
      'User-Agent': 'BetterDiscogs/1.0',
    });

    const response = await fetch(
      `${DISCOGS_AUTH_URL}/access_token?oauth_token=${oauthToken}&oauth_verifier=${oauthVerifier}`,
      { headers }
    );

    if (!response.ok) {
      throw new Error('Failed to get access token');
    }

    const text = await response.text();
    const params = new URLSearchParams(text);
    
    return {
      access_token: params.get('oauth_token') || '',
      username: params.get('username') || '',
    };
  }

  private async fetch(endpoint: string, options: RequestInit = {}) {
    const headers = new Headers(options.headers);
    
    if (this.accessToken) {
      headers.set('Authorization', `OAuth oauth_token=${this.accessToken}`);
    } else {
      headers.set('Authorization', `Discogs key=${CONSUMER_KEY}, secret=${CONSUMER_SECRET}`);
    }
    
    headers.set('User-Agent', 'BetterDiscogs/1.0');

    try {
      const response = await fetch(`${DISCOGS_API_URL}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`Discogs API Error: ${response.statusText}`);
      }

      const data = await response.json();
      this.retryCount = 0;
      return data;
    } catch (error) {
      if (this.retryCount < this.maxRetries) {
        this.retryCount++;
        await new Promise(resolve => setTimeout(resolve, 1000 * this.retryCount));
        return this.fetch(endpoint, options);
      }
      throw error;
    }
  }

  async getArtistReleases(artistId: number, page = 1, perPage = 50) {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        per_page: perPage.toString(),
        sort: 'year',
        sort_order: 'desc',
      });

      return await this.fetch(`/artists/${artistId}/releases?${params}`);
    } catch (error) {
      console.error('Failed to fetch artist releases:', error);
      throw error;
    }
  }

  // Rest of the existing methods...
  async search(query: string, page = 1, perPage = 50) {
    try {
      const params = new URLSearchParams({
        q: query,
        page: page.toString(),
        per_page: perPage.toString(),
        type: 'master,release',
      });

      return await this.fetch(`/database/search?${params}`);
    } catch (error) {
      console.error('Search failed:', error);
      return { results: [] };
    }
  }

  async getRelease(releaseId: number) {
    try {
      return await this.fetch(`/releases/${releaseId}`);
    } catch (error) {
      console.error('Failed to fetch release:', error);
      throw error;
    }
  }

  async getMasterRelease(masterId: number) {
    try {
      return await this.fetch(`/masters/${masterId}`);
    } catch (error) {
      console.error('Failed to fetch master release:', error);
      throw error;
    }
  }

  async getArtist(artistId: number) {
    try {
      return await this.fetch(`/artists/${artistId}`);
    } catch (error) {
      console.error('Failed to fetch artist:', error);
      throw error;
    }
  }

  async getLabel(labelId: number) {
    try {
      return await this.fetch(`/labels/${labelId}`);
    } catch (error) {
      console.error('Failed to fetch label:', error);
      throw error;
    }
  }

  async getMarketData(id: number) {
    try {
      // In a real implementation, we would fetch this from the Discogs API
      // For now, return sample data
      return SAMPLE_MARKET_DATA;
    } catch (error) {
      console.error('Failed to fetch market data:', error);
      return SAMPLE_MARKET_DATA;
    }
  }
}