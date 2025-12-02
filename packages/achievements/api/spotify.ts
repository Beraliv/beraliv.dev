import type { VercelRequest, VercelResponse } from '@vercel/node';

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface SpotifyNowPlayingResponse {
  is_playing: boolean;
  item: {
    name: string;
    artists: { name: string }[];
    album: {
      name: string;
      images: { url: string; height: number; width: number }[];
    };
    external_urls: {
      spotify: string;
    };
  } | null;
}

const SPOTIFY_CLIENT_ID = process.env.VITE_SPOTIFY_CLIENT_ID || '';
const SPOTIFY_CLIENT_SECRET = process.env.VITE_SPOTIFY_CLIENT_SECRET || '';
const SPOTIFY_REFRESH_TOKEN = process.env.VITE_SPOTIFY_REFRESH_TOKEN || '';

async function getAccessToken(): Promise<string> {
  const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to get access token: ${response.status}`);
  }

  const data: SpotifyTokenResponse = await response.json();
  return data.access_token;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
      return res.status(500).json({ error: 'Spotify credentials not configured' });
    }

    const accessToken = await getAccessToken();

    const response = await fetch(
      'https://api.spotify.com/v1/me/player/currently-playing',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // 204 means no content (nothing playing)
    if (response.status === 204) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      return res.status(200).json({ isPlaying: false, data: null });
    }

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`);
    }

    const data: SpotifyNowPlayingResponse = await response.json();

    if (!data.item) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      return res.status(200).json({ isPlaying: false, data: null });
    }

    const albumImage = data.item.album.images.find(
      (img) => img.height === 64 || img.width === 64
    ) || data.item.album.images[data.item.album.images.length - 1];

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    return res.status(200).json({
      isPlaying: data.is_playing,
      title: data.item.name,
      artist: data.item.artists.map((artist) => artist.name).join(', '),
      album: data.item.album.name,
      albumImageUrl: albumImage?.url || '',
      songUrl: data.item.external_urls.spotify,
    });
  } catch (error) {
    console.error('Error proxying Spotify request:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Internal server error'
    });
  }
}
