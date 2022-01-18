import { PlayingApi } from "../types/PlayingApi";

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async (): Promise<string> => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken ?? "",
    }),
  });

  const { access_token: accessToken }: { access_token: string } =
    await response.json();

  return accessToken;
};

type NowPlayingMetadata =
  | {
      is_playing: boolean;
      item: {
        album: {
          artists: {
            name: string;
          }[];
          images: {
            width: number;
            height: number;
            url: string;
          }[];
          name: string;
        };
        external_urls: {
          spotify: string;
        };
        name: string;
      };
    }
  | {
      is_playing: false;
      item: null;
    };

export const getPlaying = async (): Promise<PlayingApi> => {
  const accessToken = await getAccessToken();

  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 204 || response.status > 400) {
    return { isPlaying: false };
  }

  const metadata: NowPlayingMetadata = await response.json();

  if (metadata.item === null) {
    return { isPlaying: false };
  }

  return {
    albumImageUrl: metadata.item.album.images[0]?.url,
    albumName: metadata.item.album.name,
    artistName: metadata.item.album.artists
      .map((artist) => artist.name)
      .join(", "),
    isPlaying: metadata.is_playing,
    songName: metadata.item.name,
    songUrl: metadata.item.external_urls.spotify,
  };
};
